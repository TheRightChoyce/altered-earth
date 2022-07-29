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

    function testEditionGetInfoFromOriginal50() public {
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

        vm.expectRevert(TheHydra.BeyondTheScopeOfConsciousness.selector);
        _c.editionsGetNextId(0);

        info = _c.editionsGetInfoFromOriginal(0);
        assertEq(info.nextId, type(uint256).max);
        assertEq(info.minted, 50);

        // Original 49
        for (uint256 i = 0; i < 50; i++) {
            info = _c.editionsGetInfoFromOriginal(49);
            _c.alterSubReality{value: editionsMintPrice}(49);
            assertEq(address(_c.ownerOf(info.nextId)), minter);
        }

        vm.expectRevert(TheHydra.BeyondTheScopeOfConsciousness.selector);
        _c.editionsGetNextId(49);

        info = _c.editionsGetInfoFromOriginal(49);
        assertEq(info.nextId, type(uint256).max);
        assertEq(info.minted, 50);

        vm.stopPrank();
    }

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

        // TODO -- should be the mint function we're checking
        vm.expectRevert(TheHydra.BeyondTheScopeOfConsciousness.selector);
        _c.editionsGetNextId(0);

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

        // TODO -- should be the mint function we're checking
        vm.expectRevert(TheHydra.BeyondTheScopeOfConsciousness.selector);
        _c.editionsGetNextId(49);

        info = _c.editionsGetInfoFromEdition(2500);
        assertEq(info.nextId, type(uint256).max);
        assertEq(info.minted, 50);

        vm.stopPrank();
    }

    function testEditioneditionsGetStartId() public {
        TheHydra _c = getNewContract();
        assertEq(_c.editionsGetStartId(0), 50);
        assertEq(_c.editionsGetStartId(1), 100);
        assertEq(_c.editionsGetStartId(2), 150);
        assertEq(_c.editionsGetStartId(48), 2450);
        assertEq(_c.editionsGetStartId(49), 2500);
    }

    function testEditionGetEditionStartIdRevertsWhenOutOfBounds() public {
        TheHydra _c = getNewContract();

        vm.expectRevert(TheHydra.BeyondTheScopeOfConsciousness.selector);
        _c.editionsGetStartId(50);
    }

    function testEditionGetNextEditionIdWhenNoEditionsMinted() public {
        TheHydra _c = getNewContract();
        assertEq(_c.editionsGetNextId(0), 50);
        assertEq(_c.editionsGetNextId(1), 100);
        assertEq(_c.editionsGetNextId(2), 150);
        assertEq(_c.editionsGetNextId(48), 2450);
        assertEq(_c.editionsGetNextId(49), 2500);
    }

    function testEditionGetNextEditionIdRevertsWhenOutOfBounds() public {
        TheHydra _c = getNewContract();

        vm.expectRevert(TheHydra.BeyondTheScopeOfConsciousness.selector);
        _c.editionsGetNextId(50);
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

    // TODO
    function testEditionGetNextEditionIdAfterMinting() public {
        TheHydra _c = getNewContract();
        assertEq(_c.editionsGetNextId(0), 50);

        vm.prank(minter);
        _c.alterSubReality{value: editionsMintPrice}(0);
        assertEq(_c.editionsGetNextId(0), 51);

        vm.prank(minter);
        _c.alterSubReality{value: editionsMintPrice}(0);
        assertEq(_c.editionsGetNextId(0), 52);

        // next
        assertEq(_c.editionsGetNextId(1), 100);
        vm.prank(minter);
        _c.alterSubReality{value: editionsMintPrice}(1);

        assertEq(_c.editionsGetNextId(0), 52);
        assertEq(_c.editionsGetNextId(1), 101);

        // one more time
        vm.prank(minter);
        _c.alterSubReality{value: editionsMintPrice}(1);

        assertEq(_c.editionsGetNextId(0), 52);
        assertEq(_c.editionsGetNextId(1), 102);
    }

    // TODO
    function testEditionGetNextEditionIdRevertsAtEditionLimit() public {
        TheHydra _c = getNewContract();
        vm.startPrank(minter);
        for (uint256 i = 0; i < 50; i++) {
            uint256 next = _c.editionsGetNextId(0);
            _c.alterSubReality{value: editionsMintPrice}(0);
            assertEq(address(_c.ownerOf(next)), minter);
        }

        vm.expectRevert(TheHydra.BeyondTheScopeOfConsciousness.selector);
        _c.editionsGetNextId(0);

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
            uint256 next = _c.editionsGetNextId(1);
            _c.alterSubReality{value: editionsMintPrice}(1);
            assertEq(address(_c.ownerOf(next)), minter);
        }

        vm.expectRevert(TheHydra.BeyondTheScopeOfConsciousness.selector);
        _c.alterSubReality{value: editionsMintPrice}(1);

        // now check the last token
        // now check another token to be sure
        for (uint256 i = 0; i < 50; i++) {
            uint256 next = _c.editionsGetNextId(49);
            _c.alterSubReality{value: editionsMintPrice}(49);
            assertEq(address(_c.ownerOf(next)), minter);
        }

        vm.expectRevert(TheHydra.BeyondTheScopeOfConsciousness.selector);
        _c.alterSubReality{value: editionsMintPrice}(49);

        vm.stopPrank();
    }

    // TODO - remove
    function testEditionGetOriginalIdWhenEdition() public {
        TheHydra _c = getNewContract();
        assertEq(_c.editionsGetOriginalId(50), 0);
        assertEq(_c.editionsGetOriginalId(99), 0);

        assertEq(_c.editionsGetOriginalId(100), 1);
        assertEq(_c.editionsGetOriginalId(149), 1);

        assertEq(_c.editionsGetOriginalId(150), 2);
        assertEq(_c.editionsGetOriginalId(199), 2);

        assertEq(_c.editionsGetOriginalId(2450), 48);
        assertEq(_c.editionsGetOriginalId(2499), 48);

        assertEq(_c.editionsGetOriginalId(2500), 49);
        assertEq(_c.editionsGetOriginalId(2549), 49);
    }

    // TODO - remove
    function testEditionGetOriginalIdWhenOriginal() public {
        TheHydra _c = getNewContract();
        assertEq(0, _c.editionsGetOriginalId(0));
        assertEq(1, _c.editionsGetOriginalId(1));
        assertEq(2, _c.editionsGetOriginalId(2));
        assertEq(48, _c.editionsGetOriginalId(48));
        assertEq(49, _c.editionsGetOriginalId(49));
    }

    function testEditionGetOriginalIdWhenOutOfBounds() public {
        TheHydra _c = getNewContract();

        vm.expectRevert(TheHydra.BeyondTheScopeOfConsciousness.selector);
        _c.editionsGetOriginalId(2550);

        vm.expectRevert(TheHydra.BeyondTheScopeOfConsciousness.selector);
        _c.editionsGetOriginalId(2551);
    }

    function testGetEditionIndexFromId() public {
        TheHydra _c = getNewContract();

        for (uint256 i = 0; i < 50; i++) {
            assertEq(_c.editionsGetIndexFromId(50 + i), i + 1);
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
