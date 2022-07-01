// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

// third party includes
import "solmate/tokens/ERC721.sol";
import "solmate/auth/Owned.sol";
import "openzeppelin-contracts/contracts/utils/Strings.sol";

/// @title TheHydra is the genesis collection of the Altered Earth NFT series
/// @author Chris Choyce (therightchoyce.eth)
/// @notice This implemeints the ERC721 standard
/// @dev Modified ERC721 for minting and managing tokens
contract TheHydra is Owned, ERC721 {

    /// @dev Enable toString and other string functions on uint256
    using Strings for uint256;

    // --------------------------------------------------------
    // ~~ Core state variables ~~
    // --------------------------------------------------------
    
    /// @dev Track the total supply available to mint in this collection
    uint256 public totalSupply;
    
    /// @dev Track the max Id available to mint, which may differe from the total supply number if zero-based
    uint256 _maxMintId;

    /// @dev The default mint price for a NFT
    uint256 public mintPrice;

    /// @dev baseURI for any off-chain assets
    string public baseURI;

    // --------------------------------------------------------
    // ~~ Events ~~
    // --------------------------------------------------------

    event RealityAltered(address indexed from, uint256 tokenId);

    // --------------------------------------------------------
    // ~~ Errors ~~
    // --------------------------------------------------------

    error CouldNotAlterReality();
    error BeyondTheScopeOfConsciousness();
    error RealityAlreadyAltered();
    error PayeeNotInDreamState();
    error InvalidDreamState();

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
        if (id > _maxMintId) revert BeyondTheScopeOfConsciousness();
        _;
    }

    modifier RealityNotAlreadyAltered(uint256 id) {
        /// @dev Defer this to the Solmate contract's _mint function to save gas, since it already has an ownership check built in
        _;
    }

    // --------------------------------------------------------
    // ~~ Constructor Logic ~~
    // --------------------------------------------------------

    /// @param _owner The owner of the contract, when deployed
    /// @param _baseURI The base url for any assets in this collection, i.e. an IPFS link
    constructor(

        address _owner,
        string memory _baseURI
    
    ) ERC721('Altered Earth: The Hydra Collection', 'ALTERED') Owned(_owner) {

        baseURI = _baseURI;

        // therightchoyce.eth and 10% -- can be changed later
        _royaltyInfo = RoyaltyInfo(
            address(0x18836acedeF35D4A6C00Aae46a36fAdE12ee5FF7),
            1000 // 1000 / 10_000 => 10%
        );
        // 50 1-of-1s
        totalSupply = 50;
        
        // price, TODO -- change on launch : ) 
        mintPrice = 0.5 ether;

        /// @dev Use this to compare 0-based counters to for slight gas savings
        _maxMintId = 49;
    }

    // --------------------------------------------------------
    // ~~ MetaData ~~
    // --------------------------------------------------------

    /// @notice Standard URI function to get the token metadata
    /// @param id Id of token requested
    function tokenURI(uint256 id) override public view returns (string memory) {

        // By default, this reverts if a token isn't owned
        if (_ownerOf[id] == address(0)) revert BeyondTheScopeOfConsciousness();
        
        return
            bytes(baseURI).length > 0
                ? string(abi.encodePacked(baseURI, id.toString()))
                : "";
    }

    // --------------------------------------------------------
    // ~~ Mint Functions ~~
    // --------------------------------------------------------
    function alterReality(
        uint256 id
    )
        external
        payable
        ElevatingConsciousnessHasACost(mintPrice)
        CheckConsciousness(id)
        RealityNotAlreadyAltered(id)
    {
        _safeMint(msg.sender, id, "Welcome to TheHydra's Reality");
        emit RealityAltered(msg.sender, id);
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
            interfaceId == 0x2a55205a // ERC2981
            || super.supportsInterface(interfaceId);
    }

    // --------------------------------------------------------
    // ~~ ERC2981 Implementation AKA Royalties ~~
    // --------------------------------------------------------

    /// @dev Store info about token royalties
    struct RoyaltyInfo {
        address receiver;
        uint24 amount;
    }
    RoyaltyInfo private _royaltyInfo;

    /// @notice EIP-2981 royalty standard for on-chain royalties
    function royaltyInfo(uint256, uint256 salePrice)
        external
        view
        returns (address receiver, uint256 royaltyAmount)
    {
        receiver = _royaltyInfo.receiver;
        royaltyAmount = (salePrice * _royaltyInfo.amount) / 10_000;
    }
    
    /// @notice Update royalty information
    /// @param receiver The receiver of royalty payments
    /// @param amount The royalty percentage with two decimals (10000 = 100)
    function setRoyaltyInfo(
        address receiver,
        uint256 amount
    )
        external
        onlyOwner
    {
        _royaltyInfo = RoyaltyInfo(receiver, uint24(amount));
    }
    

    // Upload

    // On-chain preview

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
    // ~~ Proxy i.e. Gas-less listings on exchanges or      ~~
    // ~~ allowing future AltredEarth contracts to manage   ~~
    // ~~ this contract with the need for user approval     ~~
    // --------------------------------------------------------

    // TODO -- Solmate doesn't use a function for isApprovedForAll which makes it incredibly difficult to override that functionality
}