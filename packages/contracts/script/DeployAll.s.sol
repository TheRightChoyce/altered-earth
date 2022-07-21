// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import {Solenv} from "solenv/Solenv.sol";
import {TheHydra} from "../src/TheHydra.sol";
import {TheHydraDataStore} from "../src/TheHydraDataStore.sol";
import {TheHydraRenderer} from "../src/TheHydraRenderer.sol";

// Run this using the deploy-contracts.sh file in the project root!

contract DeployAll is Script {
    
    // Deployable contracts
    TheHydra public theHydra;
    TheHydraDataStore public dataStore;
    TheHydraRenderer public renderer;

    function setUp() external {
        Solenv.config("./packages/contracts/.env.local");
    }

    function deployTokenContract() public {
        // Deploy the base contract 
        theHydra = new TheHydra(
            vm.envAddress("OWNER"),
            vm.envUint("MINT_PRICE_ORIGINAL"),
            vm.envUint("MINT_PRICE_EDITION")
        );
    }

    function deployDataStoreContract() public {
        dataStore = new TheHydraDataStore(
            vm.envAddress("OWNER"),
            vm.envString("BASE_URI")
        );
    }

    function deployRendererContract() public {
        renderer = new TheHydraRenderer(
            vm.envAddress("OWNER"),
            address(theHydra),
            address(dataStore),
            0xDf01A4040493B514605392620B3a0a05Eb8Cd295
        );
    }

    function run() public {
        
        vm.startBroadcast();

        deployDataStoreContract();
        deployTokenContract();
        deployRendererContract();

        // Update token contract to point to the renderer
        theHydra.setRenderer(renderer);

        vm.stopBroadcast();

        console.log("Deployed contract to:", address(theHydra));
        console.log("Deployed data store to:", address(dataStore));
        console.log("Deployed renderer to:", address(renderer));

        console.log("TheHydra renderer =>", address(theHydra.renderer()));
    }
}


// forge verify-contract --chain-id 5 --num-of-optimizations 200 --constructor-args $(cast abi-encode "constructor(string,string)" "0xDF59D762455FA847DD94504F793543bA66Ec0Df9" "ipfs://bafybeias2gt6y6rhgh27kcaa6bqjithiasn6ozk7zcmoehrjit2gv2zwcm") 0x0cA3aBdf078656C0F5aAdd1f1DE84a430e87F0B2 packages/contracts/src/TheHydraDataStore.sol:TheHydraDataStore 316WCP36SDH827ZUFQG13N4MB2VNBZEDZU