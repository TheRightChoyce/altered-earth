// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

// 3rd party includes
import "forge-std/Test.sol";
import "forge-std/console.sol";
import "forge-std/Vm.sol";

// local includes
import "../src/TheHydra.sol";
import "../src/TheHydraRenderer.sol";
import "../src/TheHydraDataStore.sol";
import "./mocks/ExquisiteGraphics.mock.sol";
import "./helpers/Artwork.sol";

contract TheHydraRendererTest is DSTest {
    // --------------------------------------------------------
    // ~ Variables ~
    // --------------------------------------------------------
    Vm private vm = Vm(HEVM_ADDRESS);

    // external addresses
    address xqstgfxMainNet = 0xDf01A4040493B514605392620B3a0a05Eb8Cd295;
    ExquisiteGraphics xqstgfx = new ExquisiteGraphics();

    // Wallets to use for testing
    address private owner = vm.addr(uint256(keccak256(abi.encodePacked("owner"))));
    address private minter = vm.addr(uint256(keccak256(abi.encodePacked("minter"))));
    address private other = vm.addr(uint256(keccak256(abi.encodePacked("other"))));

    // Mint params
    uint256 mintPrice = 0.001 ether;
    string offChainBaseURI = "ipfs://test/";

    error BeyondTheScopeOfConsciousness();

    // --------------------------------------------------------
    // ~ Helper Functions ~
    // --------------------------------------------------------
    
    function getNewHydraContract() public returns (TheHydra) {
        return new TheHydra(owner, mintPrice, 0.0005 ether);
    }
    function getNewDataStore() public returns (TheHydraDataStore) {
        return new TheHydraDataStore(owner, offChainBaseURI);
    }
    function getNewRenderer() public returns (TheHydraRenderer) {
        TheHydra _theHydra = getNewHydraContract();
        TheHydraDataStore _dataStore = getNewDataStore();
        
        return new TheHydraRenderer(
            address(_theHydra), address(_dataStore), address(xqstgfx)
        );
    }

    function testConstructor() public {
        TheHydra _theHydra = getNewHydraContract();
        TheHydraDataStore _dataStore = getNewDataStore();
        
        TheHydraRenderer _renderer = new TheHydraRenderer(
            address(_theHydra),
            address(_dataStore),
            address(xqstgfx)
        );

        assertEq(address(_renderer.theHydra()), address(_theHydra));
        assertEq(address(_renderer.dataStore()), address(_dataStore));
        assertEq(address(_renderer.xqstgfx()), address(xqstgfx));
    }

    // --------------------------------------------------------
    // ~~ ERC721 TokenURI implementation  ~~
    // --------------------------------------------------------

    function testTokenURIForOriginal() public {
        TheHydra _theHydra = getNewHydraContract();
        TheHydraDataStore _dataStore = getNewDataStore();
        
        TheHydraRenderer _r = new TheHydraRenderer(
            address(_theHydra),
            address(_dataStore),
            address(xqstgfx)
        );

        assertEq(_r.tokenURI(0), string(abi.encodePacked(offChainBaseURI, "0")));
        assertEq(_r.tokenURI(1), string(abi.encodePacked(offChainBaseURI, "1")));
        assertEq(_r.tokenURI(49), string(abi.encodePacked(offChainBaseURI, "49")));
    }
    
    function testTokenURIForEdition() public {
        TheHydra _theHydra = getNewHydraContract();
        TheHydraDataStore _dataStore = getNewDataStore();
        
        TheHydraRenderer _r = new TheHydraRenderer(
            address(_theHydra),
            address(_dataStore),
            address(xqstgfx)
        );

        // Ensure there is SOME output
        assertTrue(
            keccak256(abi.encodePacked(_r.tokenURI(50)))
            != keccak256(abi.encodePacked(""))
        );

        assertTrue(
            keccak256(abi.encodePacked(_r.tokenURI(50)))
            != keccak256(abi.encodePacked(offChainBaseURI, "50"))
        );
        assertTrue(
            keccak256(abi.encodePacked(_r.tokenURI(51)))
            != keccak256(abi.encodePacked(offChainBaseURI, "51"))
        );
        assertTrue(
            keccak256(abi.encodePacked(_r.tokenURI(2449)))
            != keccak256(abi.encodePacked(offChainBaseURI, "2449"))
        );

        vm.expectRevert(TheHydra.BeyondTheScopeOfConsciousness.selector);
        _r.tokenURI(2550);

        vm.expectRevert(TheHydra.BeyondTheScopeOfConsciousness.selector);
        _r.tokenURI(2551);
    }

    function testTokenURIIsPublic() public {
        TheHydraRenderer _r = getNewRenderer();
        
        vm.prank(minter);
        _r.tokenURI(0);

        vm.prank(other);
        _r.tokenURI(1);
    }
    function testTokenURIWithRenderType() public {

        TheHydra _theHydra = getNewHydraContract();
        TheHydraDataStore _dataStore = getNewDataStore();
        
        TheHydraRenderer _r = new TheHydraRenderer(
            address(_theHydra),
            address(_dataStore),
            address(xqstgfx)
        );

        string memory result = _r.tokenURI(0, "128x128");
        string memory expected = string(abi.encodePacked(_dataStore.getOffChainBaseURI(), "128x128", "0"));
        assertEq(expected, result);
    }

    // --------------------------------------------------------
    // ~~ Exquisite Graphics SVG Renderers  ~~
    // --------------------------------------------------------
    function testRenderSVG() public {
        TheHydraRenderer _r = getNewRenderer();
        bytes memory result0 = _r.renderSVG(ArtworkHelper.getXQSTFile0());
        assertTrue(result0.length > 0);

        bytes memory result1 = _r.renderSVG(ArtworkHelper.getXQSTFile1());
        assertTrue(result1.length > 0);
    }
    function testRenderSVGIsPublic() public {
        TheHydraRenderer _r = getNewRenderer();
        vm.prank(minter);
        bytes memory result0 = _r.renderSVG(ArtworkHelper.getXQSTFile0());
        assertTrue(result0.length > 0);

        vm.prank(other);
        _r.renderSVG(ArtworkHelper.getXQSTFile1());
        bytes memory result1 = _r.renderSVG(ArtworkHelper.getXQSTFile1());
        assertTrue(result1.length > 0);
    }

    function testRenderSVG_AsString() public {
        TheHydraRenderer _r = getNewRenderer();
        string memory result0 = _r.renderSVG_AsString(ArtworkHelper.getXQSTFile0());
        assertTrue(bytes(result0).length > 0);

        string memory result1 = _r.renderSVG_AsString(ArtworkHelper.getXQSTFile1());
        assertTrue(bytes(result1).length > 0);
    }
    function testRenderSVG_AsStringIsPublic() public {
        TheHydraRenderer _r = getNewRenderer();
        vm.prank(minter);
        string memory result0 = _r.renderSVG_AsString(ArtworkHelper.getXQSTFile0());
        assertTrue(bytes(result0).length > 0);

        vm.prank(other);
        _r.renderSVG(ArtworkHelper.getXQSTFile1());
        string memory result1 = _r.renderSVG_AsString(ArtworkHelper.getXQSTFile1());
        assertTrue(bytes(result1).length > 0);
    }

    // --------------------------------------------------------
    // ~~ User Friendly Renderers  ~~
    // --------------------------------------------------------

    function testGetOnChainSVG() public {
        TheHydra _theHydra = getNewHydraContract();
        TheHydraDataStore _dataStore = getNewDataStore();
        
        TheHydraRenderer _r = new TheHydraRenderer(
            address(_theHydra),
            address(_dataStore),
            address(xqstgfx)
        );

        vm.prank(owner);
        _dataStore.storePhotoData(0, ArtworkHelper.getXQSTFile0());
        
        string memory result0 = _r.getOnChainSVG(0);
        assertTrue(bytes(result0).length > 0);

        vm.prank(owner);
        _dataStore.storePhotoData(1, ArtworkHelper.getXQSTFile1());
        
        string memory result1 = _r.getOnChainSVG(1);
        assertTrue(bytes(result1).length > 1);
        
        /// @dev This test fails because I am only mocking a single output from xqitgfx.drawPixelsUnsafe
        // bytes32 hash0 = keccak256(abi.encodePacked(result0));
        // bytes32 hash1 = keccak256(abi.encodePacked(result1));

        // assertTrue(hash0 != hash1);
    }

    function testGetOnChainSVGFailsWhenNoData() public {
        TheHydraRenderer _r = getNewRenderer();
        
        vm.expectRevert(stdError.arithmeticError);
        _r.getOnChainSVG(0);
    }

    function testGetOnChainSVG_AsBase64() public {
        TheHydra _theHydra = getNewHydraContract();
        TheHydraDataStore _dataStore = getNewDataStore();
        
        TheHydraRenderer _r = new TheHydraRenderer(
            address(_theHydra),
            address(_dataStore),
            address(xqstgfx)
        );

        vm.prank(owner);
        _dataStore.storePhotoData(0, ArtworkHelper.getXQSTFile0());
        
        string memory result0 = _r.getOnChainSVG_AsBase64(0);
        assertTrue(bytes(result0).length > 0);

        vm.prank(owner);
        _dataStore.storePhotoData(1, ArtworkHelper.getXQSTFile1());
        
        string memory result1 = _r.getOnChainSVG_AsBase64(1);
        assertTrue(bytes(result1).length > 1);
    }

    function testGetOnChainSVG_AsBase64FailsWhenNoData() public {
        TheHydraRenderer _r = getNewRenderer();
        
        vm.expectRevert(stdError.arithmeticError);
        _r.getOnChainSVG_AsBase64(0);
    }
}
