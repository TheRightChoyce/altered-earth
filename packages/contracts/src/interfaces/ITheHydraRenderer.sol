// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

/// @author therightchoyce.eth
/// @title  Upgradeable renderer interface
/// @notice This leaves room for us to change how we return token metadata and
///         unlocks future capability like fully on-chain storage.
interface ITheHydraRenderer {

    function tokenURI(uint256 _id) external view returns (string memory);
    function tokenURI(uint256 _id, string calldata _renderType) external view returns (string memory);

    function renderSVG(bytes memory _data) external view returns (bytes memory);
    function renderSVG_ToString(bytes memory _data) external view returns (string memory);
}
