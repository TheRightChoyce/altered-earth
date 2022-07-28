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
    address private owner =
        vm.addr(uint256(keccak256(abi.encodePacked("owner"))));
    address private minter =
        vm.addr(uint256(keccak256(abi.encodePacked("minter"))));
    address private other =
        vm.addr(uint256(keccak256(abi.encodePacked("other"))));

    // state variables
    uint256 totalSupply = 50 + (50 * 50);
    uint256 originalsMintPrice = 0.001 ether;
    uint256 editionsMintPrice = 0.0005 ether;
    uint256 royaltyAmount = 1000; // 1000 / 10_000 => 10%
    address royaltyReceiver = 0x18836acedeF35D4A6C00Aae46a36fAdE12ee5FF7;

    // external addresses
    address xqstgfxMainNet = 0xDf01A4040493B514605392620B3a0a05Eb8Cd295;
    ExquisiteGraphics xqstgfx = new ExquisiteGraphics();

    // Redfine any events
    event Transfer(
        address indexed from,
        address indexed to,
        uint256 indexed id
    );
    event TheHydraAwakens();
    event ConsciousnessActivated(address indexed renderer);

    function getNewContract() public returns (TheHydra) {
        return new TheHydra(owner, originalsMintPrice, editionsMintPrice);
    }

    function getNewDataStore() public returns (TheHydraDataStore) {
        return new TheHydraDataStore(owner, "ipfs://test/");
    }

    function getNewRenderer(TheHydra _c) public returns (TheHydraRenderer) {
        return
            new TheHydraRenderer(
                owner,
                address(_c),
                address(getNewDataStore()),
                address(xqstgfx)
            );
    }

    function setUp() public {
        testContract = new TheHydra(
            owner,
            originalsMintPrice,
            editionsMintPrice
        );

        vm.deal(owner, 10 ether);
        vm.deal(minter, 10 ether);
        vm.deal(other, 10 ether);
    }

    function testConstructor() public {
        TheHydra _hydra = getNewContract();

        assertEq(_hydra.owner(), owner);
        assertEq(_hydra.name(), "Altered Earth: The Hydra Collection");
        assertEq(_hydra.symbol(), "ALTERED");
        assertEq(_hydra.totalSupply(), totalSupply);
        assertEq(_hydra.originalsMintPrice(), originalsMintPrice);
        assertEq(_hydra.editionsMintPrice(), editionsMintPrice);
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

        uint256 expectedRoyalty = (100 * royaltyAmount) / 10_000;
        (address receiver, uint256 amount) = testContract.royaltyInfo(0, 100);

        assertEq(royaltyReceiver, receiver);
        assertEq(expectedRoyalty, amount);
    }

    function testSetRoyaltyInfoFailsAsNotOwner() public {
        vm.expectRevert("UNAUTHORIZED");
        vm.startPrank(address(0xd3ad));
        testContract.setRoyaltyInfo(other, 10_000);
        vm.stopPrank();
    }

    function testSetRoyaltyInfo() public {
        TheHydra _c = getNewContract();
        vm.prank(owner);
        _c.setRoyaltyInfo(other, 500); // 5%

        uint256 expectedRoyalty = (100 * 500) / 10_000;

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
        testContract.alterReality{value: originalsMintPrice}(totalSupply);
    }

    function testMintSuccedsWithValidPriceAndId() public {
        TheHydra _c = getNewContract();
        vm.prank(minter);
        _c.alterReality{value: originalsMintPrice}(0);

        assertEq(_c.balanceOf(minter), 1);
    }

    function testMintFailsWhenTokenAlreadyMinted() public {
        TheHydra _c = getNewContract();
        vm.startPrank(minter);

        _c.alterReality{value: originalsMintPrice}(0);
        vm.expectRevert("ALREADY_MINTED");
        _c.alterReality{value: originalsMintPrice}(0);

        vm.stopPrank();
    }

    function testMintEmitsTransferEvent() public {
        TheHydra _c = getNewContract();
        vm.startPrank(minter);

        vm.expectEmit(true, true, false, true);
        emit Transfer(address(0x0), minter, 0);

        _c.alterReality{value: originalsMintPrice}(0);

        vm.stopPrank();
    }

    // --------------------------------------------------------
    // ~~ Minting -- Editions
    // --------------------------------------------------------
    function testEditioneditionGetStartId() public {
        TheHydra _c = getNewContract();
        assertEq(_c.editionGetStartId(0), 50);
        assertEq(_c.editionGetStartId(1), 100);
        assertEq(_c.editionGetStartId(2), 150);
        assertEq(_c.editionGetStartId(48), 2450);
        assertEq(_c.editionGetStartId(49), 2500);
    }

    function testEditionGetEditionStartIdRevertsWhenOutOfBounds() public {
        TheHydra _c = getNewContract();

        vm.expectRevert(TheHydra.BeyondTheScopeOfConsciousness.selector);
        _c.editionGetStartId(50);
    }

    function testEditionGetNextEditionIdWhenNoEditionsMinted() public {
        TheHydra _c = getNewContract();
        assertEq(_c.editionGetNextId(0), 50);
        assertEq(_c.editionGetNextId(1), 100);
        assertEq(_c.editionGetNextId(2), 150);
        assertEq(_c.editionGetNextId(48), 2450);
        assertEq(_c.editionGetNextId(49), 2500);
    }

    function testEditionGetNextEditionIdRevertsWhenOutOfBounds() public {
        TheHydra _c = getNewContract();

        vm.expectRevert(TheHydra.BeyondTheScopeOfConsciousness.selector);
        _c.editionGetNextId(50);
    }

    function testEditionMintFailsWithInvalidPrice() public {
        vm.expectRevert(TheHydra.CouldNotAlterReality.selector);
        testContract.alterSubReality{value: editionsMintPrice - 0.0001 ether}(
            0
        );

        vm.expectRevert(TheHydra.CouldNotAlterReality.selector);
        testContract.alterSubReality{value: editionsMintPrice + 0.0001 ether}(
            1
        );

        vm.expectRevert(TheHydra.CouldNotAlterReality.selector);
        testContract.alterSubReality{value: originalsMintPrice}(2);
    }

    function testEditionMintFailsWithInvalidTokenId() public {
        vm.expectRevert(TheHydra.BeyondTheScopeOfConsciousness.selector);
        testContract.alterSubReality{value: editionsMintPrice}(totalSupply);
    }

    function testEditionMintSuccedsWithValidPriceAndId() public {
        TheHydra _c = getNewContract();
        vm.prank(minter);
        _c.alterSubReality{value: editionsMintPrice}(0);

        assertEq(_c.balanceOf(minter), 1);
        assertEq(address(_c.ownerOf(50)), minter);

        vm.expectRevert("NOT_MINTED");
        address(_c.ownerOf(0));
    }

    function testEditionMintEventsTransferEvent() public {
        TheHydra _c = getNewContract();
        vm.startPrank(minter);

        vm.expectEmit(true, true, false, true);
        emit Transfer(address(0x0), minter, 50);
        _c.alterSubReality{value: editionsMintPrice}(0);

        // next
        vm.expectEmit(true, true, false, true);
        emit Transfer(address(0x0), minter, 51);
        _c.alterSubReality{value: editionsMintPrice}(0);

        // next original
        vm.expectEmit(true, true, false, true);
        emit Transfer(address(0x0), minter, 100);
        _c.alterSubReality{value: editionsMintPrice}(1);

        vm.stopPrank();
    }

    function testEditionGetNextEditionIdAfterMinting() public {
        TheHydra _c = getNewContract();
        assertEq(_c.editionGetNextId(0), 50);

        vm.prank(minter);
        _c.alterSubReality{value: editionsMintPrice}(0);
        assertEq(_c.editionGetNextId(0), 51);

        vm.prank(minter);
        _c.alterSubReality{value: editionsMintPrice}(0);
        assertEq(_c.editionGetNextId(0), 52);

        // next
        assertEq(_c.editionGetNextId(1), 100);
        vm.prank(minter);
        _c.alterSubReality{value: editionsMintPrice}(1);

        assertEq(_c.editionGetNextId(0), 52);
        assertEq(_c.editionGetNextId(1), 101);

        // one more time
        vm.prank(minter);
        _c.alterSubReality{value: editionsMintPrice}(1);

        assertEq(_c.editionGetNextId(0), 52);
        assertEq(_c.editionGetNextId(1), 102);
    }

    function testEditionGetNextEditionIdRevertsAtEditionLimit() public {
        TheHydra _c = getNewContract();
        vm.startPrank(minter);
        for (uint256 i = 0; i < 50; i++) {
            uint256 next = _c.editionGetNextId(0);
            _c.alterSubReality{value: editionsMintPrice}(0);
            assertEq(address(_c.ownerOf(next)), minter);
        }

        vm.expectRevert(TheHydra.BeyondTheScopeOfConsciousness.selector);
        _c.editionGetNextId(0);

        vm.stopPrank();
    }

    function testEditionMintRevertsAtEditionLimit() public {
        TheHydra _c = getNewContract();
        vm.startPrank(minter);
        for (uint256 i = 0; i < 50; i++) {
            _c.alterSubReality{value: editionsMintPrice}(0);
        }

        vm.expectRevert(TheHydra.BeyondTheScopeOfConsciousness.selector);
        _c.alterSubReality{value: editionsMintPrice}(0);

        // now check another token to be sure
        for (uint256 i = 0; i < 50; i++) {
            uint256 next = _c.editionGetNextId(1);
            _c.alterSubReality{value: editionsMintPrice}(1);
            assertEq(address(_c.ownerOf(next)), minter);
        }

        vm.expectRevert(TheHydra.BeyondTheScopeOfConsciousness.selector);
        _c.alterSubReality{value: editionsMintPrice}(1);

        // now check the last token
        // now check another token to be sure
        for (uint256 i = 0; i < 50; i++) {
            uint256 next = _c.editionGetNextId(49);
            _c.alterSubReality{value: editionsMintPrice}(49);
            assertEq(address(_c.ownerOf(next)), minter);
        }

        vm.expectRevert(TheHydra.BeyondTheScopeOfConsciousness.selector);
        _c.alterSubReality{value: editionsMintPrice}(49);

        vm.stopPrank();
    }

    function testEditionGetOriginalIdWhenEdition() public {
        TheHydra _c = getNewContract();
        assertEq(_c.editionGetOriginalId(50), 0);
        assertEq(_c.editionGetOriginalId(99), 0);

        assertEq(_c.editionGetOriginalId(100), 1);
        assertEq(_c.editionGetOriginalId(149), 1);

        assertEq(_c.editionGetOriginalId(150), 2);
        assertEq(_c.editionGetOriginalId(199), 2);

        assertEq(_c.editionGetOriginalId(2450), 48);
        assertEq(_c.editionGetOriginalId(2499), 48);

        assertEq(_c.editionGetOriginalId(2500), 49);
        assertEq(_c.editionGetOriginalId(2549), 49);
    }

    function testEditionGetOriginalIdWhenOriginal() public {
        TheHydra _c = getNewContract();
        assertEq(0, _c.editionGetOriginalId(0));
        assertEq(1, _c.editionGetOriginalId(1));
        assertEq(2, _c.editionGetOriginalId(2));
        assertEq(48, _c.editionGetOriginalId(48));
        assertEq(49, _c.editionGetOriginalId(49));
    }

    function testEditionGetOriginalIdWhenOutOfBounds() public {
        TheHydra _c = getNewContract();

        vm.expectRevert(TheHydra.BeyondTheScopeOfConsciousness.selector);
        _c.editionGetOriginalId(2550);

        vm.expectRevert(TheHydra.BeyondTheScopeOfConsciousness.selector);
        _c.editionGetOriginalId(2551);
    }

    function testGetEditionIndexFromId() public {
        TheHydra _c = getNewContract();

        for (uint256 i = 0; i < 50; i++) {
            assertEq(_c.editionGetIndexFromId(50 + i), i + 1);
        }
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
        vm.expectRevert("UNAUTHORIZED");
        _c.setRenderer(_renderer);
        vm.stopPrank();
    }

    function testTokenURIRevertsWhenNoRenderer() public {
        TheHydra _c = getNewContract();

        vm.prank(minter);
        _c.alterReality{value: originalsMintPrice}(0);

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
        _c.alterReality{value: originalsMintPrice}(0);
        string memory uri = _c.tokenURI(0);

        assertTrue(bytes(uri).length > 0);
    }

    // --------------------------------------------------------
    // ~~ Burning
    // --------------------------------------------------------

    function testReturnToRealityOnlyByOwner() public {
        TheHydra _c = getNewContract();
        vm.prank(minter);
        _c.alterReality{value: originalsMintPrice}(0);

        vm.startPrank(other);
        vm.expectRevert(TheHydra.InvalidDreamState.selector);
        _c.returnToReality(0);

        vm.stopPrank();
    }

    function testReturnToRealityBurnsWhenOwner() public {
        TheHydra _c = getNewContract();
        vm.startPrank(minter);
        _c.alterReality{value: originalsMintPrice}(0);
        assertEq(_c.ownerOf(0), minter);

        _c.returnToReality(0);

        vm.expectRevert("NOT_MINTED");
        _c.ownerOf(0);

        vm.stopPrank();
    }

    function testBurnedTokenCanNotBeReMinted() public {
        /// @dev Not supported by solmate, see here: https://github.com/Rari-Capital/solmate/issues/92

        TheHydra _c = getNewContract();
        vm.startPrank(minter);
        _c.alterReality{value: originalsMintPrice}(0);
        _c.returnToReality(0);

        vm.expectRevert();
        _c.alterReality{value: originalsMintPrice}(0);

        vm.stopPrank();
    }

    // --------------------------------------------------------
    // ~~ Withdraw any ETH in Contract ~~
    // --------------------------------------------------------
    function testWithdrawPaymentsOnlyOwner() public {
        TheHydra _c = getNewContract();
        vm.startPrank(minter);
        _c.alterReality{value: originalsMintPrice}(0);
        vm.expectRevert("UNAUTHORIZED");
        _c.withdrawPayments(payable(minter));
        vm.stopPrank();
    }

    function testWithdrawPaymentsFromOwner() public {
        TheHydra _c = getNewContract();
        vm.prank(minter);
        _c.alterReality{value: originalsMintPrice}(0);

        uint256 priorBalance = owner.balance;
        uint256 contractBalance = address(_c).balance;

        vm.prank(owner);
        _c.withdrawPayments(payable(owner));

        assertEq(address(_c).balance, 0);
        assertEq(owner.balance, priorBalance + contractBalance);
    }
}
