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
            owner, address(_theHydra), address(_dataStore), address(xqstgfx)
        );
    }

    function testConstructor() public {
        TheHydra _theHydra = getNewHydraContract();
        TheHydraDataStore _dataStore = getNewDataStore();
        
        TheHydraRenderer _renderer = new TheHydraRenderer(
            owner,
            address(_theHydra),
            address(_dataStore),
            address(xqstgfx)
        );

        assertEq(address(_renderer.theHydra()), address(_theHydra));
        assertEq(address(_renderer.dataStore()), address(_dataStore));
        assertEq(address(_renderer.xqstgfx()), address(xqstgfx));
    }

    //
    // ~~ Setters ~~
    //

    function testSetDataStore() public {
        TheHydraRenderer _render = getNewRenderer();
        TheHydraDataStore _dataStore = getNewDataStore();

        assertTrue(address(_render.dataStore()) !=  address(_dataStore));
        
        vm.prank(owner);
        _render.setDataStore(address(_dataStore));
        assertEq(address(_render.dataStore()), address(_dataStore));
    }
    function testSetDataStoreOnlyOwner() public {
        TheHydraRenderer _render = getNewRenderer();
        TheHydraDataStore _dataStore = getNewDataStore();
        
        vm.startPrank(minter);
        vm.expectRevert('UNAUTHORIZED');
        _render.setDataStore(address(_dataStore));
        vm.stopPrank();
    }
    function testSetDataStoreTracksHistory() public {
        TheHydraRenderer _renderer = getNewRenderer();
        address originalDataStore = address(_renderer.dataStore());
        assertEq(_renderer.dataStoreHistory(0), originalDataStore);
        
        // first
        TheHydraDataStore _dataStore1 = getNewDataStore();
        
        vm.prank(owner);
        _renderer.setDataStore(address(_dataStore1));
        assertEq(_renderer.dataStoreHistory(0), originalDataStore);
        assertEq(_renderer.dataStoreHistory(1), address(_dataStore1));

        // second
        TheHydraDataStore _dataStore2 = getNewDataStore();
        
        vm.prank(owner);
        _renderer.setDataStore(address(_dataStore2));

        assertEq(_renderer.dataStoreHistory(0), originalDataStore);
        assertEq(_renderer.dataStoreHistory(1), address(_dataStore1));
        assertEq(_renderer.dataStoreHistory(2), address(_dataStore2));
    }

    function testSetExquisiteGraphics() public {
        TheHydraRenderer _render = getNewRenderer();
        ExquisiteGraphics _xqstgfx = new ExquisiteGraphics();

        assertTrue(address(_render.xqstgfx()) != address(_xqstgfx));
        
        vm.prank(owner);
        _render.setExquisiteGraphics(address(_xqstgfx));
        assertEq(address(_render.xqstgfx()), address(_xqstgfx));
    }
    function testSetExquisiteGraphicsOnlyOwner() public {
        TheHydraRenderer _render = getNewRenderer();
        ExquisiteGraphics _xqstgfx = new ExquisiteGraphics();

        vm.startPrank(minter);
        vm.expectRevert('UNAUTHORIZED');
        _render.setExquisiteGraphics(address(_xqstgfx));
        vm.stopPrank();
    }

    // --------------------------------------------------------
    // ~~ ERC721 TokenURI implementation  ~~
    // --------------------------------------------------------

    function testTokenURIForOriginal() public {
        TheHydra _theHydra = getNewHydraContract();
        TheHydraDataStore _dataStore = getNewDataStore();
        
        TheHydraRenderer _r = new TheHydraRenderer(
            owner,
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

        /// @dev -- reminder!! dataStore fails with stdError.arithmeticError if it can not look up a photo from the store

        TheHydraRenderer _r = new TheHydraRenderer(
            owner,
            address(_theHydra),
            address(_dataStore),
            address(xqstgfx)
        );

        vm.startPrank(owner);
        /// @dev -- these are the originalIds that need to be stored -- not the edition ids!
        
        // Ensure there is SOME output
        _dataStore.storeData(0, ArtworkHelper.getXQSTFile1());
        assertTrue(
            keccak256(abi.encodePacked(_r.tokenURI(50)))
            != keccak256(abi.encodePacked(""))
        );

        bytes memory token50 = abi.encodePacked(_r.tokenURI(50));
        assertTrue(
            keccak256(token50)
            != keccak256(abi.encodePacked(offChainBaseURI, "50"))
        );

        // original 1
        _dataStore.storeData(1, ArtworkHelper.getXQSTFile1());
        bytes memory token51 = abi.encodePacked(_r.tokenURI(51));
        assertTrue(
            keccak256(token51)
            != keccak256(abi.encodePacked(offChainBaseURI, "51"))
        );
        bytes memory token100 = abi.encodePacked(_r.tokenURI(100));
        assertTrue(
            keccak256(abi.encodePacked(token100))
            != keccak256(abi.encodePacked(offChainBaseURI, "100"))
        );

        // original 2
        _dataStore.storeData(2, ArtworkHelper.getXQSTFile1());
        
        bytes memory token150 = abi.encodePacked(_r.tokenURI(150));
        assertTrue(
            keccak256(abi.encodePacked(token150))
            != keccak256(abi.encodePacked(offChainBaseURI, "150"))
        );
        bytes memory token199 = abi.encodePacked(_r.tokenURI(199));
        assertTrue(
            keccak256(abi.encodePacked(token199))
            != keccak256(abi.encodePacked(offChainBaseURI, "199"))
        );

        // // original 48
        _dataStore.storeData(48, ArtworkHelper.getXQSTFile1());
        bytes memory token2450 = abi.encodePacked(_r.tokenURI(2450));
        assertTrue(
            keccak256(abi.encodePacked(token2450))
            != keccak256(abi.encodePacked(offChainBaseURI, "2450"))
        );
        bytes memory token2499 = abi.encodePacked(_r.tokenURI(2499));
        assertTrue(
            keccak256(abi.encodePacked(token2499))
            != keccak256(abi.encodePacked(offChainBaseURI, "2499"))
        );

        // // original 49
        _dataStore.storeData(49, ArtworkHelper.getXQSTFile1());
        bytes memory token2500 = abi.encodePacked(_r.tokenURI(2500));
        assertTrue(
            keccak256(abi.encodePacked(token2500))
            != keccak256(abi.encodePacked(offChainBaseURI, "2500"))
        );
        bytes memory token2549 = abi.encodePacked(_r.tokenURI(2549));
        assertTrue(
            keccak256(abi.encodePacked(token2549))
            != keccak256(abi.encodePacked(offChainBaseURI, "2549"))
        );

        vm.stopPrank();
    }

    /// @dev This doesn't test, but it can export the raw json to the console for testing... so you can do something like `forge test --match-contract TheHydraRenderer --match-test testTokenURIForEdition_AsString -vvv > out.txt` and then manually confirm the json output. This is a handy tool to check: https://base64.guru/converter/decode/file the svg encoding
    function testTokenURIForEdition_AsString() public {
        // TheHydra _theHydra = getNewHydraContract();
        // TheHydraDataStore _dataStore = getNewDataStore();

        //  TheHydraRenderer _r = new TheHydraRenderer(
        //     owner,
        //     address(_theHydra),
        //     address(_dataStore),
        //     address(xqstgfx)
        // );

        // vm.startPrank(owner);

        // // original 1
        // _dataStore.storeData(0, ArtworkHelper.getXQSTFile1());
        // string memory tokenJson = _r.tokenURI_AsString(51);
        // console.log(tokenJson);

        // vm.stopPrank();
    }

    function testTokenURIIsPublic() public {
        TheHydraRenderer _r = getNewRenderer();
        
        vm.prank(minter);
        _r.tokenURI(0);

        vm.prank(other);
        _r.tokenURI(1);
    }
    // function testTokenURIWithRenderType() public {

    //     TheHydra _theHydra = getNewHydraContract();
    //     TheHydraDataStore _dataStore = getNewDataStore();
        
    //     TheHydraRenderer _r = new TheHydraRenderer(
    //         owner,
    //         address(_theHydra),
    //         address(_dataStore),
    //         address(xqstgfx)
    //     );

    //     string memory result = _r.tokenURI(0, "128x128");
    //     string memory expected = string(abi.encodePacked(_dataStore.getOffChainBaseURI(), "128x128", "0"));
    //     assertEq(expected, result);
    // }

// --------------------------------------------------------
    // ~~ User Friendly Renderers  ~~
    // --------------------------------------------------------

    function testGetOnChainSVG() public {
        TheHydra _theHydra = getNewHydraContract();
        TheHydraDataStore _dataStore = getNewDataStore();
        
        TheHydraRenderer _r = new TheHydraRenderer(
            owner,
            address(_theHydra),
            address(_dataStore),
            address(xqstgfx)
        );

        vm.prank(owner);
        _dataStore.storeData(0, ArtworkHelper.getXQSTFile0());
        
        string memory result0 = _r.getOnChainSVG(0);
        bytes memory result0bytes = bytes(result0);
        assertTrue(result0bytes.length > 0);
        assertTrue(result0bytes[0] == bytes1("<"));
        assertTrue(result0bytes[1] == bytes1("s"));
        assertTrue(result0bytes[2] == bytes1("v"));
        assertTrue(result0bytes[3] == bytes1("g"));

        vm.prank(owner);
        _dataStore.storeData(1, ArtworkHelper.getXQSTFile1());
        
        string memory result1 = _r.getOnChainSVG(1);
        bytes memory result1bytes = bytes(result1);
        assertTrue(result1bytes.length > 0);
        assertTrue(result1bytes[0] == bytes1("<"));
        assertTrue(result1bytes[1] == bytes1("s"));
        assertTrue(result1bytes[2] == bytes1("v"));
        assertTrue(result1bytes[3] == bytes1("g"));
        
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
            owner,
            address(_theHydra),
            address(_dataStore),
            address(xqstgfx)
        );

        vm.prank(owner);
        _dataStore.storeData(0, ArtworkHelper.getXQSTFile0());
        
        string memory result0 = _r.getOnChainSVG_AsBase64(0);
        assertTrue(bytes(result0).length > 0);

        vm.prank(owner);
        _dataStore.storeData(1, ArtworkHelper.getXQSTFile1());
        
        string memory result1 = _r.getOnChainSVG_AsBase64(1);
        assertTrue(bytes(result1).length > 1);
    }

    function testGetOnChainSVG_AsBase64FailsWhenNoData() public {
        TheHydraRenderer _r = getNewRenderer();
        
        vm.expectRevert(stdError.arithmeticError);
        _r.getOnChainSVG_AsBase64(0);
    }

    // --------------------------------------------------------
    // ~~ Exquisite Graphics SVG Renderers  ~~
    // --------------------------------------------------------
    // function testRenderSVG() public {
    //     TheHydraRenderer _r = getNewRenderer();
    //     bytes memory result0 = _r.renderSVG(ArtworkHelper.getXQSTFile0());
    //     assertTrue(result0.length > 0);

    //     bytes memory result1 = _r.renderSVG(ArtworkHelper.getXQSTFile1());
    //     assertTrue(result1.length > 0);
    // }
    // function testRenderSVGIsPublic() public {
    //     TheHydraRenderer _r = getNewRenderer();
    //     vm.prank(minter);
    //     bytes memory result0 = _r.renderSVG(ArtworkHelper.getXQSTFile0());
    //     assertTrue(result0.length > 0);

    //     vm.prank(other);
    //     _r.renderSVG(ArtworkHelper.getXQSTFile1());
    //     bytes memory result1 = _r.renderSVG(ArtworkHelper.getXQSTFile1());
    //     assertTrue(result1.length > 0);
    // }

    // function testRenderSVG_AsString() public {
    //     TheHydraRenderer _r = getNewRenderer();
    //     string memory result0 = _r.renderSVG_AsString(ArtworkHelper.getXQSTFile0());
    //     assertTrue(bytes(result0).length > 0);

    //     string memory result1 = _r.renderSVG_AsString(ArtworkHelper.getXQSTFile1());
    //     assertTrue(bytes(result1).length > 0);
    // }
    // function testRenderSVG_AsStringIsPublic() public {
    //     TheHydraRenderer _r = getNewRenderer();
    //     vm.prank(minter);
    //     string memory result0 = _r.renderSVG_AsString(ArtworkHelper.getXQSTFile0());
    //     assertTrue(bytes(result0).length > 0);

    //     vm.prank(other);
    //     _r.renderSVG(ArtworkHelper.getXQSTFile1());
    //     string memory result1 = _r.renderSVG_AsString(ArtworkHelper.getXQSTFile1());
    //     assertTrue(bytes(result1).length > 0);
    // }
}
