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
import "./helpers/Artwork.sol";

contract TheHydraDataStoreTest is DSTest {
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
        return new TheHydra(owner, mintPrice, 0.0005 ether);
    }
    function getNewDataStore() public returns (TheHydraDataStore) {
        return new TheHydraDataStore(owner, "ipfs://test/");
    }

    function testConstructor() public {        
        TheHydraDataStore _dataStore = new TheHydraDataStore(
            owner,
            "ipfs://test/"
        );

        assertEq(address(_dataStore.owner()), owner);
        assertEq(_dataStore.getOffChainBaseURI(), "ipfs://test/");
    }

    // --------------------------------------------------------
    // ~~ Off Chain Storage I.E BaseURI logic ~~
    // --------------------------------------------------------

    function testSetOffChainBaseURI() public {
        TheHydraDataStore _d = getNewDataStore();
        string memory newUri = "new base uri";
        vm.prank(owner);
        _d.setOffChainBaseURI(newUri);

        assertEq(_d.getOffChainBaseURI(), newUri);
    }
    function testSetOffChainBaseURIOnlyOwner() public {
        TheHydraDataStore _d = getNewDataStore();
        
        vm.expectRevert("UNAUTHORIZED");
        vm.startPrank(minter);
        _d.setOffChainBaseURI("should fail");
        vm.stopPrank();
    }

    // --------------------------------------------------------
    // ~~ On Chain Storage ~~
    // --------------------------------------------------------

    function testStoreData() public {
        TheHydraDataStore _d = getNewDataStore();

        bytes memory token0 = ArtworkHelper.getXQSTFile0();
        bytes memory token1 = ArtworkHelper.getXQSTFile1();
        
        vm.prank(owner);
        _d.storeData(0, token0);

        vm.prank(owner);
        _d.storeData(1, token1);

        bytes memory result0 = _d.getData(0);
        bytes memory result1 = _d.getData(1);
        
        assertEq0(token0, result0);
        assertEq0(token1, result1);
        
    }
    function testStoreDataOnlyOwner() public {
        TheHydraDataStore _d = getNewDataStore();
        
        vm.expectRevert("UNAUTHORIZED");
        vm.startPrank(minter);
        _d.storeData(0, ArtworkHelper.getXQSTFile0());
        vm.stopPrank();
    }

    function testStoreDataInvalidData() public {
        TheHydraDataStore _d = getNewDataStore();
        
        vm.expectRevert(TheHydraDataStore.InvalidMemorySequence.selector);
        vm.startPrank(owner);
        _d.storeData(0, hex"000000");
        vm.stopPrank();
    }

    function testGetPhotoDataIsPublic() public {
        TheHydraDataStore _d = getNewDataStore();
        vm.prank(owner);
        _d.storeData(0, ArtworkHelper.getXQSTFile0());

        vm.prank(minter);
        bytes memory minterResult = _d.getData(0);

        vm.prank(owner);
        bytes memory ownerResult = _d.getData(0);

        assertEq0(ArtworkHelper.getXQSTFile0(), minterResult);
        assertEq0(ownerResult, minterResult);
    }
    function testGetPhotoDataInvalidId() public {
        TheHydraDataStore _d = getNewDataStore();
        
        vm.expectRevert(stdError.arithmeticError);
        _d.getData(0);
        vm.expectRevert(stdError.arithmeticError);
        _d.getData(1);

        vm.prank(owner);
        _d.storeData(0, ArtworkHelper.getXQSTFile0());
        _d.getData(0);
        
        vm.expectRevert(stdError.arithmeticError);
        _d.getData(1);
    }    
}
