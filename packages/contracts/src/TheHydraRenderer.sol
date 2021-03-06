// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./interfaces/ITheHydra.sol";
import "./interfaces/ITheHydraDataStore.sol";
import "./interfaces/ITheHydraRenderer.sol";
import "./interfaces/IExquisiteGraphics.sol";

import "./lib/DynamicBuffer.sol";

import "@openzeppelin/contracts/utils/Strings.sol";
import "boringsolidity/contracts/libraries/Base64.sol";
import "solmate/auth/Owned.sol";

/// @author therightchoyce.eth
/// @title  Upgradeable renderer interface
/// @notice This leaves room for us to change how we return token metadata and
///         unlocks future capability like fully on-chain storage.
contract TheHydraRenderer is ITheHydraRenderer, Owned {
    // --------------------------------------------------------
    // ~~ Utilities  ~~
    // --------------------------------------------------------
    using Strings for uint256;
    using DynamicBuffer for bytes;

    // --------------------------------------------------------
    // ~~ Internal storage  ~~
    // --------------------------------------------------------

    /// @dev The address of the token ownership contract
    ITheHydra public theHydra;

    /// @dev The address of the on-chain data storage contract
    ITheHydraDataStore public dataStore;

    /// @notice Track the history of data store updates for integrity purposes
    address[] public dataStoreHistory;

    /// @dev The address of the xqstgfx public rendering contract
    IExquisiteGraphics public xqstgfx;

    /// @dev track the size of the buffer we want
    uint256 immutable bufferSize = 2**20;

    // --------------------------------------------------------
    // ~~ Constructor  ~~
    // --------------------------------------------------------

    /// @param _owner The owner of the contract, when deployed
    /// @param _theHydra The address of the token ownership contract
    /// @param _theHydraDataStore The address of the on-chain data storage contract
    /// @param _xqstgfx The address of the xqstgfx public rendering contract
    constructor(
        address _owner,
        address _theHydra,
        address _theHydraDataStore,
        address _xqstgfx
    ) Owned(_owner) {
        theHydra = ITheHydra(_theHydra);
        dataStore = ITheHydraDataStore(_theHydraDataStore);
        dataStoreHistory.push(_theHydraDataStore);
        xqstgfx = IExquisiteGraphics(payable(_xqstgfx));
    }

    // --------------------------------------------------------
    // ~~ Setters  ~~
    // --------------------------------------------------------
    /// @notice Allows the owner to update the data store
    /// @param _dataStore New address for the datastore
    function setDataStore(address _dataStore) external onlyOwner {
        dataStore = ITheHydraDataStore(_dataStore);
        dataStoreHistory.push(_dataStore);
    }

    /// @notice Allows the owner to update the ExquisiteGraphics library
    /// @param _xqstgfx new address for the _xqstgfx library
    function setExquisiteGraphics(address _xqstgfx) external onlyOwner {
        xqstgfx = IExquisiteGraphics(payable(_xqstgfx));
    }

    // --------------------------------------------------------
    // ~~ ERC721 TokenURI implementation  ~~
    // --------------------------------------------------------

    /// @notice Builds the raw, on-chain json metadata file for an edition. If an originalId is passed in we just render that string like normal.
    /// @dev This will grab the on-chain SVG and include it as a base64 version
    /// @param _editionId The editionId.
    function buildOnChainMetaData(uint256 _editionId)
        public
        view
        returns (string memory)
    {
        /// @dev Originals return their tokenUri string
        if (_editionId < theHydra.getOrigialTotalSupply()) {
            return
                string(
                    abi.encodePacked(
                        dataStore.getOffChainBaseURI(),
                        _editionId.toString()
                    )
                );
        }

        /// @dev Editions build their tokenUri string on chain
        uint256 originalId = theHydra.editionGetOriginalId(_editionId);
        bytes memory svg = _renderSVG_AsBytes(dataStore.getData(originalId));

        /// @dev Build the base64 encoded version of the SVG to reference in the imageUrl
        bytes memory svgBase64 = DynamicBuffer.allocate(bufferSize);
        svgBase64.appendSafe("data:image/svg+xml;base64,");
        svgBase64.appendSafe(bytes(Base64.encode(svg)));

        /// @dev Build the json for the metadata file
        bytes memory json = DynamicBuffer.allocate(bufferSize);

        bytes memory name = abi.encodePacked(
            '"name":"The Hydra #',
            _editionId.toString(),
            '",'
        );
        bytes memory description = abi.encodePacked(
            '"description":"An altered reality existing forever on the Ethereum blockchain. This edition is a fully on-chain SVG version of The Hydra #',
            originalId.toString(),
            ". 50 editions exist for each original photo. Each token conforms to the ERC-721 standard.",
            '",'
        );
        bytes memory image = abi.encodePacked(
            '"image":"',
            string(svgBase64),
            '",'
        );
        bytes memory externalUrl = abi.encodePacked(
            '"external_url":"https://altered-earth.xyz/the-hydra/',
            _editionId.toString(),
            '",'
        );
        bytes memory attributes = abi.encodePacked(
            '"attributes":[',
            '{"trait_type":"Edition","value":"',
            theHydra.editionGetIndexFromId(_editionId).toString(),
            " of ",
            theHydra.getMaxEditionsPerOriginal().toString(),
            '"},',
            '{"trait_type":"Size","value":"64x64px"},',
            '{"trait_type":"Colors","value":"256"}',
            "]"
        );

        json.appendSafe(
            abi.encodePacked(
                "{",
                name,
                description,
                image,
                externalUrl,
                attributes,
                "}"
            )
        );

        return string(json);
    }

    /// @notice Standard URI function to get the token metadata
    /// @dev This is intended to be called from the main token contract, therefore there is no out of bounds check on the ID here. If calling directly, ensure the ID is valid!
    /// @param _id Id of the token, either an original or an edition
    function tokenURI(uint256 _id)
        public
        view
        override
        returns (string memory)
    {
        /// @dev Originals return their tokenUri string
        if (_id < theHydra.getOrigialTotalSupply()) {
            return
                string(
                    abi.encodePacked(
                        dataStore.getOffChainBaseURI(),
                        _id.toString()
                    )
                );
        }

        /// @dev Editions build their tokenUri string on chain
        string memory json = buildOnChainMetaData(_id);

        /// @dev Build the json for the metadata file
        bytes memory jsonBase64 = DynamicBuffer.allocate(bufferSize);

        jsonBase64.appendSafe("data:application/json;base64,");
        jsonBase64.appendSafe(bytes(Base64.encode(bytes(json))));

        return string(jsonBase64);
    }

    /// @notice Get the tokenURI using a custom render type. This allows for retrevial of on-chain, off-chain, or a custom render.. I.E maybe there are multiple sizes
    /// @dev allow the caller to specific the type of render, e.g. on-chain, off-chain, 64px, etc..
    /// @param _editionId Id of token
    /// @param _renderType specific context for what to render
    // function tokenURI(
    //     uint256 _editionId,
    //     string calldata _renderType
    // ) external view returns (string memory)
    // {
    //     return string(abi.encodePacked(
    //         dataStore.getOffChainBaseURI(),
    //         _renderType,
    //         _editionId.toString()
    //     ));
    // }

    // --------------------------------------------------------
    // ~~ Exquisite Graphics SVG Renderers  ~~
    // --------------------------------------------------------

    /// @notice This takes in the raw byte data in .xqst format and renders a full SVG to bytes memory
    /// @dev Draws pixels using xqstgfx, allocates memory for the SVG data, and creates the svg
    /// @param _data The input data, in .xqst format
    function _renderSVG_AsBytes(bytes memory _data)
        internal
        view
        returns (bytes memory)
    {
        string memory rects = xqstgfx.drawPixelsUnsafe(_data);
        bytes memory svg = DynamicBuffer.allocate(bufferSize);

        svg.appendSafe(
            abi.encodePacked(
                '<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" width="100%" height="100%" version="1.1" viewBox="0 0 128 128" fill="#fff">',
                rects,
                "</svg>"
            )
        );
        return svg;
    }

    /// @notice This takes in the raw byte data in .xqst format and renders a full SVG as an easy to understand string
    /// @dev Draws pixels using xqstgfx, allocates memory for the SVG data, and creates the svg
    /// @param _data The input data, in .xqst format
    function _renderSVG_AsString(bytes memory _data)
        internal
        view
        returns (string memory)
    {
        return string(_renderSVG_AsBytes(_data));
    }

    // --------------------------------------------------------
    // ~~ User Friendly Renderers  ~~
    // --------------------------------------------------------

    /// @notice External-only function to easily return the on chain SVG based on the original image
    /// @dev Accepts the originalId, pulls the raw data from the store, and then converts it back into SVG format
    /// @param _originalId The id of the original photo
    function getOnChainSVG(uint256 _originalId)
        public
        view
        returns (string memory)
    {
        bytes memory data = dataStore.getData(_originalId);
        return _renderSVG_AsString(data);
    }

    /// @notice External-only function to easily return a base64 encoded version of the onchain SVG based on the original image
    /// @dev Accepts the originalId, pulls the raw data from the store, and then converts it back into SVG format
    /// @param _originalId The id of the original photo
    function getOnChainSVG_AsBase64(uint256 _originalId)
        external
        view
        returns (string memory)
    {
        bytes memory svg = _renderSVG_AsBytes(dataStore.getData(_originalId));

        bytes memory svgBase64 = DynamicBuffer.allocate(bufferSize);

        svgBase64.appendSafe("data:image/svg+xml;base64,");
        svgBase64.appendSafe(bytes(Base64.encode(svg)));

        return string(svgBase64);
    }
}
