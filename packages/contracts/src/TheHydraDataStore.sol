// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./ITheHydraDataStore.sol";
import "solmate/auth/Owned.sol";
import "solmate/utils/SSTORE2.sol";

contract TheHydraDataStore is ITheHydraDataStore, Owned {

    // --------------------------------------------------------
    // ~~ Internal storage  ~~
    // --------------------------------------------------------

    /// @dev Uri for off chain storage.. i.e. an IPFS link
    string private offChainBaseURI;
    
    /// @dev Byte size of each on-chain photo
    uint256 private constant photoDataByteSize = 4360;

    /// @dev Maps each photo to its on-chain storage address
    mapping(uint256 => address) private onChainStorage;

    // --------------------------------------------------------
    // ~~ Errors ~~
    // --------------------------------------------------------

    error BeyondTheScopeOfConsciousness();
    error InvalidMemorySequence();

    // --------------------------------------------------------
    // ~~ Constructor Logic ~~
    // --------------------------------------------------------

    /// @param _owner The owner of the contract, when deployed
    /// @param _offChainBaseURI The base url for any assets in this collection, i.e. an IPFS link
    constructor(
        address _owner,
        string memory _offChainBaseURI
    ) Owned(_owner) {
        offChainBaseURI = _offChainBaseURI;
    }

    // --------------------------------------------------------
    // ~~ Off Chain Storage I.E BaseURI logic ~~
    // --------------------------------------------------------

    /// @notice Admin function to set the baseURI for off-chain photos, i.e. an IPFS link
    /// @param _baseURI The new baseURI to set
    function setOffChainBaseURI(
        string memory _baseURI
    ) external onlyOwner {
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

    /// @notice Admin function to store the on-chain data for a particular photo
    /// @dev Uses SSTORE2 to store bytes data as a stand-alone contract
    /// @param photoId The id of the photo -- TODO: This may have to change!
    /// @param data The raw data in the .xqst formar
    function storePhotoData(
        uint32 photoId,
        bytes calldata data
    ) external onlyOwner {

        /// @dev Currently storing 1 photo per storage contract -- this can be optimized to chunk more data into each storage contract!
        if (data.length != photoDataByteSize) revert InvalidMemorySequence();

        onChainStorage[photoId] = SSTORE2.write(data);
    }

    /// @notice Gets the data for a photo in .xqst format
    /// @dev Our renderer contract will uses this when generating the metadata
    /// @param photoId The id of the photo -- TODO: This may have to change!
    function getPhotoData(
        uint32 photoId
    ) external view returns (
        bytes memory
    )
    {
        return SSTORE2.read(onChainStorage[photoId]);
    }
}