// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

/// @author therightchoyce.eth
/// @title  Upgradeable data store interface for on-chain art storage
/// @notice This leaves room for us to change how we store data
///         unlocks future capability
interface ITheHydraDataStore {
    function setOffChainBaseURI(string memory _baseURI) external;
    function getOffChainBaseURI() external view returns (string memory);

    function storeData(uint256 _originalId, bytes calldata _data) external;
    function getData(uint256 _originalId) external view returns (bytes memory);
}