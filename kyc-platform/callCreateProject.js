const Web3 = require("web3");
const ABIJson = require("./contracts/KYCPlatform.json");

const web3 = new Web3("ws://localhost:8545");

const _ = {
  contractAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  publicKey: "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
  privateKey:
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
  projectId: "du@dev_projectId18",
};

const KYCContract = new web3.eth.Contract(ABIJson.abi, _.contractAddress);

const getMessageHash = async () => {
  const hash = await KYCContract.methods
    .getCreateProjectMessageHash(_.projectId, _.publicKey)
    .call();
  return hash;
};

const createProject = async () => {
  try {
    const hash = await getMessageHash();
    console.log("===========> START signature: ");
    const signature = web3.eth.accounts.sign(hash, _.privateKey).signature;
    console.log("encodedABI =====> ", signature);
    console.log("******StartMintNFT******");
    const encodedABI = await KYCContract.methods
      .createProject(_.projectId, signature)
      .encodeABI();
    console.log("encodedABI =====> ", encodedABI);
    const gasPrice = await web3.eth.getGasPrice();
    console.log("gasPrice =====> ", gasPrice);
    const gas = await KYCContract.methods
      .createProject(_.projectId, signature)
      .estimateGas({ from: _.publicKey });
    console.log("gas =====> ", gas);

    const tx = {
      from: _.publicKey,
      to: _.contractAddress,
      gas,
      gasPrice,
      data: encodedABI,
      nonce: web3.eth.getTransactionCount(_.publicKey),
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, _.privateKey);
    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );
    console.log("receipt =====> ", receipt);
    console.log("******EndMintNFT******");
    return receipt.transactionHash;
  } catch (error) {
    console.log(`Mint NFT ERROR: `, error);
  }
};

createProject();
