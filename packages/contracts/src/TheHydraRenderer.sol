// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./ITheHydra.sol";
import "./ITheHydraDataStore.sol";
import "./ITheHydraRenderer.sol";
import "./IExquisiteGraphics.sol";

import "@openzeppelin/contracts/utils/Strings.sol";

contract TheHydraRender is ITheHydraRenderer {
    
    // --------------------------------------------------------
    // ~~ Utilities  ~~
    // --------------------------------------------------------
    using Strings for uint256;

    // --------------------------------------------------------
    // ~~ Internal storage  ~~
    // --------------------------------------------------------
    
    /// @dev The address of the token ownership contract
    ITheHydra public theHydra;

    /// @dev The address of the on-chain data storage contract
    ITheHydraDataStore public dataStore;

    /// @dev The address of the xqstgfx public rendering contract
    IExquisiteGraphics public xqstgfx;

    // --------------------------------------------------------
    // ~~ Constructor  ~~
    // --------------------------------------------------------
    
    /// @param _theHydra The address of the token ownership contract
    /// @param _theHydraDataStore The address of the on-chain data storage contract
    /// @param _xqstgfx The address of the xqstgfx public rendering contract
    constructor(
        address _theHydra,
        address _theHydraDataStore,
        address _xqstgfx
    ) {
        theHydra = ITheHydra(_theHydra);
        dataStore = ITheHydraDataStore(_theHydraDataStore);
        xqstgfx = IExquisiteGraphics(payable(_xqstgfx));
    }

    // --------------------------------------------------------
    // ~~ ERC721 TokenURI implementation  ~~
    // --------------------------------------------------------

    /// @notice Standard URI function to get the token metadata
    /// @param id Id of token requested
    function tokenURI(uint256 id) override public view returns (string memory) {
        return string(abi.encodePacked(
            dataStore.getOffChainBaseURI(),
            id.toString()
        ));
    }
    
    /// @notice Get the tokenURI using a custom render type. This allows for retrevial of on-chain, off-chain, or a custom render.. I.E maybe there are multiple sizes
    /// @dev allow the caller to specific the type of render, e.g. on-chain, off-chain, 64px, etc..
    function tokenURI(
        uint256 id, 
        string calldata renderType
    ) external view returns (string memory)
    {
        return string(abi.encodePacked(
            dataStore.getOffChainBaseURI(),
            id.toString()
        ));
    }

    // --------------------------------------------------------
    // ~~ Exquisite Graphics SVG Renderers  ~~
    // --------------------------------------------------------

    function drawSVGToBytes(bytes memory data) public view returns (bytes memory) {
        string memory rects = xqstgfx.drawPixelsUnsafe(data);
        bytes memory svg;
        
        return svg;
    }

    function drawSVGToString(bytes memory data) public view returns (string memory) {
        return string(drawSVGToBytes(data));
    }

    // --------------------------------------------------------
    // ~~ User Friendly Renderers  ~~
    // --------------------------------------------------------

    function getOnChainPhotoSVG(
        uint256 id
    ) external view returns (
        string memory
    ) {
        bytes memory data = dataStore.getPhotoData(id);
        return drawSVGToString(data);
    }

    function getOnChainPhotoSVGAsBase64(
        uint256 id
    ) external view returns (
        string memory
    ) {
        bytes memory data = dataStore.getPhotoData(id);
        bytes memory svg = drawSVGToBytes(data);

        // TODO -- need to add in Base64 header string

        return string(svg);
    }
}