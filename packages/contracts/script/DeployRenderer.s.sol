// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import {Solenv} from "solenv/Solenv.sol";
import {TheHydra} from "../src/TheHydra.sol";
import {TheHydraDataStore} from "../src/TheHydraDataStore.sol";
import {TheHydraRenderer} from "../src/TheHydraRenderer.sol";

// Run this using the deploy-contracts.sh file in the project root!

contract DeployRenderer is Script {
    
    // Deployable contracts
    TheHydra public theHydra = TheHydra(0xC539Bf189EEe89056d734834C0c64faF12Ad3E95);
    TheHydraDataStore public dataStore = TheHydraDataStore(0x898997E4b2A897846730c15dA358990A980CD955);
    TheHydraRenderer public renderer;

    function setUp() external {
        Solenv.config("./packages/contracts/.env.local");
    }

    function deployRendererContract() public {
        renderer = new TheHydraRenderer(
            address(theHydra),
            address(dataStore),
            0xDf01A4040493B514605392620B3a0a05Eb8Cd295
        );
    }

    function run() public {
        
        vm.startBroadcast();

        deployRendererContract();

        // Update token contract to point to the renderer
        theHydra.setRenderer(renderer);

        vm.stopBroadcast();

        console.log("Deployed renderer to:", address(renderer));
        console.log("TheHydra renderer =>", address(theHydra.renderer()));
    }
}