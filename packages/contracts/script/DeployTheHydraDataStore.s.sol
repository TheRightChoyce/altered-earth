// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import {ConfiguredDeployment} from "./ConfiguredDeployment.s.sol";
import {TheHydra} from "../src/TheHydra.sol";
import {TheHydraDataStore} from "../src/TheHydraDataStore.sol";

// Run this using the deploy-contracts.sh file in the project root!

contract DeployTheHydraDataStore is Script, ConfiguredDeployment {
    /// @dev Easily allow for some chain-specific deployments
    ConfiguredDeployment deployment;

    function setUp() external {
        deployment = new ConfiguredDeployment();
    }

    function run() public {
        vm.startBroadcast();

        /// @dev Deconstruct the config params
        (address owner_, , , string memory baseUri_, , , , ) = deployment
            .currentNetworkConfiguration();

        // Deploy the dataStore -- does not have any dependencies
        TheHydraDataStore dataStore = new TheHydraDataStore(owner_, baseUri_);

        console.log("Deployed dataStore to:", address(dataStore));

        vm.stopBroadcast();
    }
}
