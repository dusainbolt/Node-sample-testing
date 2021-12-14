const Web3 = require('web3');
const ABIPolygon = require('./ContractPolygon.json');

const _ = {
  RPC_POLYGON: 'https://rpc-mumbai.maticvigil.com',
  CONTRACT_ADDRESS_POLYGOn: '0xb0BFf6D9F9650E98DBAF115Ad2837b9F2B328893',
  buyerAddress: '0x83eF7DEA9c0eD0CadE9Aed85702540CF5254c095',
  tokenId: '10022',
  metadata: '12321321321312321321',
  addressAdmin: '0x4001aB01ebf313c90b92f0cd7e7A1371db6ff5Fa',
  privateAddressAdmin: '997183d0aa6b358a4a9db62495dc38d68cce60a9c1601af56b8a75fd5e3915bd',
};

const web3Polygon = new Web3(_.RPC_POLYGON);

const mint = async messageHash => {
  try {
    console.log("===========> START signature: ");
    const signature = web3Polygon.eth.accounts.sign(messageHash, _.privateAddressAdmin).signature;
    console.log("encodedABI =====> ", signature);
    console.log('******StartMintNFT******');
    const nftContract = new web3Polygon.eth.Contract(ABIPolygon, _.CONTRACT_ADDRESS_POLYGOn);
    const encodedABI = await nftContract.methods.mint(signature, _.buyerAddress, _.tokenId, _.metadata).encodeABI();
    console.log("encodedABI =====> ", encodedABI);
    const gasPrice = await web3Polygon.eth.getGasPrice();
    console.log("gasPrice =====> ", gasPrice);
    const gas = await nftContract.methods.mint(signature, _.buyerAddress, _.tokenId, _.metadata).estimateGas({ from: _.addressAdmin });
    console.log("gas =====> ", gas);

    const tx = {
      from: _.addressAdmin,
      to: _.CONTRACT_ADDRESS_POLYGOn,
      gas,
      gasPrice,
      data: encodedABI,
      nonce: web3Polygon.eth.getTransactionCount(_.addressAdmin),
    };

    const signedTx = await web3Polygon.eth.accounts.signTransaction(tx, _.privateAddressAdmin);
    const receipt = await web3Polygon.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log("receipt =====> ", receipt);
    console.log('******EndMintNFT******');
    return receipt.transactionHash;
  } catch (error) {
    console.log(`Mint NFT ERROR: `, error);
    // if (flagNonce) this.nonceMONETA--;
  }
};

mint('0xc33e03b764070a69fd7a997f4570bcff313453538fcb81cc00ee99c966f2bdba');
