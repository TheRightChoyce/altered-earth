// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./interfaces/ITheHydraDataStore.sol";
import "solmate/auth/Owned.sol";
import "solmate/utils/SSTORE2.sol";

/// @title TheHydra is the genesis collection of the Altered Earth NFT series.
/// @author therightchoyce.eth
/// @notice This contract acts as an on-chain data store for various pieces of the artwork
/// @dev Uses SSTORE2 to get/set raw data on-chain
contract TheHydraDataStore is ITheHydraDataStore, Owned {
    // --------------------------------------------------------
    // ~~ Internal storage  ~~
    // --------------------------------------------------------

    /// @dev Uri for off chain storage.. i.e. an IPFS link -- This is private since we need to expose the function in the interface in order to allow for cross-contract interaction
    string private offChainBaseURI;

    /// @dev Byte size of each on-chain photo
    uint256 private constant photoDataByteSizeMin = 5124;
    uint256 private constant photoDataByteSizeMax = 5128;

    /// @dev Maps each photo to its on-chain storage address
    mapping(uint256 => address) private onChainStorage;

    // --------------------------------------------------------
    // ~~ Errors ~~
    // --------------------------------------------------------

    error InvalidMemorySequence();

    // --------------------------------------------------------
    // ~~ Constructor Logic ~~
    // --------------------------------------------------------

    /// @param _owner The owner of the contract, when deployed
    /// @param _offChainBaseURI The base url for any assets in this collection, i.e. an IPFS link
    constructor(address _owner, string memory _offChainBaseURI) Owned(_owner) {
        offChainBaseURI = _offChainBaseURI;
    }

    // --------------------------------------------------------
    // ~~ Off Chain Storage I.E BaseURI logic ~~
    // --------------------------------------------------------

    /// @notice Admin function to set the baseURI for off-chain photos, i.e. an IPFS link
    /// @param _baseURI The new baseURI to set
    function setOffChainBaseURI(string memory _baseURI) external onlyOwner {
        offChainBaseURI = _baseURI;
    }

    /// @notice Retrieve the currently set offChainBaseURI
    /// @dev Used by the metadata contract to construct the tokenURI
    function getOffChainBaseURI() external view returns (string memory) {
        return offChainBaseURI;
    }

    // --------------------------------------------------------
    // ~~ On Chain Storage ~~
    // --------------------------------------------------------

    /// @notice Admin function to store the on-chain data for TheHydra
    /// @dev Uses SSTORE2 to store bytes data as a stand-alone contract
    /// @param _originalId The originalId of the photo, not the editionId. You can use the TheHydra.getOriginalId() to get the originalId of any edition
    /// @param _data The raw data in the .xqst format
    function storeData(uint256 _originalId, bytes calldata _data)
        external
        onlyOwner
    {
        /// @dev Currently storing 1 photo per storage contract -- this can be optimized to chunk more data into each storage contract!
        if (
            _data.length < photoDataByteSizeMin ||
            _data.length > photoDataByteSizeMax
        ) revert InvalidMemorySequence();

        onChainStorage[_originalId] = SSTORE2.write(_data);
    }

    /// @notice Gets the data in .xqst format
    /// @dev Our renderer contract will uses this when generating the metadata
    /// @param _originalId The originalId of the photo, not the editionId. You can use the TheHydra.getOriginalId() to get the originalId of any edition
    function getData(uint256 _originalId) external view returns (bytes memory) {
        return SSTORE2.read(onChainStorage[_originalId]);
    }
}
