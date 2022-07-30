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

    function getNewRenderer() public returns (TheHydraRenderer) {
        return
            new TheHydraRenderer(
                owner,
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
    // ~~ Edition Info From Original ~
    // --------------------------------------------------------
    function testEditionGetInfoFromOriginal0() public {
        TheHydra _c = getNewContract();
        TheHydra.EditionInfo memory info = _c.editionsGetInfoFromOriginal(0);

        assertEq(info.originalId, 0);
        assertEq(info.startId, 50);
        assertEq(info.endId, 99);
        assertEq(info.minted, 0);
        assertEq(info.nextId, 50);
        assertEq(info.localIndex, 1);
        assertEq(info.maxPerOriginal, 50);
    }

    function testEditionGetInfoFromOriginal1() public {
        TheHydra _c = getNewContract();
        TheHydra.EditionInfo memory info = _c.editionsGetInfoFromOriginal(1);

        assertEq(info.originalId, 1);
        assertEq(info.startId, 100);
        assertEq(info.endId, 149);
        assertEq(info.minted, 0);
        assertEq(info.nextId, 100);
        assertEq(info.localIndex, 1);
        assertEq(info.maxPerOriginal, 50);
    }

    function testEditionGetInfoFromOriginal49() public {
        TheHydra _c = getNewContract();
        TheHydra.EditionInfo memory info = _c.editionsGetInfoFromOriginal(49);

        assertEq(info.originalId, 49);
        assertEq(info.startId, 2500);
        assertEq(info.endId, 2549);
        assertEq(info.minted, 0);
        assertEq(info.nextId, 2500);
        assertEq(info.localIndex, 1);
        assertEq(info.maxPerOriginal, 50);
    }

    function testEditionGetInfoFromOriginal50Reverts() public {
        // no original 50, expect revert
        TheHydra _c = getNewContract();

        vm.expectRevert(TheHydra.BeyondTheScopeOfConsciousness.selector);
        _c.editionsGetInfoFromOriginal(50);
    }

    function testEditionGetInfoFromOriginalAfterMinting() public {
        TheHydra _c = getNewContract();
        TheHydra.EditionInfo memory info;
        TheHydra.EditionInfo memory info1;
        TheHydra.EditionInfo memory info49;

        // original 0
        vm.prank(minter);
        _c.alterSubReality{value: editionsMintPrice}(0);
        info = _c.editionsGetInfoFromOriginal(0);
        assertEq(info.nextId, 51);
        assertEq(info.minted, 1);

        // original 0 x 2
        vm.prank(minter);
        _c.alterSubReality{value: editionsMintPrice}(0);
        info = _c.editionsGetInfoFromOriginal(0);
        assertEq(info.nextId, 52);
        assertEq(info.minted, 2);

        // original 1
        vm.prank(minter);
        _c.alterSubReality{value: editionsMintPrice}(1);
        info = _c.editionsGetInfoFromOriginal(0);
        info1 = _c.editionsGetInfoFromOriginal(1);
        assertEq(info.nextId, 52);
        assertEq(info.minted, 2);
        assertEq(info1.nextId, 101);
        assertEq(info1.minted, 1);

        // original 1 x2
        vm.prank(minter);
        _c.alterSubReality{value: editionsMintPrice}(1);
        info = _c.editionsGetInfoFromOriginal(0);
        info1 = _c.editionsGetInfoFromOriginal(1);
        assertEq(info.nextId, 52);
        assertEq(info.minted, 2);
        assertEq(info1.nextId, 102);
        assertEq(info1.minted, 2);

        // original 49
        vm.prank(minter);
        _c.alterSubReality{value: editionsMintPrice}(49);
        info = _c.editionsGetInfoFromOriginal(0);
        info1 = _c.editionsGetInfoFromOriginal(1);
        info49 = _c.editionsGetInfoFromOriginal(49);
        assertEq(info.nextId, 52);
        assertEq(info.minted, 2);
        assertEq(info1.nextId, 102);
        assertEq(info1.minted, 2);
        assertEq(info49.nextId, 2501);
        assertEq(info49.minted, 1);

        // original 49 x 2
        vm.prank(minter);
        _c.alterSubReality{value: editionsMintPrice}(49);
        info = _c.editionsGetInfoFromOriginal(0);
        info1 = _c.editionsGetInfoFromOriginal(1);
        info49 = _c.editionsGetInfoFromOriginal(49);
        assertEq(info.nextId, 52);
        assertEq(info.minted, 2);
        assertEq(info1.nextId, 102);
        assertEq(info1.minted, 2);
        assertEq(info49.nextId, 2502);
        assertEq(info49.minted, 2);
    }

    function testEditionGetInfoFromOriginalAfterEditionsLimit() public {
        TheHydra _c = getNewContract();
        TheHydra.EditionInfo memory info;

        vm.startPrank(minter);
        for (uint256 i = 0; i < 50; i++) {
            info = _c.editionsGetInfoFromOriginal(0);
            _c.alterSubReality{value: editionsMintPrice}(0);
            assertEq(address(_c.ownerOf(info.nextId)), minter);
        }

        vm.expectRevert(TheHydra.EditionSoldOut.selector);
        _c.alterSubReality(0);

        info = _c.editionsGetInfoFromOriginal(0);
        assertEq(info.nextId, type(uint256).max);
        assertEq(info.minted, 50);

        // Original 49
        for (uint256 i = 0; i < 50; i++) {
            info = _c.editionsGetInfoFromOriginal(49);
            _c.alterSubReality{value: editionsMintPrice}(49);
            assertEq(address(_c.ownerOf(info.nextId)), minter);
        }

        vm.expectRevert(TheHydra.EditionSoldOut.selector);
        _c.alterSubReality(49);

        info = _c.editionsGetInfoFromOriginal(49);
        assertEq(info.nextId, type(uint256).max);
        assertEq(info.minted, 50);

        vm.stopPrank();
    }

    // --------------------------------------------------------
    // ~~ Edition Info From Edition Id ~
    // --------------------------------------------------------

    function testEditionGetInfoFromEdition50() public {
        TheHydra _c = getNewContract();
        TheHydra.EditionInfo memory info = _c.editionsGetInfoFromEdition(50);

        assertEq(info.originalId, 0);
        assertEq(info.startId, 50);
        assertEq(info.endId, 99);
        assertEq(info.minted, 0);
        assertEq(info.nextId, 50);
        assertEq(info.localIndex, 1);
        assertEq(info.maxPerOriginal, 50);
    }

    function testEditionGetInfoFromEdition51() public {
        TheHydra _c = getNewContract();
        TheHydra.EditionInfo memory info = _c.editionsGetInfoFromEdition(51);

        assertEq(info.originalId, 0);
        assertEq(info.startId, 50);
        assertEq(info.endId, 99);
        assertEq(info.minted, 0);
        assertEq(info.nextId, 50);
        assertEq(info.localIndex, 2);
        assertEq(info.maxPerOriginal, 50);
    }

    function testEditionGetInfoFromEdition100() public {
        TheHydra _c = getNewContract();
        TheHydra.EditionInfo memory info = _c.editionsGetInfoFromEdition(100);

        assertEq(info.originalId, 1);
        assertEq(info.startId, 100);
        assertEq(info.endId, 149);
        assertEq(info.minted, 0);
        assertEq(info.nextId, 100);
        assertEq(info.localIndex, 1);
        assertEq(info.maxPerOriginal, 50);
    }

    function testEditionGetInfoFromEdition2500() public {
        TheHydra _c = getNewContract();
        TheHydra.EditionInfo memory info = _c.editionsGetInfoFromEdition(2500);

        assertEq(info.originalId, 49);
        assertEq(info.startId, 2500);
        assertEq(info.endId, 2549);
        assertEq(info.minted, 0);
        assertEq(info.nextId, 2500);
        assertEq(info.localIndex, 1);
        assertEq(info.maxPerOriginal, 50);
    }

    function testEditionGetInfoFromEdition2550Reverts() public {
        TheHydra _c = getNewContract();

        vm.expectRevert(TheHydra.BeyondTheScopeOfConsciousness.selector);
        _c.editionsGetInfoFromEdition(2550);

        vm.expectRevert(TheHydra.BeyondTheScopeOfConsciousness.selector);
        _c.editionsGetInfoFromEdition(2551);
    }

    function testEditionGetInfoFromEditionAfterMinting() public {
        TheHydra _c = getNewContract();
        TheHydra.EditionInfo memory info50;
        TheHydra.EditionInfo memory info100;
        TheHydra.EditionInfo memory info2500;

        // edition50
        vm.prank(minter);
        _c.alterSubReality{value: editionsMintPrice}(0);
        info50 = _c.editionsGetInfoFromEdition(50);
        assertEq(info50.nextId, 51);
        assertEq(info50.minted, 1);

        // edition50 x 2
        vm.prank(minter);
        _c.alterSubReality{value: editionsMintPrice}(0);
        info50 = _c.editionsGetInfoFromEdition(50);
        assertEq(info50.nextId, 52);
        assertEq(info50.minted, 2);

        // edition100
        vm.prank(minter);
        _c.alterSubReality{value: editionsMintPrice}(1);
        info50 = _c.editionsGetInfoFromEdition(50);
        info100 = _c.editionsGetInfoFromEdition(100);
        assertEq(info50.nextId, 52);
        assertEq(info50.minted, 2);
        assertEq(info100.nextId, 101);
        assertEq(info100.minted, 1);

        // edition100 x 2
        vm.prank(minter);
        _c.alterSubReality{value: editionsMintPrice}(1);
        info50 = _c.editionsGetInfoFromEdition(50);
        info100 = _c.editionsGetInfoFromEdition(100);
        assertEq(info50.nextId, 52);
        assertEq(info50.minted, 2);
        assertEq(info100.nextId, 102);
        assertEq(info100.minted, 2);

        // edition2500
        vm.prank(minter);
        _c.alterSubReality{value: editionsMintPrice}(49);
        info2500 = _c.editionsGetInfoFromEdition(2500);
        assertEq(info2500.nextId, 2501);
        assertEq(info2500.minted, 1);
    }

    function testEditionGetInfoFromEditionAfterEditionsLimit() public {
        TheHydra _c = getNewContract();
        TheHydra.EditionInfo memory info;

        vm.startPrank(minter);
        for (uint256 i = 0; i < 50; i++) {
            info = _c.editionsGetInfoFromEdition(50 + i);
            _c.alterSubReality{value: editionsMintPrice}(0);
            assertEq(address(_c.ownerOf(info.nextId)), minter);
            assertEq(info.localIndex, i + 1);
        }

        info = _c.editionsGetInfoFromEdition(50);
        assertEq(info.nextId, type(uint256).max);
        assertEq(info.minted, 50);

        // Original 49
        for (uint256 i = 0; i < 50; i++) {
            info = _c.editionsGetInfoFromEdition(49 * 50 + 50 + i);
            _c.alterSubReality{value: editionsMintPrice}(49);
            assertEq(info.originalId, 49);
            assertEq(address(_c.ownerOf(info.nextId)), minter);
            assertEq(info.localIndex, i + 1);
        }

        info = _c.editionsGetInfoFromEdition(2500);
        assertEq(info.nextId, type(uint256).max);
        assertEq(info.minted, 50);

        vm.stopPrank();
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

    // --------------------------------------------------------
    // ~~ Edition Minting ~
    // --------------------------------------------------------

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

    function testEditionMintRevertsAtEditionLimit() public {
        TheHydra _c = getNewContract();
        vm.startPrank(minter);
        for (uint256 i = 0; i < 50; i++) {
            _c.alterSubReality{value: editionsMintPrice}(0);
        }

        vm.expectRevert(TheHydra.EditionSoldOut.selector);
        _c.alterSubReality{value: editionsMintPrice}(0);

        // now check another token to be sure
        for (uint256 i = 0; i < 50; i++) {
            _c.alterSubReality{value: editionsMintPrice}(1);
        }

        vm.expectRevert(TheHydra.EditionSoldOut.selector);
        _c.alterSubReality{value: editionsMintPrice}(1);

        // now check the last token
        for (uint256 i = 0; i < 50; i++) {
            _c.alterSubReality{value: editionsMintPrice}(49);
        }

        vm.expectRevert(TheHydra.EditionSoldOut.selector);
        _c.alterSubReality{value: editionsMintPrice}(49);

        vm.stopPrank();
    }

    // --------------------------------------------------------
    // ~~ Metadata ~~
    // --------------------------------------------------------
    function testSetRenderer() public {
        vm.startPrank(owner);

        TheHydra _c = getNewContract();
        assertEq(address(_c.renderer()), address(0));

        TheHydraRenderer _renderer = getNewRenderer();

        vm.expectEmit(true, false, false, true);
        emit ConsciousnessActivated(address(_renderer));

        _c.setRenderer(_renderer);

        assertEq(address(_c.renderer()), address(_renderer));
        assertTrue(address(_c.renderer()) != address(_renderer.dataStore()));

        vm.stopPrank();
    }

    function testSetRendererOnlyOwner() public {
        TheHydra _c = getNewContract();
        TheHydraRenderer _renderer = getNewRenderer();

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
        TheHydraRenderer _r = getNewRenderer();

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
