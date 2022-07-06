# Expects jq to be installed

source .env
source .env.local

if [ -z "$CHAIN_NAME" ]; then
  echo "CHAIN_NAME is not set"
  exit 1
fi

CONTRACT_NAME="TheHydra"

DEPLOY_OUTPUT="deploys/$CHAIN_NAME/$CONTRACT_NAME.json"
mkdir -p $(dirname $DEPLOY_OUTPUT)

if [ ! -f $DEPLOY_OUTPUT ] || [ ! -s $DEPLOY_OUTPUT ]; then
  echo "Deploying contract to $CHAIN_NAME..."
  forge create $CONTRACT_NAME --json \
    --constructor-args "0xDF59D762455FA847DD94504F793543bA66Ec0Df9" "ipfs:\\" "0.001 ether" \
    --rpc-url=$RPC_URL \
    --private-key=$DEPLOYER_PRIVATE_KEY | jq . > $DEPLOY_OUTPUT
fi

CONTRACT_ADDRESS=$(cat $DEPLOY_OUTPUT | jq -r ".deployedTo")
if [ -z $CONTRACT_ADDRESS ]; then
  echo "No contract address found in $DEPLOY_OUTPUT"
  exit 1
fi

echo "Using $CHAIN_NAME contract address: $CONTRACT_ADDRESS"
echo "https://$CHAIN_NAME.etherscan.io/address/$CONTRACT_ADDRESS"

# cast send --rpc-url=$RPC_URL $CONTRACT_ADDRESS "setBaseTokenURI(string)" "ipfs://somehashgoeshere" --private-key=$DEPLOYER_PRIVATE_KEY
