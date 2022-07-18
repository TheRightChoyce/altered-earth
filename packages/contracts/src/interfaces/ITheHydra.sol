// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

/// @author therightchoyce.eth
/// @title  Composable interface for TheHydra contract
/// @notice Allows other contracts to easily call methods exposed in this
///         interface.. IE a Renderer contract will be able to interact
///         with TheHydra's ERC721 functions
interface ITheHydra {
    function getOriginalId(uint256 _id) external pure returns (uint256);
    function getMaxEditionsPerOriginal() external pure returns (uint256);
    function getOrigialTotalSupply() external pure returns (uint256);
    function getTotalSupply() external pure returns (uint256);
}