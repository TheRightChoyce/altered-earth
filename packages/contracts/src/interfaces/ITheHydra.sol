// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

/// @author therightchoyce.eth
/// @title  Composable interface for TheHydra contract
/// @notice Allows other contracts to easily call methods exposed in this
///         interface.. IE a Renderer contract will be able to interact
///         with TheHydra's ERC721 functions
interface ITheHydra {
    /// @dev Helper to return current edition information based on the originals photo Id
    struct EditionInfo {
        uint256 originalId;
        uint256 startId;
        uint256 endId;
        uint256 minted;
        uint256 gifted;
        bool soldOut;
        uint256 nextId;
        uint256 localIndex;
        uint256 maxPerOriginal;
    }

    function editionsGetInfoFromOriginal(uint256 _originalId)
        external
        view
        returns (EditionInfo memory);
}
