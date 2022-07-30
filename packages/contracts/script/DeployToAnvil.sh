# Run this from the root of the contract dir!!!

forge script script/DeployAll.s.sol:DeployAll -vvvv --ffi \
  --rpc-url http://localhost:8545 \
  --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 \
  --broadcast 


CHAIN_ID=31337
CHAIN_NAME=foundry

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