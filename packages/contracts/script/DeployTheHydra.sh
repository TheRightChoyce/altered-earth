# Expects jq to be installed

# Run this from the root of the contract dir!!!
# If the verification fails, run this script again and remove the "broadcast" flag

source .env.local

if [ -z "$CHAIN_ID" ]; then
  echo "CHAIN_ID is not set"
  exit 1
fi

CONTRACT_NAME="TheHydra"
DEPLOY_OUTPUT="deploys/$CHAIN_NAME/$CONTRACT_NAME.json"
SCRIPT_NAME="DeployTheHydra"

forge script script/$SCRIPT_NAME.s.sol:$SCRIPT_NAME -vvvv --ffi \
    --chain-id $CHAIN_ID \
    --rpc-url $RPC_URL \
    --private-key $DEPLOYER_PRIVATE_KEY \
    --verify --etherscan-api-key $ETHERSCAN_API_KEY
    # --broadcast \
    

jq '{deployedTo: .transactions[0].contractAddress, deployer: .transactions[0].tx.from, transactionHash: .transactions[0].hash}' ./broadcast/$SCRIPT_NAME.s.sol/$CHAIN_ID/run-latest.json > $DEPLOY_OUTPUT
