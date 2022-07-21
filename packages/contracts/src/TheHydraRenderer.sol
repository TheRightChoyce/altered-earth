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

// TODO -- ability to update datastore and xqstgfx contracts

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
        xqstgfx = IExquisiteGraphics(payable(_xqstgfx));
    }

    // --------------------------------------------------------
    // ~~ Setters  ~~
    // --------------------------------------------------------
    /// @notice Allows the owner to update the data store
    /// @param _dataStore New address for the datastore
    function setDataStore(
        address _dataStore
    ) external onlyOwner {
        dataStore = ITheHydraDataStore(_dataStore);
        // TODO -- track any updates in dataStoreHistory
    }

    /// @notice Allows the owner to update the ExquisiteGraphics library
    /// @param _xqstgfx new address for the _xqstgfx library
    function setExquisiteGraphics(
        address _xqstgfx
    ) external onlyOwner {
        xqstgfx = IExquisiteGraphics(payable(_xqstgfx));
    }

    // --------------------------------------------------------
    // ~~ ERC721 TokenURI implementation  ~~
    // --------------------------------------------------------

    /// @notice Standard URI function to get the token metadata
    /// @dev This is intended to be called from the main token contract, therefore there is no out of bounds check on the ID here. If calling directly, ensure the ID is valid!
    /// @param _id Id of the token, either an original or an edition
    function tokenURI(
        uint256 _id
    ) override public view returns (
        string memory
    ) {
        /// @dev Originals return their tokenUri string
        if (_id < theHydra.getOrigialTotalSupply() ) {
            return string(abi.encodePacked(
                dataStore.getOffChainBaseURI(),
                _id.toString()
            ));
        }

        /// @dev Editions build their tokenUri string on chain
        uint256 originalId = theHydra.getOriginalId(_id);
        bytes memory svg = renderSVG(dataStore.getData(originalId));

        /// @dev Build the base64 encoded version of the SVG to reference in the imageUrl
        bytes memory svgBase64 = DynamicBuffer.allocate(2**20);
        svgBase64.appendSafe("data:image/svg+xml;base64,");
        svgBase64.appendSafe(bytes(Base64.encode(svg)));

        /// @dev Build the json for the metadata file
        bytes memory json = DynamicBuffer.allocate(2**20);
        bytes memory jsonBase64 = DynamicBuffer.allocate(2**20);

        bytes memory editionOf = abi.encodePacked(
            theHydra.getEditionIndexFromId(_id),
            ' of ',
            theHydra.getMaxEditionsPerOriginal().toString()
        );
        bytes memory name = abi.encodePacked(
            '"name":"The Hydra #', _id.toString(),'",'
        );
        bytes memory description = abi.encodePacked(
            '"description":"An on-chain edition of The Hydra #', originalId.toString(),
            '. This is edition ', string(editionOf),
            '. Each edition is stored as an immutable SVG on the Ethereum blockchain.",'
        );
        bytes memory image = abi.encodePacked(
            '"image":"', string(svgBase64),'",'
        );
        bytes memory externalUrl = abi.encodePacked(
            '"external_url":"https://altered-earth.xyz/the-hydra/', _id.toString(),'",'
        );
        bytes memory attributes = abi.encodePacked(
            '"attributes":[',
                '{"trait_type":"Edition","value":"', editionOf, '"},',
                '{"trait_type":"Size","value":"64x64px"},',
                '{"trait_type":"Colors","value":"256"}',
            ']'
        );


        json.appendSafe(
            abi.encodePacked(
                '{',
                    name,
                    description,
                    image,
                    externalUrl,
                    attributes,
                '}'
            )
        );

        jsonBase64.appendSafe("data:application/json;base64,");
        jsonBase64.appendSafe(bytes(Base64.encode(json)));

        return string(jsonBase64);
    }
    
    /// @notice Get the tokenURI using a custom render type. This allows for retrevial of on-chain, off-chain, or a custom render.. I.E maybe there are multiple sizes
    /// @dev allow the caller to specific the type of render, e.g. on-chain, off-chain, 64px, etc..
    /// @param _id Id of token
    /// @param _renderType specific context for what to render
    function tokenURI(
        uint256 _id, 
        string calldata _renderType
    ) external view returns (string memory)
    {
        return string(abi.encodePacked(
            dataStore.getOffChainBaseURI(),
            _renderType,
            _id.toString()
        ));
    }

    // --------------------------------------------------------
    // ~~ Exquisite Graphics SVG Renderers  ~~
    // --------------------------------------------------------

    /// @notice This takes in the raw byte data in .xqst format and renders a full SVG to bytes memory
    /// @dev Draws pixels using xqstgfx, allocates memory for the SVG data, and creates the svg
    /// @param _data The input data, in .xqst format
    function renderSVG(
        bytes memory _data
    ) public view returns (
        bytes memory
    ) {
        string memory rects = xqstgfx.drawPixelsUnsafe(_data);
        bytes memory svg = DynamicBuffer.allocate(2**19);

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
    function renderSVG_AsString(
        bytes memory _data
    ) public view returns (
        string memory
    ) {
        return string(renderSVG(_data));
    }

    // --------------------------------------------------------
    // ~~ User Friendly Renderers  ~~
    // --------------------------------------------------------

    function getOnChainSVG(
        uint256 _id
    ) external view returns (
        string memory
    ) {
        bytes memory data = dataStore.getData(_id);
        return renderSVG_AsString(data);
    }

    function getOnChainSVG_AsBase64(
        uint256 _id
    ) external view returns (
        string memory
    ) {
        bytes memory data = dataStore.getData(_id);
        bytes memory svg = renderSVG(data);

        bytes memory svgBase64 = DynamicBuffer.allocate(2**19);

        svgBase64.appendSafe("data:image/svg+xml;base64,");
        svgBase64.appendSafe(bytes(Base64.encode(svg)));

        return string(svgBase64);
    }
}