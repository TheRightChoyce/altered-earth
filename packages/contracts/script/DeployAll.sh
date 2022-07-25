# Expects jq to be installed

# Run this from the root of the contract dir!!!
# If the verification fails, run this script again and remove the "broadcast" flag

source .env.local

if [ -z "$CHAIN_ID" ]; then
  echo "CHAIN_ID is not set"
  exit 1
fi

forge script script/DeployAll.s.sol:DeployAll -vvvv --ffi --chain-id $CHAIN_ID \
    --rpc-url $RPC_URL \
    --private-key $DEPLOYER_PRIVATE_KEY \
    --broadcast \
    --verify --etherscan-api-key $ETHERSCAN_API_KEY