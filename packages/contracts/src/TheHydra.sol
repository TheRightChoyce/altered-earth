// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

// third party includes
import "solmate/tokens/ERC721.sol";
import "solmate/auth/Owned.sol";
import "solmate/utils/SafeTransferLib.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

// local includes
import "./interfaces/ITheHydra.sol";
import "./interfaces/ITheHydraRenderer.sol";

// TODO -- Did I add the metadata interface support?

/// @title TheHydra is the genesis collection of the Altered Earth NFT series
/// @author therightchoyce.eth
/// @notice This implemeints the ERC721 standard
/// @dev Modified ERC721 for minting and managing tokens
contract TheHydra is Owned, ERC721, ITheHydra {
    /// @dev Enable toString and other string functions on uint256
    using Strings for uint256;

    /// @dev Store the MAX_INT as a constant and we then use this as an invalid ID value
    uint256 constant MAX_INT = type(uint256).max;

    // --------------------------------------------------------
    // ~~ Core state variables ~~
    // --------------------------------------------------------

    /// @dev Renderer contract for metadata * on-chain artwork
    ITheHydraRenderer public renderer;

    // --------------------------------------------------------
    // ~~ Edition configuration ~~
    // --------------------------------------------------------

    /// @dev The maximum available editions per original.
    uint256 constant editionsTotalSupplyPerOriginal = 50;

    /// @dev Each original will allow the gifting of 5 editions, giftable by the current owner
    uint256 constant editionsGiftSupplyPerOriginal = 5;

    /// @dev Max edition count per origial IE TotalSupply - 1
    uint256 constant editionsCountPerOriginal = 49;

    /// @dev Max edition count available to mint, IE TotalSupply - 1 - 5
    uint256 constant editionsCountToMint = 44;

    /// @dev Max edition count available to gift, IE GiftSupply - 1
    uint256 constant editionsCountToGift = 4;

    /// @dev The total number of 1-of-1 original NFTs available
    uint256 constant editionsTotalSupply = 2500;

    /// @dev This is the maximium Id available for the editions.. I.E if there are 2500 editions and 50 originals, the max editionId is 2549. Used to save gas during when doing > or < logic.
    uint256 constant editionsMaxId = 2549;

    /// @dev The default mint price for an on-chain edition. Set to immutable to allow us to pass in the price to the constructor for testing and to easily change the price when pushing the contract live
    uint256 public immutable editionsMintPrice;

    /// @dev Easily track the number of editions minted for each original contract. Using a counter instead of tracking the starting index because if we tracked the starting index for each edition, then there would be a need to initilize each starting index to a particular sequenced number vs. just allowing default value of 0 here.
    mapping(uint256 => uint256) editionsMintedPerOriginal;

    /// @dev Holds a mapping of originalId => total amount of editions that have been gifted
    mapping(uint256 => uint256) editionsGiftedPerOriginal;

    // --------------------------------------------------------
    // ~~ Originals configuration ~~
    // --------------------------------------------------------

    /// @dev The total number of 1-of-1 original NFTs available
    uint256 constant originalsSupply = 50;

    /// @dev This is the maximium Id available for the originals.. I.E with 50 available and starting from 0, the originalsMaxId should be 49. Used to save gas during when doing > or < logic.
    uint256 constant originalsMaxId = 49;

    /// @dev The default mint price for a 1-of-1 original
    uint256 public immutable originalsMintPrice;

    // --------------------------------------------------------
    // ~~ Other ~~
    // --------------------------------------------------------

    /// @dev Track the total supply available to mint in this collection, this includes all originals + editions.
    uint256 public constant totalSupply = 2550;

    // --------------------------------------------------------
    // ~~ Events ~~
    // --------------------------------------------------------

    // TODO -- optimize events since Solmate also emits some of its own by default

    /// @dev When this contract is created
    event TheHydraAwakens();

    /// @dev When the renderer contract is set and available
    event ConsciousnessActivated(address indexed renderer);

    /// @dev When an edition is gifted
    event Gift(
        address indexed from,
        address indexed to,
        uint256 originalId,
        uint256 indexed editionId
    );

    // --------------------------------------------------------
    // ~~ Errors ~~
    // --------------------------------------------------------

    /// @dev A general error when trying to mint
    error CouldNotAlterReality();

    /// @dev When an originalId is out of bounds, or an edition has reached its mint limit
    error BeyondTheScopeOfConsciousness();

    /// @dev When all editions for an original are minted
    error EditionsAreEphemrialAndFleeting();

    /// @dev When all editions for an original are gifted
    error GiftsAreEphemrialAndFleeting();

    /// @dev When a h4ck3r tries to steal out tokens
    error PayeeNotInDreamState();

    /// @dev When the provided operator isn't the owner
    error InvalidDreamState();

    /// @dev When the renderer isn't configured
    error ConsciousnessNotActivated();

    // --------------------------------------------------------
    // ~~ Modifiers ~~
    // --------------------------------------------------------

    /// @dev Ensures the payable amount is correct
    /// @param _costToMint the cost to mint the NFT specified in wrapped function
    modifier ElevatingConsciousnessHasACost(uint256 _costToMint) {
        if (msg.value != _costToMint) revert CouldNotAlterReality();
        _;
    }

    /// @dev Ensures tokenId is within the valid range token range
    /// @param _originaId The token id to check
    modifier CheckConsciousness(uint256 _originaId) {
        // currently allowing zero-based ids
        if (_originaId > originalsMaxId) revert BeyondTheScopeOfConsciousness();
        _;
    }

    /// @dev Fail if an edition has reached its mint capacity
    /// @param _originalId The edition id to check
    modifier CheckSubConsciousness(uint256 _originalId) {
        // currently allowing zero-based ids
        if (editionsMintedPerOriginal[_originalId] > editionsCountToMint) {
            revert EditionsAreEphemrialAndFleeting();
        }
        _;
    }

    /// @dev Fail if an edition has reached its gift capacity
    /// @param _originalId The edition id to check
    modifier CheckEditionGiftAvailability(uint256 _originalId) {
        // currently allowing zero-based ids
        if (editionsGiftedPerOriginal[_originalId] > editionsCountToGift) {
            revert GiftsAreEphemrialAndFleeting();
        }
        _;
    }

    // TODO -- add tests for CheckEditionIdBoundries

    /// @dev Fail if the editionId is actually an originalId, or if it is beyond the max number of editions
    /// @param _editionId The tokenId of this edition
    modifier CheckEditionIdBoundries(uint256 _editionId) {
        /// @dev If this is actually an original. OriginalsSupply is 50, editions start at 50, so editionId of 50 should pass
        if (_editionId < originalsSupply)
            revert BeyondTheScopeOfConsciousness();
        /// @dev if this is higher then the editions we have available
        if (_editionId > editionsMaxId) revert BeyondTheScopeOfConsciousness();
        _;
    }

    /// @dev Defer this to the Solmate contract's _mint function to save gas, since it already has an ownership check built in -- in theory this checks to ensure this token is not already owned
    modifier RealityNotAlreadyAltered(uint256 id) {
        // TODO -- do not have duplicate modifiers
        _;
    }

    // --------------------------------------------------------
    // ~~ Constructor Logic ~~
    // --------------------------------------------------------

    /// @param _owner The owner of the contract, when deployed
    /// @param _originalsMintPrice Mint price for each origial
    /// @param _editionsMintPrice Mint price for each edition
    constructor(
        address _owner,
        uint256 _originalsMintPrice,
        uint256 _editionsMintPrice
    ) ERC721("Altered Earth: The Hydra Collection", "ALTERED") Owned(_owner) {
        /// @dev By default -> altered-earth.eth and 10% -- can be changed using the setRoyaltyInfo function
        royalties = Royalties(
            0xC0f9Bd81E13F8b6f7c54878dB4850986127f9018,
            1000 // 1000 / 10_000 => 10%
        );

        // Setup initial mint prices
        originalsMintPrice = _originalsMintPrice;
        editionsMintPrice = _editionsMintPrice;

        emit TheHydraAwakens();
    }

    // --------------------------------------------------------
    // ~~ MetaData ~~
    // --------------------------------------------------------

    /// @notice Sets the rendering/metadata contract address
    /// @dev The metadata address handles off-chain metadata and on-chain artwork
    /// @param _renderer The address of the metadata contract
    function setRenderer(ITheHydraRenderer _renderer) external onlyOwner {
        renderer = _renderer;
        emit ConsciousnessActivated(address(_renderer));
    }

    /// @notice Standard URI function to get the token metadata
    /// @param id Id of token requested
    function tokenURI(uint256 id) public view override returns (string memory) {
        /// @dev Ensure this id is in a dream state
        if (_ownerOf[id] == address(0)) revert BeyondTheScopeOfConsciousness();

        /// @dev Ensure a rendering contract is set
        if (address(renderer) == address(0)) revert ConsciousnessNotActivated();

        return renderer.tokenURI(id);
    }

    // --------------------------------------------------------
    // ~~ Mint Functions => Originals ~~
    // --------------------------------------------------------
    function alterReality(uint256 id)
        external
        payable
        CheckConsciousness(id)
        ElevatingConsciousnessHasACost(originalsMintPrice)
        RealityNotAlreadyAltered(id)
    {
        _safeMint(msg.sender, id, "Welcome to TheHydra's Reality");
    }

    // --------------------------------------------------------
    // ~~ Mint Functions => Editions ~~
    // --------------------------------------------------------

    /// @notice Mint an edition of an original
    /// @dev This will revert if trying to mint more than 45 of an edition, since we need 5 allocated for gifting
    /// @param _originalId TokenId of the original 1-of-1 NFT
    function alterSubReality(uint256 _originalId)
        external
        payable
        CheckConsciousness(_originalId)
        CheckSubConsciousness(_originalId)
        ElevatingConsciousnessHasACost(editionsMintPrice)
    {
        /// @dev originals offset + editionsOffset + total minted + total gifted
        uint256 nextEditionId = originalsSupply +
            (_originalId * editionsTotalSupplyPerOriginal) +
            editionsMintedPerOriginal[_originalId] +
            editionsGiftedPerOriginal[_originalId];

        ++editionsMintedPerOriginal[_originalId];

        _safeMint(msg.sender, nextEditionId, "Welcome to TheHydra's Reality");
    }

    function giftEdition(uint256 _originalId, address _recipient)
        external
        CheckEditionGiftAvailability(_originalId)
    {
        /// @dev ensure the sender is the owner
        if (ownerOf(_originalId) != msg.sender) {
            revert InvalidDreamState();
        }

        /// @dev originals offset + editionsOffset + total minted + total gifted
        uint256 nextEditionId = originalsSupply +
            (_originalId * editionsTotalSupplyPerOriginal) +
            editionsMintedPerOriginal[_originalId] +
            editionsGiftedPerOriginal[_originalId];

        // increase the gifted count
        ++editionsGiftedPerOriginal[_originalId];

        _safeMint(
            _recipient,
            nextEditionId,
            abi.encodePacked("Gift from ", msg.sender)
        );

        // emit the gift event
        emit Gift(msg.sender, _recipient, _originalId, nextEditionId);
    }

    // --------------------------------------------------------
    // ~~ Editions Info & Status ~~
    // --------------------------------------------------------
    /// @notice Gets all the information about the editions for this original
    /// @dev Returns a struct containing edition startId, endId, minted count, soldOut status, next EditionId to be minted, and the localindx (ie. 3 of 50)
    /// @param _originalId The tokenId of the the original
    function editionsGetInfoFromOriginal(uint256 _originalId)
        public
        view
        CheckConsciousness(_originalId)
        returns (EditionInfo memory)
    {
        uint256 startId = originalsSupply +
            (_originalId * editionsTotalSupplyPerOriginal);
        uint256 endId = startId + editionsCountPerOriginal;
        uint256 minted = editionsMintedPerOriginal[_originalId];
        uint256 gifted = editionsGiftedPerOriginal[_originalId];

        /// @dev sold out means no more for sale, so this is 50 - the 5 we reserved for gifting
        bool soldOut = (minted == 45);

        /// @dev the nextId should always return the nextId, unless that id would be out of bounds for this range of editiosn.. IE for original 0, the nextId should never return 51
        uint256 nextId = minted + gifted == 50
            ? MAX_INT
            : startId + minted + gifted;

        /// @dev Take the reminder and then add 1 to convert from 0-based to 1-based counting
        uint256 localIndex = soldOut
            ? MAX_INT
            : (nextId % editionsTotalSupplyPerOriginal) + 1;

        return
            EditionInfo(
                _originalId,
                startId,
                endId,
                minted,
                gifted,
                soldOut,
                nextId,
                localIndex,
                editionsTotalSupplyPerOriginal
            );
    }

    // --------------------------------------------------------
    // ~~ BURN ~~
    // --------------------------------------------------------

    /// @notice Send your AlteredEarth token back to Reality
    /// @dev Burns it
    /// @param id Id of the NFT to burn
    function returnToReality(uint256 id) public {
        // TODO -- It looks like if a token is burned, someone else could then come back and mint it again.. need to ensure there isn't a way to do that.

        if (_ownerOf[id] != msg.sender) revert InvalidDreamState();
        _burn(id);
    }

    // --------------------------------------------------------
    // ~~ ERC165 Support ~~
    // --------------------------------------------------------

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override
        returns (bool)
    {
        return
            interfaceId == 0x2a55205a || // ERC2981
            super.supportsInterface(interfaceId);
    }

    // --------------------------------------------------------
    // ~~ ERC2981 Implementation AKA Royalties ~~
    // --------------------------------------------------------

    /// @dev Store info about token royalties
    struct Royalties {
        address receiver;
        uint24 amount;
    }
    Royalties private royalties;

    /// @notice EIP-2981 royalty standard for on-chain royalties
    function royaltyInfo(uint256, uint256 _salePrice)
        external
        view
        returns (address receiver, uint256 royaltyAmount)
    {
        receiver = royalties.receiver;
        royaltyAmount = (_salePrice * royalties.amount) / 10_000;
    }

    /// @notice Update royalty information
    /// @param _receiver The receiver of royalty payments
    /// @param _amount The royalty percentage with two decimals (10000 = 100)
    function setRoyaltyInfo(address _receiver, uint256 _amount)
        external
        onlyOwner
    {
        royalties = Royalties(_receiver, uint24(_amount));
    }

    // --------------------------------------------------------
    // Withdraw ETH in contract
    // --------------------------------------------------------

    /// @notice Allows the owner to withdraw eth in this contract
    /// @param _payee Wallet to send the funds to
    function withdrawFunds(address payable _payee) external onlyOwner {
        if (address(this).balance == 0) revert PayeeNotInDreamState();
        SafeTransferLib.safeTransferETH(_payee, address(this).balance);
    }

    // --------------------------------------------------------
    // ~~ Helper functions ~~
    // --------------------------------------------------------
    /// @notice Returns the owner of a token, or the zero address if unowned
    /// @dev This is implemented as a helper for the dapp -- this funtion will not revert when a token is unowned, making it easier to check ownership from the front-end
    /// @param id The id of the token
    /// @return owner address Either the current owner or address(0)
    function ownerOfOrNull(uint256 id) public view returns (address owner) {
        return _ownerOf[id];
    }

    // --------------------------------------------------------
    // ~~ Proxy i.e. Gas-less listings on exchanges or      ~~
    // ~~ allowing future AltredEarth contracts to manage   ~~
    // ~~ this contract with the need for user approval     ~~
    // --------------------------------------------------------

    // TODO -- Solmate doesn't use a function for isApprovedForAll which makes it incredibly difficult to override that functionality
}
