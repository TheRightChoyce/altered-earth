// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

/// @author therightchoyce.eth
/// @title  Upgradeable renderer interface
/// @notice This leaves room for us to change how we return token metadata and
///         unlocks future capability like fully on-chain storage.
interface ITheHydraRenderer {

    function tokenURI(uint256 tokenId) external view returns (string memory);
    function tokenURI(uint256 tokenId, string calldata renderType) external view returns (string memory);

    function drawSVGToString(bytes memory data) external view returns (string memory);
    function drawSVGToBytes(bytes memory data) external view returns (bytes memory);
}
