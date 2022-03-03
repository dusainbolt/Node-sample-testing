const Web3 = require("web3");
const RewardPoolJson = require("./contracts/RewardPool.json");

const web3 = new Web3("ws://localhost:8545");

const _ = {
  // rewardPoolAddress: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
  publicKey: "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
  privateKey:
    "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
  encodeABI:
    "0x76618f2700000000000000000000000000000000000000000000000000000000000f4240000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000041058bc66f0fa29c199e00597918819506e5929780d7b247bc530cd55ed13c219c31fb5c94fe0cd75abe4af1bf194d3e74387c1474bb7ddd72837345df215ba4f71b00000000000000000000000000000000000000000000000000000000000000",
};

const RewardPool = new web3.eth.Contract(
  RewardPoolJson.abi,
  RewardPoolJson.address
);

const createProject = async () => {
  try {

    console.log("owner: ", await RewardPool.methods.owner().call());

    // get gas price
    const gasPrice = await web3.eth.getGasPrice();
    // estimate gas
    const signature = "0x058bc66f0fa29c199e00597918819506e5929780d7b247bc530cd55ed13c219c31fb5c94fe0cd75abe4af1bf194d3e74387c1474bb7ddd72837345df215ba4f71b";
    // const encodedABI = await RewardPool.methods
    //   .claimReward("1000000", "0", signature)
    //   .encodeABI();
    
    // console.log("==> encodeABI: ", encodedABI == _.encodeABI);

    const gas = await RewardPool.methods
      .claimReward("1000000", "0", signature)
      .estimateGas({ from: _.publicKey });

    // create tx transaction
    const tx = {
      from: _.publicKey,
      to: _.contractAddress,
      gas,
      gasPrice,
      data: _.encodeABI,
      nonce: web3.eth.getTransactionCount(_.publicKey),
    };

    // sign transaction and send
    const signedTx = await web3.eth.accounts.signTransaction(tx, _.privateKey);
    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );
    console.log("receipt =====> ", receipt);
    return receipt.transactionHash;
  } catch (error) {
    console.log(`ERROR: `, error);
  }
};

createProject();
