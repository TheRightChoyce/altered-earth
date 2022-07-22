// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import {Solenv} from "solenv/Solenv.sol";
import {TheHydra} from "../src/TheHydra.sol";
import {TheHydraDataStore} from "../src/TheHydraDataStore.sol";
import {TheHydraRenderer} from "../src/TheHydraRenderer.sol";

// Run this using the shell script from the contracts project root!
// IE package/contracts/

contract DeployTheHydra is Script {
    
    // Deploy this!
    TheHydra public theHydra;

    // Reference the existing renderer contract
    TheHydraRenderer public renderer;

    function setUp() external {
        Solenv.config("./packages/contracts/.env.local");
        renderer = TheHydraRenderer(vm.envAddress("RENDERER_ADDRESS"));
    }

    function deployTokenContract() public {
        // Deploy the base contract 
        theHydra = new TheHydra(
            vm.envAddress("OWNER"),
            vm.envUint("MINT_PRICE_ORIGINAL"),
            vm.envUint("MINT_PRICE_EDITION")
        );
    }

    function run() public {
        
        vm.startBroadcast();

        deployTokenContract();

        // Update token contract to point to the renderer
        theHydra.setRenderer(renderer);

        vm.stopBroadcast();

        console.log("Deployed TheHydra to:", address(theHydra));
        console.log("TheHydra renderer =>", address(theHydra.renderer()));
    }
}