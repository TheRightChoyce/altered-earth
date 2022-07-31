// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import {ConfiguredDeployment} from "./ConfiguredDeployment.s.sol";
import {TheHydra} from "../src/TheHydra.sol";
import {TheHydraDataStore} from "../src/TheHydraDataStore.sol";
import {TheHydraRenderer} from "../src/TheHydraRenderer.sol";

// Run this using the shell script from the contracts project root!
// IE package/contracts/

contract DeployTheHydra is Script {
    /// @dev Easily allow for some chain-specific deployments
    ConfiguredDeployment deployment;

    function setUp() external {
        deployment = new ConfiguredDeployment();
    }

    function run() public {
        vm.startBroadcast();

        /// @dev Deconstruct the config params
        (
            address owner_,
            uint256 mintPriceOriginal_,
            uint256 mintPriceEdition_,
            ,
            address xsqtgfx_,
            ,
            address renderer_,

        ) = deployment.currentNetworkConfiguration();

        // Deploy the base contract
        TheHydra theHydra = new TheHydra(
            owner_,
            mintPriceOriginal_,
            mintPriceEdition_
        );

        console.log("Deployed TheHydra to:", address(theHydra));

        // Update token contract to point to the renderer
        if (renderer_ != address(0)) {
            theHydra.setRenderer(TheHydraRenderer(renderer_));
            console.log(
                "TheHydra renderer set to =>",
                address(theHydra.renderer())
            );
        }

        vm.stopBroadcast();
    }
}
