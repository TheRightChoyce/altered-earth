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
    uint256 mintPriceOriginal = 0.001 ether;
    uint256 mintPriceEdition = 0.0005 ether;
    uint256 royaltyAmount = 1000; // 1000 / 10_000 => 10%
    address royaltyReceiver = 0x18836acedeF35D4A6C00Aae46a36fAdE12ee5FF7;

    // external addresses
    address xqstgfxMainNet = 0xDf01A4040493B514605392620B3a0a05Eb8Cd295;
    ExquisiteGraphics xqstgfx = new ExquisiteGraphics();

    // Redfine any events
    event Transfer(address indexed from, address indexed to, uint256 indexed id);
    event RealityAltered(address indexed from, uint256 tokenId);
    event TheHydraAwakens();
    event ConsciousnessActivated(address indexed renderer);

    function getNewContract() public returns (TheHydra) {
        return new TheHydra(owner, 'baseUri', mintPriceOriginal, mintPriceEdition);
    }
    function getNewDataStore() public returns (TheHydraDataStore) {
        return new TheHydraDataStore(owner, "ipfs://test/");
    }
    function getNewRenderer(TheHydra _c) public returns (TheHydraRenderer) {
        return new TheHydraRenderer(
            address(_c), address(getNewDataStore()), address(xqstgfx)
        );
    }

    function setUp() public {
        testContract = new TheHydra(
            owner,
            'ipfs://test',
            mintPriceOriginal,
            mintPriceEdition
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
        assertEq(_hydra.mintPriceOriginal(), mintPriceOriginal);
        assertEq(_hydra.mintPriceEdition(), mintPriceEdition);
    }
    function testConstructorEmits() public {
        vm.expectEmit(false, false, false, true);
        emit TheHydraAwakens();

        getNewContract();
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

        // Don't set anything and use the default royalties

        uint expectedRoyalty = (100 * royaltyAmount) / 10_000;
        (address receiver, uint256 amount) = testContract.royaltyInfo(0, 100);

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
        vm.prank(owner);
        _c.setRoyaltyInfo(other, 500); // 5%
        
        uint expectedRoyalty = (100 * 500) / 10_000;

        (address receiver, uint256 amount) = _c.royaltyInfo(0, 100);
        assertEq(receiver, other);
        assertEq(amount, expectedRoyalty);
    }

    // --------------------------------------------------------
    // ~~ Minting -- Originals ~~
    // --------------------------------------------------------
    function testMintFailsWithInvalidPrice() public {
        vm.expectRevert(TheHydra.CouldNotAlterReality.selector);
        testContract.alterReality{value: 0.01 ether}(0);
    }
    function testMintFailsWithInvalidTokenId() public {
        vm.expectRevert(TheHydra.BeyondTheScopeOfConsciousness.selector);
        testContract.alterReality{value: mintPriceOriginal}(totalSupply);
    }
    function testMintSuccedsWithValidPriceAndId() public {
        TheHydra _c = getNewContract();
        vm.prank(minter);
        _c.alterReality{value: mintPriceOriginal}(0);

        assertEq(_c.balanceOf(minter), 1);
    }
    function testMintFailsWhenTokenAlreadyMinted() public {
        TheHydra _c = getNewContract();
        vm.startPrank(minter);

        _c.alterReality{value: mintPriceOriginal}(0);
        vm.expectRevert("ALREADY_MINTED");
        _c.alterReality{value: mintPriceOriginal}(0);
        
        vm.stopPrank();
    }
    function testMintEmitsRealityAlteredEvent() public {
        TheHydra _c = getNewContract();
        vm.startPrank(minter);
        
        vm.expectEmit(true, true, false, true);
        emit RealityAltered(minter, 0);
        
        _c.alterReality{value: mintPriceOriginal}(0);
        
        vm.stopPrank();
    }

    // --------------------------------------------------------
    // ~~ Minting -- Editions
    // --------------------------------------------------------
    function testEditionGetEditionStartId() public {
        TheHydra _c = getNewContract();
        assertEq(_c.getEditionStartId(0), 50);
        assertEq(_c.getEditionStartId(1), 100);
        assertEq(_c.getEditionStartId(2), 150);
        assertEq(_c.getEditionStartId(48), 2450);
        assertEq(_c.getEditionStartId(49), 2500);
    }
    function testEditionGetEditionStartIdRevertsWhenOutOfBounds() public {
        TheHydra _c = getNewContract();
        
        vm.expectRevert(TheHydra.BeyondTheScopeOfConsciousness.selector);
        _c.getEditionStartId(50);
    }
    function testEditionGetNextEditionIdWhenNoEditionsMinted() public {
        TheHydra _c = getNewContract();
        assertEq(_c.getNextEditionId(0), 50);
        assertEq(_c.getNextEditionId(1), 100);
        assertEq(_c.getNextEditionId(2), 150);
        assertEq(_c.getNextEditionId(48), 2450);
        assertEq(_c.getNextEditionId(49), 2500);
    }
    function testEditionGetNextEditionIdRevertsWhenOutOfBounds() public {
        TheHydra _c = getNewContract();
        
        vm.expectRevert(TheHydra.BeyondTheScopeOfConsciousness.selector);
        _c.getNextEditionId(50);
    }

    function testEditionMintFailsWithInvalidPrice() public {
        vm.expectRevert(TheHydra.CouldNotAlterReality.selector);
        testContract.alterSubReality{value: mintPriceEdition - 0.0001 ether}(0);

        vm.expectRevert(TheHydra.CouldNotAlterReality.selector);
        testContract.alterSubReality{value: mintPriceEdition + 0.0001 ether}(1);

        vm.expectRevert(TheHydra.CouldNotAlterReality.selector);
        testContract.alterSubReality{value: mintPriceOriginal}(2);
    }
    function testEditionMintFailsWithInvalidTokenId() public {
        vm.expectRevert(TheHydra.BeyondTheScopeOfConsciousness.selector);
        testContract.alterSubReality{value: mintPriceEdition}(totalSupply);
    }

    function testEditionMintSuccedsWithValidPriceAndId() public {
        TheHydra _c = getNewContract();
        vm.prank(minter);
        _c.alterSubReality{value: mintPriceEdition}(0);

        assertEq(_c.balanceOf(minter), 1);
    }
    function testEditionMintEventsRealityAlteredEvent() public {
        TheHydra _c = getNewContract();
        vm.startPrank(minter);
        
        vm.expectEmit(true, true, false, true);
        emit RealityAltered(minter, 0);
        
        _c.alterSubReality{value: mintPriceEdition}(0);
        
        vm.stopPrank();
    }

    function testEditionGetNextEditionIdAfterMinting() public {
        TheHydra _c = getNewContract();
        assertEq(_c.getNextEditionId(0), 50);

        _c.alterSubReality{value: mintPriceEdition}(0);

        assertEq(_c.getNextEditionId(0), 51);

        // next
        assertEq(_c.getNextEditionId(1), 50);
        _c.alterSubReality{value: mintPriceEdition}(1);

        assertEq(_c.getNextEditionId(0), 51);
        assertEq(_c.getNextEditionId(1), 51);

        // one more time
        _c.alterSubReality{value: mintPriceEdition}(1);

        assertEq(_c.getNextEditionId(0), 51);
        assertEq(_c.getNextEditionId(1), 52);
    }
    function testEditionGetNextEditionIdAndMintRevertsAtEditionLimit() public {
        TheHydra _c = getNewContract();
        for (uint256 i = 0; i < 50; i++) {
            _c.alterSubReality{value: mintPriceEdition}(0);
        }

        vm.expectRevert(TheHydra.BeyondTheScopeOfConsciousness.selector);
        _c.getNextEditionId(0);
        
        vm.expectRevert(TheHydra.BeyondTheScopeOfConsciousness.selector);
        testContract.alterSubReality{value: mintPriceEdition}(0);
    }

    // --------------------------------------------------------
    // ~~ Metadata ~~
    // --------------------------------------------------------
    function testSetRenderer() public {
        vm.startPrank(owner);
        
        TheHydra _c = getNewContract();
        assertEq(address(_c.renderer()), address(0));

        TheHydraRenderer _renderer = getNewRenderer(_c);

        vm.expectEmit(true, false, false, true);
        emit ConsciousnessActivated(address(_renderer));

        _c.setRenderer(_renderer);
        
        assertEq(address(_c.renderer()), address(_renderer));
        assertTrue(address(_c.renderer()) != address(_renderer.dataStore()));
        assertEq(address(_renderer.theHydra()), address(_c));

        vm.stopPrank();
    }
    function testSetRendererOnlyOwner() public {
        TheHydra _c = getNewContract();
        TheHydraRenderer _renderer = getNewRenderer(_c);

        vm.startPrank(minter);
        vm.expectRevert('UNAUTHORIZED');
        _c.setRenderer(_renderer);
        vm.stopPrank();        
    }
    function testTokenURIRevertsWhenNoRenderer() public {
        TheHydra _c = getNewContract();
        
        vm.prank(minter);
        _c.alterReality{value: mintPriceOriginal}(0);
        
        vm.expectRevert(TheHydra.ConsciousnessNotActivated.selector);
        _c.tokenURI(0);
    }
    function testTokenURIForNonExistingToken() public {
        TheHydra _c = getNewContract();
        
        vm.expectRevert(TheHydra.BeyondTheScopeOfConsciousness.selector);
        _c.tokenURI(0);
    }
    function testTokenURIForExistingToken() public {
        TheHydra _c = getNewContract();
        TheHydraRenderer _r = getNewRenderer(_c);
        
        vm.prank(owner);
        _c.setRenderer(_r);

        vm.prank(minter);
        _c.alterReality{value: mintPriceOriginal}(0);
        string memory uri = _c.tokenURI(0);

        assertTrue(bytes(uri).length > 0);
    }

    // --------------------------------------------------------
    // ~~ Burning
    // --------------------------------------------------------

    function testReturnToRealityOnlyByOwner() public {

        TheHydra _c = getNewContract();
        vm.prank(minter);
        _c.alterReality{value: mintPriceOriginal}(0);

        vm.startPrank(other);
        vm.expectRevert(TheHydra.InvalidDreamState.selector);
        _c.returnToReality(0);

        vm.stopPrank();
    }

    function testReturnToRealityBurnsWhenOwner() public {

        TheHydra _c = getNewContract();
        vm.startPrank(minter);
        _c.alterReality{value: mintPriceOriginal}(0);
        assertEq(_c.ownerOf(0), minter);
        
        _c.returnToReality(0);

        vm.expectRevert('NOT_MINTED');
        _c.ownerOf(0);

        vm.stopPrank();
    }

    function testBurnedTokenCanNotBeReMinted() public {

        TheHydra _c = getNewContract();
        vm.startPrank(minter);
        _c.alterReality{value: mintPriceOriginal}(0);
        _c.returnToReality(0);

        vm.expectRevert();
        _c.alterReality{value: mintPriceOriginal}(0);

        vm.stopPrank();
    }

    // --------------------------------------------------------
    // ~~ Withdraw any ETH in Contract ~~
    // --------------------------------------------------------
    function testWithdrawPaymentsOnlyOwner() public {
        TheHydra _c = getNewContract();
        vm.startPrank(minter);
        _c.alterReality{value: mintPriceOriginal}(0);
        vm.expectRevert('UNAUTHORIZED');
        _c.withdrawPayments(payable(minter));
        vm.stopPrank();
    }

    function testWithdrawPaymentsFromOwner() public {
        TheHydra _c = getNewContract();
        vm.prank(minter);
        _c.alterReality{value: mintPriceOriginal}(0);

        uint256 priorBalance = owner.balance;
        uint256 contractBalance = address(_c).balance;

        vm.prank(owner);
        _c.withdrawPayments(payable(owner));

        assertEq(address(_c).balance, 0);
        assertEq(owner.balance, priorBalance + contractBalance);
    }
}