// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

// third party includes
import "solmate/tokens/ERC721.sol";
import "solmate/auth/Owned.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

// local includes
import "./interfaces/ITheHydra.sol";
import "./interfaces/ITheHydraRenderer.sol";

// TODO -- remove!!
import "forge-std/console.sol";

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

    /// @dev This is the maximium Id available for the originals.. I.E with 50 available and starting from 0, the maxOriginalId should be 49
    uint256 immutable maxOriginalId = 49;

    /// @dev The maximum available editions per original.
    uint256 immutable editionsPerOriginal = 50;

    /// @dev Track the total supply available to mint in this collection, this includes all originals + editions => originals + (originals * editionsPer)
    uint256 immutable public totalSupply = 2550; 

    /// @dev Easily track the number of editions minted for each original contract
    mapping (uint256 => uint256) editionMintCount;
    
    /// @dev The default mint price for a 1-of-1 original
    uint256 public mintPriceOriginal;

    /// @dev The default mint price for an on-chain edition
    uint256 public mintPriceEdition;

    /// @dev baseURI for any off-chain assets
    string public baseURI;

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
    /// @param id The token id to check
    modifier CheckConsciousness(uint256 id) {
        // currently allowing zero-based ids
        if (id > maxOriginalId) revert BeyondTheScopeOfConsciousness();
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
    /// @param _baseURI The base url for any assets in this collection, i.e. an IPFS link
    /// @param _mintPriceOriginal The mint price for a single NFT, in ether
    /// @param _mintPriceEdition The mint price for an on-chain edition, in either
    constructor(

        address _owner,
        string memory _baseURI,
        uint256 _mintPriceOriginal,
        uint256 _mintPriceEdition
    
    ) ERC721('Altered Earth: The Hydra Collection', 'ALTERED') Owned(_owner) {

        baseURI = _baseURI;

        // therightchoyce.eth and 10% -- can be changed later
        royalties = Royalties(
            address(0x18836acedeF35D4A6C00Aae46a36fAdE12ee5FF7),
            1000 // 1000 / 10_000 => 10%
        );

        // Setup initial mint prices
        mintPriceOriginal = _mintPriceOriginal;
        mintPriceEdition = _mintPriceEdition;

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
    function tokenURI(uint256 id) override public view returns (string memory) {

        /// @dev Ensure this id is in a dream state
        if (_ownerOf[id] == address(0)) revert BeyondTheScopeOfConsciousness();

        /// @dev Ensure a rendering contract is set
        if(address(renderer) == address(0)) revert ConsciousnessNotActivated();
        
        return renderer.tokenURI(id);
    }

    // --------------------------------------------------------
    // ~~ Mint Functions => Originals ~~
    // --------------------------------------------------------
    function alterReality(
        uint256 id
    )
        external
        payable
        ElevatingConsciousnessHasACost(mintPriceOriginal)
        CheckConsciousness(id)
        RealityNotAlreadyAltered(id)
    {
        _safeMint(msg.sender, id, "Welcome to TheHydra's Reality");
        emit RealityAltered(msg.sender, id);
    }

    // --------------------------------------------------------
    // ~~ Mint Functions => Editions ~~
    // --------------------------------------------------------
    
    /// @notice Gets the starting index for the editions based off an original
    /// @param _originalId TokenId of the original 1-of-1 NFT
    function getEditionStartId(
        uint256 _originalId
    ) 
        public
        pure
        CheckConsciousness(_originalId)
        returns (uint256)
    {
        /// @dev (originalId * editionsPerOriginal) + numOriginals
        return (_originalId * 50) + 50;
    }
    /// @notice Gets the next sequental id available to mint for a particular edition
    /// @param _originalId TokenId of the original 1-of-1 NFT
    function getNextEditionId(
        uint256 _originalId
    )
        public
        view
        CheckConsciousness(_originalId)
        returns (uint256)
    {
        /// @dev same as getEditionStartId + add the counter
        return (_originalId * 50) + 50 + editionMintCount[_originalId];
    }

    /// @notice Mint an edition of an original
    /// @dev _id TokenId of the original 1-of-1 NFT
    function alterSubReality(
        uint256 _originalId
    )
        external
        payable
        CheckConsciousness(_originalId)
        ElevatingConsciousnessHasACost(mintPriceEdition)
    {
        uint256 editionId = getNextEditionId(_originalId);
        ++editionMintCount[_originalId];
        _safeMint(msg.sender, editionId, "Welcome to TheHydra's Reality");
        emit RealityAltered(msg.sender, editionId);
    }

    // /// @notice mint either a original or on-chain edition
    // /// @param _id The id of the original token, even if this is an edition mint
    // /// @param _type Either "original" or "edition". If original, attempt to mint token #`_id` -- if edition, attempt to mint the next available edition for that original Id
    // function alterReality(
    //     uint256 _id,
    //     string calldata _type
    // )
    //     external
    //     payable
    //     ElevatingConsciousnessHasACost(mintPriceOriginal)
    //     CheckConsciousness(_id)
    //     RealityNotAlreadyAltered(_id)
    // {
    //     _safeMint(msg.sender, id, "Welcome to TheHydra's Reality");
    //     emit RealityAltered(msg.sender, id);
    // }

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
            interfaceId == 0x2a55205a // ERC2981
            || super.supportsInterface(interfaceId);
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
    function setRoyaltyInfo(
        address _receiver,
        uint256 _amount
    )
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
    function ownerOfOrNull(uint256 id) public view returns (address owner)
    {
        return _ownerOf[id];
    }


    // --------------------------------------------------------
    // ~~ Proxy i.e. Gas-less listings on exchanges or      ~~
    // ~~ allowing future AltredEarth contracts to manage   ~~
    // ~~ this contract with the need for user approval     ~~
    // --------------------------------------------------------

    // TODO -- Solmate doesn't use a function for isApprovedForAll which makes it incredibly difficult to override that functionality
}