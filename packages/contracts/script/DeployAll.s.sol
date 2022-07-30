// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import {ConfiguredDeployment} from "./ConfiguredDeployment.s.sol";
import {TheHydra} from "../src/TheHydra.sol";
import {TheHydraDataStore} from "../src/TheHydraDataStore.sol";
import {TheHydraRenderer} from "../src/TheHydraRenderer.sol";

// Run this using the deploy-contracts.sh file in the project root!

contract DeployAll is Script, ConfiguredDeployment {
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
            string memory baseUri_,
            address xsqtgfx_
        ) = deployment.currentNetworkConfiguration();

        // Deploy the dataStore -- does not have any dependencies
        TheHydraDataStore dataStore = new TheHydraDataStore(owner_, baseUri_);

        // Deploy the render -- depends on dataStore
        TheHydraRenderer renderer = new TheHydraRenderer(
            owner_,
            address(dataStore),
            xsqtgfx_
        );

        // Deploy the base contract -- needs the render address
        TheHydra theHydra = new TheHydra(
            owner_,
            mintPriceOriginal_,
            mintPriceEdition_
        );

        // Update token contract to point to the renderer
        theHydra.setRenderer(renderer);

        vm.stopBroadcast();

        console.log("Deployed contract to:", address(theHydra));
        console.log("Deployed data store to:", address(dataStore));
        console.log("Deployed renderer to:", address(renderer));

        console.log("TheHydra renderer =>", address(theHydra.renderer()));
    }
}
