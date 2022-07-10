// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

/// @author therightchoyce.eth
/// @title  Upgradeable renderer interface
/// @notice This leaves room for us to change how we return token metadata and
///         unlocks future capability like fully on-chain storage.
interface ITheHydraRenderer {

    function tokenURI(uint256 _id) external view returns (string memory);
    function tokenURI(uint256 _id, string calldata _renderType) external view returns (string memory);

    function renderSVG(bytes memory _data) external view returns (bytes memory);
    function renderSVG_AsString(bytes memory _data) external view returns (string memory);

    function getOnChainSVG(uint256 _id) external view returns (string memory);
    function getOnChainSVG_AsBase64(uint256 _id) external view returns (string memory);    
}
