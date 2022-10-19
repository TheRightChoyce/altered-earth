// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

/// @author therightchoyce.eth
/// @title  Composable interface for TheHydra contract
/// @notice Allows other contracts to easily call methods exposed in this
///         interface.. IE a Renderer contract will be able to interact
///         with TheHydra's ERC721 functions
interface ITheHydra {
    /// @dev Helper to return standard edition information based on the original. Note that this is dynamic since the next and minted count will change
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

    // function getOrigialTotalSupply() external pure returns (uint256);

    // function getTotalSupply() external pure returns (uint256);

    // function editionsGetMaxPerOriginal() external pure returns (uint256);

    function editionsGetInfoFromOriginal(uint256 _originalId)
        external
        view
        returns (EditionInfo memory);

    // function editionsGetOriginalId(uint256 _id) external pure returns (uint256);

    // function editionsGetStartId(uint256 _originalId)
    //     external
    //     pure
    //     returns (uint256);

    // function editionsGetNextId(uint256 _originalId)
    //     external
    //     view
    //     returns (uint256);

    // function editionsGetMintCount(uint256 _originalId)
    //     external
    //     view
    //     returns (uint256);

    // function editionsGetIndexFromId(uint256 _id)
    //     external
    //     view
    //     returns (uint256);
}
