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

contract TheHydraRendererTest is DSTest {
    // --------------------------------------------------------
    // ~ Variables ~
    // --------------------------------------------------------
    Vm private vm = Vm(HEVM_ADDRESS);

    // external addresses
    address xqstgfx = 0xDf01A4040493B514605392620B3a0a05Eb8Cd295;

    // Wallets to use for testing
    address private owner = vm.addr(uint256(keccak256(abi.encodePacked("owner"))));
    address private minter = vm.addr(uint256(keccak256(abi.encodePacked("minter"))));
    address private other = vm.addr(uint256(keccak256(abi.encodePacked("other"))));

    // Mint params
    uint256 mintPrice = 0.001 ether;

    // --------------------------------------------------------
    // ~ Helper Functions ~
    // --------------------------------------------------------
    
    function getNewHydraContract() public returns (TheHydra) {
        return new TheHydra(owner, 'ipfs://test/', mintPrice);
    }
    function getNewDataStore() public returns (TheHydraDataStore) {
        return new TheHydraDataStore(owner, "ipfs://test/");
    }
    function getNewRenderer() public returns (TheHydraRenderer) {
        TheHydra _theHydra = getNewHydraContract();
        TheHydraDataStore _dataStore = getNewDataStore();
        return new TheHydraRenderer(address(_c), address(_d), _xqstgfx);
    }

    function testConstructor() public {
        TheHydra _theHydra = getNewHydraContract();
        TheHydraDataStore _dataStore = getNewDataStore();
        
        TheHydraRenderer _renderer = new TheHydraRenderer(
            address(_theHydra),
            address(_dataStore),
            xqstgfx
        );

        assertEq(address(_renderer.theHydra()), address(_theHydra));
        assertEq(address(_renderer.dataStore()), address(_dataStore));
        assertEq(address(_renderer.xqstgfx()), xqstgfx);
    }

    // --------------------------------------------------------
    // ~~ ERC721 TokenURI implementation  ~~
    // --------------------------------------------------------

    function testTokenURI() public {
        TheHydraRenderer _r = getNewRenderer();
        string expected = abi.encodePacked(_r.dataStore.getOffChainBaseURI(), "0");
        assertEq(expected, _r.tokenURI(0));
    }

    // --------------------------------------------------------
    // ~~ Exquisite Graphics SVG Renderers  ~~
    // --------------------------------------------------------

    // TODO

    // --------------------------------------------------------
    // ~~ User Friendly Renderers  ~~
    // --------------------------------------------------------

    // TODO


}
