source .env.local

if [ -z "$CHAIN_NAME" ]; then
  echo "CHAIN_NAME is not set"
  exit 1
fi

forge script script/WriteStorage.s.sol:WriteStorage --ffi --chain-id $CHAIN_ID \
    --rpc-url $RPC_URL \
    --private-key $DEPLOYER_PRIVATE_KEY \
    --json \
    --broadcast \