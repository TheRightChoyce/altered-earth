// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import {Solenv} from "solenv/Solenv.sol";

contract ConfiguredDeployment is Script {
    /// @dev All the configuration values you need
    struct DeploymentConfig {
        address owner;
        uint256 mintPriceOriginal;
        uint256 mintPriceEdition;
        string baseUri;
        address xsqtgfx;
    }

    /// @dev Map each chain to its own config
    mapping(uint256 => DeploymentConfig) public chainConfig;

    /// @dev The current configuration we should be using
    DeploymentConfig public currentNetworkConfiguration;

    constructor() {
        chainConfig[4] = rinkebyConfiguration();
        chainConfig[5] = goerliConfiguration();
        chainConfig[31337] = anvilConfiguration();

        currentNetworkConfiguration = chainConfig[block.chainid];
    }

    function getDefaultConfigFromEnv()
        internal
        returns (DeploymentConfig memory defaulConfig)
    {
        return
            DeploymentConfig(
                vm.envAddress("OWNER"),
                vm.envUint("MINT_PRICE_ORIGINAL"),
                vm.envUint("MINT_PRICE_EDITION"),
                vm.envString("BASE_URI"),
                address(0xDf01A4040493B514605392620B3a0a05Eb8Cd295)
            );
    }

    function rinkebyConfiguration()
        internal
        returns (DeploymentConfig memory rinkebyConfig)
    {
        Solenv.config("./packages/contracts/.env.rinkeby");
        return getDefaultConfigFromEnv();
    }

    function goerliConfiguration()
        internal
        returns (DeploymentConfig memory goerliConfig)
    {
        Solenv.config("./packages/contracts/.env.goerli");
        return getDefaultConfigFromEnv();
    }

    function anvilConfiguration()
        internal
        returns (DeploymentConfig memory anvilConfig)
    {
        Solenv.config("./packages/contracts/.env.local");
        return getDefaultConfigFromEnv();
    }
}
