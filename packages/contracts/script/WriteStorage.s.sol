// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import {Solenv} from "solenv/Solenv.sol";
import {TheHydraDataStore} from "../src/TheHydraDataStore.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract WriteStorage is Script {
    using Strings for uint256;
    TheHydraDataStore dataStore;

    function setUp() public {
        Solenv.config("packages/contracts/.env.local");
        dataStore = TheHydraDataStore(vm.envAddress("DATASTORE_ADDRESS"));
    }

    function run() public {
        vm.startBroadcast();

        for (uint256 i; i < 2; ) {
            string[] memory inputs = new string[](3);
            inputs[0] = "sh";
            inputs[1] = "-c";
            inputs[2] = string(
                bytes.concat(
                    'cast abi-encode "response(bytes)" $(cat packages/contracts/data/xqstgfx/',
                    bytes(i.toString()),
                    ".txt)"
                )
            );

            bytes memory res = vm.ffi(inputs);
            bytes memory xqstgfxData = abi.decode(res, (bytes));

            dataStore.storeData(i, xqstgfxData);

            unchecked {
                ++i;
            }
        }

        vm.stopBroadcast();
    }
}
