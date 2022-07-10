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

contract TheHydraTest is DSTest {
    Vm private vm = Vm(HEVM_ADDRESS);

    // A contract instance to use for any test that doesn't require a fresh state
    TheHydra testContract;

    // Wallets to use for testing
    address private owner = vm.addr(uint256(keccak256(abi.encodePacked("owner"))));
    address private minter = vm.addr(uint256(keccak256(abi.encodePacked("minter"))));
    address private other = vm.addr(uint256(keccak256(abi.encodePacked("other"))));

    // state variables
    uint256 totalSupply = 50;
    uint256 mintPrice = 0.001 ether;
    uint256 royaltyAmount = 1000; // 1000 / 10_000 => 10%
    address royaltyReceiver = 0x18836acedeF35D4A6C00Aae46a36fAdE12ee5FF7;

    // external addresses
    address xqstgfx = 0xDf01A4040493B514605392620B3a0a05Eb8Cd295;

    // Redfine any events
    event Transfer(address indexed from, address indexed to, uint256 indexed id);
    event RealityAltered(address indexed from, uint256 tokenId);

    function getNewContract() public returns (TheHydra) {
        return new TheHydra(owner, 'baseUri', mintPrice);
    }
    function getNewDataStore() public returns (TheHydraDataStore) {
        return new TheHydraDataStore(owner, "ipfs://test/");
    }
    function getNewRenderer(TheHydra _c, TheHydraDataStore _d, address _xqstgfx) public returns (TheHydraRenderer) {
        return new TheHydraRenderer(address(_c), address(_d), _xqstgfx);
    }

    function setUp() public {
        testContract = new TheHydra(
            owner,
            'ipfs://test',
            mintPrice
        );

        vm.deal(owner, 10 ether);
        vm.deal(minter, 10 ether);
        vm.deal(other, 10 ether);
    }

    function testConstructor() public {
        TheHydra _hydra = getNewContract();

        assertEq(_hydra.owner(), owner);
        assertEq(_hydra.name(), 'Altered Earth: The Hydra Collection');
        assertEq(_hydra.symbol(), 'ALTERED');
        assertEq(_hydra.baseURI(), 'baseUri');
        assertEq(_hydra.totalSupply(), totalSupply);
        assertEq(_hydra.mintPrice(), mintPrice);
    }
    // --------------------------------------------------------
    // ~~ Interface support ~~
    // --------------------------------------------------------
    function testSupportsInterfaceForERC165() public {
        assertTrue(testContract.supportsInterface(0x01ffc9a7));
    }
    function testSupportsInterfaceForERC721() public {
        assertTrue(testContract.supportsInterface(0x80ac58cd));
    }
    function testSupportsInterfaceForERC721Metadata() public {
        assertTrue(testContract.supportsInterface(0x5b5e139f));
    }
    function testSupportsInterfaceForERC2981() public {
        // Test to ensure we properly implement the royalty registry
        assertTrue(testContract.supportsInterface(0x2a55205a));
    }

    // --------------------------------------------------------
    // ~~ Royalties ~~
    // --------------------------------------------------------
    function testRoyaltiesAreSetWhenCreated() public {

        uint expectedRoyalty = (mintPrice * royaltyAmount) / 10_000;

        (address receiver, uint256 amount) = testContract.royaltyInfo(0, 100);

        console.log(receiver, amount);
        assertEq(royaltyReceiver, receiver);
        assertEq(expectedRoyalty, amount);
    }

    function testSetRoyaltyInfoFailsAsNotOwner() public {
        vm.expectRevert('UNAUTHORIZED');
        vm.startPrank(address(0xd3ad));
        testContract.setRoyaltyInfo(other, 10_000);
        vm.stopPrank();
    }

    function testSetRoyaltyInfo() public {
        TheHydra _c = getNewContract();
        uint expectedRoyalty = 1;

        vm.prank(owner);
        _c.setRoyaltyInfo(other, 111);

        (address receiver, uint256 amount) = _c.royaltyInfo(0, 100);
        assertEq(receiver, other);
        assertEq(amount, expectedRoyalty);
    }

    // --------------------------------------------------------
    // ~~ Minting ~~
    // --------------------------------------------------------
    function testMintFailsWithInvalidPrice() public {
        vm.expectRevert(TheHydra.CouldNotAlterReality.selector);
        testContract.alterReality{value: 0.01 ether}(0);
    }
    function testMintFailsWithInvalidTokenId() public {
        vm.expectRevert(TheHydra.BeyondTheScopeOfConsciousness.selector);
        testContract.alterReality{value: mintPrice}(totalSupply);
    }
    function testMintSuccedsWithValidPriceAndId() public {
        TheHydra _c = getNewContract();
        vm.prank(minter);
        _c.alterReality{value: mintPrice}(0);

        assertEq(_c.balanceOf(minter), 1);
    }
    function testMintFailsWhenTokenAlreadyMinted() public {
        TheHydra _c = getNewContract();
        vm.startPrank(minter);

        _c.alterReality{value: mintPrice}(0);
        vm.expectRevert("ALREADY_MINTED");
        _c.alterReality{value: mintPrice}(0);
        
        vm.stopPrank();
    }
    function testMintEventsRealityAlteredEvent() public {
        TheHydra _c = getNewContract();
        vm.startPrank(minter);
        
        vm.expectEmit(true, true, false, true);
        emit RealityAltered(minter, 0);
        
        _c.alterReality{value: mintPrice}(0);
        
        vm.stopPrank();
    }

    // --------------------------------------------------------
    // ~~ Metadata ~~
    // --------------------------------------------------------
    function testTokenURIForNonExistingToken() public {
        TheHydra _c = getNewContract();
        
        vm.expectRevert(TheHydra.BeyondTheScopeOfConsciousness.selector);
        _c.tokenURI(0);
    }
    function testTokenURIForExistingToken() public {
        // TheHydraRenderer _r = getNewRenderer();
        TheHydra _c = getNewContract();
        vm.prank(minter);
        _c.alterReality{value: mintPrice}(0);
        string memory uri = _c.tokenURI(0);

        assertEq(uri, "baseUri0");
    }

    function testSetRenderer() public {
        vm.startPrank(owner);
        TheHydra _c = getNewContract();
        assertEq(address(_c.renderer()), address(0x0));
        TheHydraDataStore _dataStore = getNewDataStore();
        TheHydraRenderer _renderer = getNewRenderer(_c, _dataStore, xqstgfx);

        _c.setRenderer(_renderer);
        assertEq(address(_c.renderer()), address(_renderer));
        assertTrue(address(_c.renderer()) != address(_dataStore));
        vm.stopPrank();
    }
    function testSetRendererOnlyOwner() public {
        TheHydra _c = getNewContract();
        TheHydraDataStore _dataStore = getNewDataStore();
        TheHydraRenderer _renderer = getNewRenderer(_c, _dataStore, xqstgfx);

        vm.startPrank(minter);
        vm.expectRevert('UNAUTHORIZED');
        _c.setRenderer(_renderer);
        vm.stopPrank();        
    }

    // --------------------------------------------------------
    // ~~ Burning
    // --------------------------------------------------------

    function testReturnToRealityOnlyByOwner() public {

        TheHydra _c = getNewContract();
        vm.prank(minter);
        _c.alterReality{value: mintPrice}(0);

        vm.startPrank(other);
        vm.expectRevert(TheHydra.InvalidDreamState.selector);
        _c.returnToReality(0);

        vm.stopPrank();
    }

    function testReturnToRealityBurnsWhenOwner() public {

        TheHydra _c = getNewContract();
        vm.startPrank(minter);
        _c.alterReality{value: mintPrice}(0);
        assertEq(_c.ownerOf(0), minter);
        
        _c.returnToReality(0);

        vm.expectRevert('NOT_MINTED');
        _c.ownerOf(0);

        vm.stopPrank();
    }

    function testBurnedTokenCanNotBeReMinted() public {

        TheHydra _c = getNewContract();
        vm.startPrank(minter);
        _c.alterReality{value: mintPrice}(0);
        _c.returnToReality(0);

        vm.expectRevert();
        _c.alterReality{value: mintPrice}(0);

        vm.stopPrank();
    }

    // --------------------------------------------------------
    // ~~ Withdraw any ETH in Contract ~~
    // --------------------------------------------------------
    function testWithdrawPaymentsOnlyOwner() public {
        TheHydra _c = getNewContract();
        vm.startPrank(minter);
        _c.alterReality{value: mintPrice}(0);
        vm.expectRevert('UNAUTHORIZED');
        _c.withdrawPayments(payable(minter));
        vm.stopPrank();
    }

    function testWithdrawPaymentsFromOwner() public {
        TheHydra _c = getNewContract();
        vm.prank(minter);
        _c.alterReality{value: mintPrice}(0);

        uint256 priorBalance = owner.balance;
        uint256 contractBalance = address(_c).balance;

        vm.prank(owner);
        _c.withdrawPayments(payable(owner));

        assertEq(address(_c).balance, 0);
        assertEq(owner.balance, priorBalance + contractBalance);
    }
}