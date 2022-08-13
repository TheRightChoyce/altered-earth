// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import {ConfiguredDeployment} from "./ConfiguredDeployment.s.sol";
import {TheHydraDataStore} from "../src/TheHydraDataStore.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract WriteStorage is Script, ConfiguredDeployment {
    using Strings for uint256;
    TheHydraDataStore dataStore;

    /// @dev Easily allow for some chain-specific deployments
    ConfiguredDeployment deployment;

    function setUp() external {
        deployment = new ConfiguredDeployment();
    }

    function run() public {
        vm.startBroadcast();

        /// @dev Deconstruct the config params
        (, , , , , address dataStore_, , ) = deployment
            .currentNetworkConfiguration();

        dataStore = TheHydraDataStore(dataStore_);

        for (uint256 i; i < 5; ) {
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
