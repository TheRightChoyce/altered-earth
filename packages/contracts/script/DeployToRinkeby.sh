# Run this from the root of the contract dir!!!

source .env.rinkeby

# Manually set the chain IDs here
CHAIN_ID=4
CHAIN_NAME=rinkeby

forge script script/DeployAll.s.sol:DeployAll -vvvv --ffi --chain-id $CHAIN_ID \
  --rpc-url $RPC_URL \
  --private-key $DEPLOYER_PRIVATE_KEY \
  --verify --etherscan-api-key $ETHERSCAN_API_KEY \
  --broadcast

# 0 => Datastore
CONTRACT_NAME="TheHydraDataStore"
DEPLOY_OUTPUT="deploys/$CHAIN_NAME/$CONTRACT_NAME.json"
mkdir -p $(dirname $DEPLOY_OUTPUT)

jq '{deployedTo: .transactions[0].contractAddress, deployer: .transactions[0].tx.from, transactionHash: .transactions[0].hash}' ./broadcast/DeployAll.s.sol/$CHAIN_ID/run-latest.json > "$DEPLOY_OUTPUT"

# 1 => Renderer
CONTRACT_NAME="TheHydraRenderer"
DEPLOY_OUTPUT="deploys/$CHAIN_NAME/$CONTRACT_NAME.json"
mkdir -p $(dirname $DEPLOY_OUTPUT)


jq '{deployedTo: .transactions[1].contractAddress, deployer: .transactions[1].tx.from, transactionHash: .transactions[1].hash}' ./broadcast/DeployAll.s.sol/$CHAIN_ID/run-latest.json > "$DEPLOY_OUTPUT"

# 2 => TheHydra
CONTRACT_NAME="TheHydra"
DEPLOY_OUTPUT="deploys/$CHAIN_NAME/$CONTRACT_NAME.json"
mkdir -p $(dirname $DEPLOY_OUTPUT)

jq '{deployedTo: .transactions[2].contractAddress, deployer: .transactions[2].tx.from, transactionHash: .transactions[2].hash}' ./broadcast/DeployAll.s.sol/$CHAIN_ID/run-latest.json > "$DEPLOY_OUTPUT"