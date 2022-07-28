// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

/// @author therightchoyce.eth
/// @title  Composable interface for TheHydra contract
/// @notice Allows other contracts to easily call methods exposed in this
///         interface.. IE a Renderer contract will be able to interact
///         with TheHydra's ERC721 functions
interface ITheHydra {
    function getMaxEditionsPerOriginal() external pure returns (uint256);

    function getOrigialTotalSupply() external pure returns (uint256);

    function getTotalSupply() external pure returns (uint256);

    function editionGetOriginalId(uint256 _id) external pure returns (uint256);

    function editionGetStartId(uint256 _originalId)
        external
        pure
        returns (uint256);

    function editionGetNextId(uint256 _originalId)
        external
        view
        returns (uint256);

    function editionGetMintCount(uint256 _originalId)
        external
        view
        returns (uint256);

    function editionGetIndexFromId(uint256 _id) external view returns (uint256);
}
