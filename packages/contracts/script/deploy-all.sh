# Expects jq to be installed

source ../.env.local

if [ -z "$CHAIN_ID" ]; then
  echo "CHAIN_ID is not set"
  exit 1
fi

forge script script/DeployAll.s.sol:DeployAll -vvvv --ffi --chain-id $CHAIN_ID \
    --rpc-url $RPC_URL \
    --private-key $DEPLOYER_PRIVATE_KEY \
    --broadcast \
    --verify --etherscan-api-key $ETHERSCAN_API_KEY