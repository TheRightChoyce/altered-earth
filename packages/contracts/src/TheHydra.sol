// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

// third party includes
import "solmate/tokens/ERC721.sol";
import "solmate/auth/Owned.sol";
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

    // --------------------------------------------------------
    // ~~ Core state variables ~~
    // --------------------------------------------------------

    /// @dev Renderer contract for metadata * on-chain artwork
    ITheHydraRenderer public renderer;

    /// @dev Easily organize all the edition information
    struct EditionInfo {
        /// @dev The maximum available editions per original.
        uint256 supplyPerOriginal;
        /// @dev The maximum available editions per original.
        uint256 maxCountPerOriginal;
        uint256 totalSupply;
        uint256 maxTokenId;
        uint256 mintPrice;
    }

    /// @dev Easily organize all the original information
    struct OriginalInfo {
        uint256 totalSupply;
        uint256 mintPrice;
        uint256 maxTokendId;
    }

    // --------------------------------------------------------
    // ~~ Edition configuration ~~
    // --------------------------------------------------------

    /// @dev The maximum available editions per original.
    uint256 constant editionsPerOriginal = 50;

    /// @dev Max edition count per origial
    uint256 constant editionsCountPerOriginal = 49;

    /// @dev The total number of 1-of-1 original NFTs available
    uint256 constant editionsSupply = 2500;

    /// @dev This is the maximium Id available for the editions.. I.E if there are 2500 editions and 50 originals, the max editionId is 2549. Used to save gas during when doing > or < logic.
    uint256 immutable editionsMaxId = 2549;

    /// @dev The default mint price for an on-chain edition
    uint256 public immutable editionsMintPrice;

    /// @dev Easily track the number of editions minted for each original contract. Using a counter instead of tracking the starting index because if we tracked the starting index for each edition, then there would be a need to initilize each starting index to a particular sequenced number vs. just allowing default value of 0 here.
    mapping(uint256 => uint256) editionsMinted;

    // --------------------------------------------------------
    // ~~ Original configuration ~~
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

    /// @dev Track the total supply available to mint in this collection, this includes all originals + editions => originals + (originals * editionsPer)
    uint256 public immutable totalSupply = 2550;

    // --------------------------------------------------------
    // ~~ Events ~~
    // --------------------------------------------------------

    /// @dev When this contract is created
    event TheHydraAwakens();

    /// @dev When a new Hydra artwork is acquired, reality becomes altered
    event RealityAltered(address indexed from, uint256 tokenId);

    /// @dev When the renderer contract is set and available
    event ConsciousnessActivated(address indexed renderer);

    // --------------------------------------------------------
    // ~~ Errors ~~
    // --------------------------------------------------------

    error CouldNotAlterReality();
    error BeyondTheScopeOfConsciousness();
    error RealityAlreadyAltered();
    error PayeeNotInDreamState();
    error InvalidDreamState();
    error ConsciousnessNotActivated();

    // --------------------------------------------------------
    // ~~ Modifiers ~~
    // --------------------------------------------------------

    /// @dev Ensures the payable amount is correct
    /// @param costToMint the cost to mint the NFT specified in wrapped function
    modifier ElevatingConsciousnessHasACost(uint256 costToMint) {
        if (msg.value != costToMint) revert CouldNotAlterReality();
        _;
    }

    /// @dev Ensures tokenId is within the valid range token range
    /// @param _id The token id to check
    modifier CheckConsciousness(uint256 _id) {
        // currently allowing zero-based ids
        if (_id > originalsMaxId) revert BeyondTheScopeOfConsciousness();
        _;
    }
    /// @dev Fail if an edition has reached its mint capacity
    /// @param _originalId The edition id to check
    modifier CheckSubConsciousness(uint256 _originalId) {
        // currently allowing zero-based ids
        if (editionsMinted[_originalId] > editionsCountPerOriginal)
            revert BeyondTheScopeOfConsciousness();
        _;
    }

    /// @dev Fail if the editionId is actually an originalId, or if it is beyond the max number of editions
    /// @param _editionId The tokenId of this edition
    modifier CheckEditionIdBoundries(uint256 _editionId) {
        if (_editionId < originalsSupply)
            revert BeyondTheScopeOfConsciousness();
        if (_editionId > editionsMaxId) revert BeyondTheScopeOfConsciousness();
        _;
    }

    /// @dev Defer this to the Solmate contract's _mint function to save gas, since it already has an ownership check built in -- in theory this checks to ensure this token is not already owned
    modifier RealityNotAlreadyAltered(uint256 id) {
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
        // therightchoyce.eth and 10% -- can be changed later
        royalties = Royalties(
            address(0x18836acedeF35D4A6C00Aae46a36fAdE12ee5FF7),
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
        ElevatingConsciousnessHasACost(originalsMintPrice)
        CheckConsciousness(id)
        RealityNotAlreadyAltered(id)
    {
        _safeMint(msg.sender, id, "Welcome to TheHydra's Reality");
    }

    // --------------------------------------------------------
    // ~~ Mint Functions => Editions ~~
    // --------------------------------------------------------

    /// @notice Returns the original id based on any original or edition Id provided
    /// @param _id TokenId of an original 1-of-1, or edition NFT
    function editionGetOriginalId(uint256 _id) public pure returns (uint256) {
        if (_id > editionsMaxId) revert BeyondTheScopeOfConsciousness();

        if (_id < originalsSupply) {
            return _id;
        }
        return (_id - originalsSupply) / editionsPerOriginal;
    }

    /// @notice Gets the starting index for the editions based off an original
    /// @param _originalId TokenId of the original 1-of-1 NFT
    function editionGetStartId(uint256 _originalId)
        public
        pure
        CheckConsciousness(_originalId)
        returns (uint256)
    {
        /// @dev (originalId * editionsPerOriginal) + numOriginals
        return (_originalId * editionsPerOriginal) + originalsSupply;
    }

    /// @notice Gets the next sequental id available to mint for a particular edition
    /// @param _originalId TokenId of the original 1-of-1 NFT
    function editionGetNextId(uint256 _originalId)
        public
        view
        CheckConsciousness(_originalId)
        CheckSubConsciousness(_originalId)
        returns (uint256)
    {
        /// @dev same as editionGetStartId + add the counter
        return
            (_originalId * editionsPerOriginal) +
            originalsSupply +
            editionsMinted[_originalId];
    }

    /// @notice Gets the current number of editions minted for this original
    /// @param _originalId TokenId of the original 1-of-1 NFT
    function editionGetMintCount(uint256 _originalId)
        public
        view
        CheckConsciousness(_originalId)
        returns (uint256)
    {
        return editionsMinted[_originalId];
    }

    /// @notice Given any editionId, determine the index of that edition.. I.E is it edition 1 of 50, 10 of 50, etc..
    /// @param _id TokenId of the edition
    function editionGetIndexFromId(uint256 _id)
        public
        pure
        CheckEditionIdBoundries(_id)
        returns (uint256)
    {
        /// @dev Take the reminder and then add 1 to convert from 0-based to 1-based counting
        return (_id % editionsPerOriginal) + 1;
    }

    /// @notice Gets the number of available editions per original
    /// @dev Define this as a function since we need to expose it over the interface for external contract calls.
    function getMaxEditionsPerOriginal() public pure returns (uint256) {
        return editionsPerOriginal;
    }

    /// @notice Gets the total supply of the originals
    /// @dev Define this as a function since we need to expose it over the interface for external contract calls.
    function getOrigialTotalSupply() public pure returns (uint256) {
        return originalsSupply;
    }

    /// @notice Gets the total supply of all originals + editions
    /// @dev Define this as a function since we need to expose it over the interface for external contract calls.
    function getTotalSupply() public pure returns (uint256) {
        return totalSupply;
    }

    /// @notice Mint an edition of an original
    /// @dev This will revert if trying to revert more than 50 of an edition. This check is inside of CheckSubConsciousness, which is checked in the call to editionGetNextId. Not checking here as to not duplicate work
    /// @param _originalId TokenId of the original 1-of-1 NFT
    function alterSubReality(uint256 _originalId)
        external
        payable
        CheckConsciousness(_originalId)
        ElevatingConsciousnessHasACost(editionsMintPrice)
    {
        uint256 editionId = editionGetNextId(_originalId);

        ++editionsMinted[_originalId];

        _safeMint(msg.sender, editionId, "Welcome to TheHydra's Reality");
    }

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
    function withdrawPayments(address payable payee) external onlyOwner {
        uint256 balance = address(this).balance;
        (bool transferTx, ) = payee.call{value: balance}("");
        if (!transferTx) {
            revert PayeeNotInDreamState();
        }
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
