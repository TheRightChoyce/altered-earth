// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import {ConfiguredDeployment} from "./ConfiguredDeployment.s.sol";
import {TheHydra} from "../src/TheHydra.sol";
import {TheHydraDataStore} from "../src/TheHydraDataStore.sol";
import {TheHydraRenderer} from "../src/TheHydraRenderer.sol";

// Run this using the deploy-contracts.sh file in the project root!

contract DeployTheHydraRenderer is Script, ConfiguredDeployment {
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
            ,
            ,
            ,
            address xsqtgfx_,
            address dataStore_,
            ,
            address theHydra_
        ) = deployment.currentNetworkConfiguration();

        // Deploy the render -- depends on dataStore and we'll use whatever is specificed in the ENV/config
        TheHydraRenderer renderer = new TheHydraRenderer(
            owner_,
            dataStore_,
            xsqtgfx_
        );

        console.log("Deployed renderer to:", address(renderer));

        if (theHydra_ != address(0)) {
            // Update token contract to point to the renderer
            TheHydra theHydra = TheHydra(theHydra_);
            theHydra.setRenderer(renderer);
            console.log("TheHydra renderer =>", address(theHydra.renderer()));
        }

        vm.stopBroadcast();
    }
}
