const Web3 = require('web3');
const ABIPolygon = require('./ContractPolygon.json');
const solidity = require('./typeSolidity');
const ethers = require('ethers');

const getMessageHash = (arrayType = [], arrayData = []) => {
  return ethers.utils.solidityKeccak256(arrayType, arrayData);
};

const _ = {
  RPC_POLYGON: 'https://rpc-mumbai.maticvigil.com',
  CONTRACT_ADDRESS_POLYGON: '0xE247a62298fdFf6F89a688a15aD9F108Ae3EeBD5',
  buyerAddress: '0x83eF7DEA9c0eD0CadE9Aed85702540CF5254c095',
  tokenId: '10022',
  metadata: '12321321321312321321',
  addressAdmin: '0x4001aB01ebf313c90b92f0cd7e7A1371db6ff5Fa',
  privateAddressAdmin: '997183d0aa6b358a4a9db62495dc38d68cce60a9c1601af56b8a75fd5e3915bd',
  tokenIds: [18, 19, 20],
  tokenIdExist: 11,
  addressBuyerList: [
    '0x83eF7DEA9c0eD0CadE9Aed85702540CF5254c095',
    '0x0b7ccB468fc4422a2F32a481cA88793023a6Ed92',
    '0x83eF7DEA9c0eD0CadE9Aed85702540CF5254c095',
  ],
};

const web3Polygon = new Web3(_.RPC_POLYGON);

const nftContract = new web3Polygon.eth.Contract(ABIPolygon, _.CONTRACT_ADDRESS_POLYGON);

const mint = async messageHash => {
  try {
    console.log('===========> START signature: ');
    const signature = web3Polygon.eth.accounts.sign(messageHash, _.privateAddressAdmin).signature;
    console.log('encodedABI =====> ', signature);
    console.log('******StartMintNFT******');
    const encodedABI = await nftContract.methods.giveAway(signature, _.buyerAddress, _.tokenId, _.metadata).encodeABI();
    console.log('encodedABI =====> ', encodedABI);
    const gasPrice = await web3Polygon.eth.getGasPrice();
    console.log('gasPrice =====> ', gasPrice);
    const gas = await nftContract.methods.mint(signature, _.buyerAddress, _.tokenId, _.metadata).estimateGas({ from: _.addressAdmin });
    console.log('gas =====> ', gas);

    const tx = {
      from: _.addressAdmin,
      to: _.CONTRACT_ADDRESS_POLYGON,
      gas,
      gasPrice,
      data: encodedABI,
      nonce: web3Polygon.eth.getTransactionCount(_.addressAdmin),
    };

    const signedTx = await web3Polygon.eth.accounts.signTransaction(tx, _.privateAddressAdmin);
    const receipt = await web3Polygon.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log('receipt =====> ', receipt);
    console.log('******EndMintNFT******');
    return receipt.transactionHash;
  } catch (error) {
    console.log(`Mint NFT ERROR: `, error);
  }
};

const giveAway = async () => {
  try {
    // const messageHash = getMessageHash([solidity.addressArray, solidity.unit256Array], [_.addressBuyerList, _.tokenIds]);
    // console.log('===========> START signature with message hash: ', messageHash);
    // const signature = web3Polygon.eth.accounts.sign(messageHash, _.privateAddressAdmin).signature;
    // console.log('encodedABI =====> ', signature);
    console.log('******StartMintNFT******');
    const encodedABI = await nftContract.methods.giveAway(_.addressBuyerList, _.tokenIds).encodeABI();
    console.log('encodedABI =====> ', encodedABI);
    const gasPrice = await web3Polygon.eth.getGasPrice();
    console.log('gasPrice =====> ', gasPrice);
    const gas = await nftContract.methods.giveAway(_.addressBuyerList, _.tokenIds).estimateGas({ from: _.addressAdmin });
    console.log('gas =====> ', gas);

    const tx = {
      from: _.addressAdmin,
      to: _.CONTRACT_ADDRESS_POLYGON,
      gas,
      gasPrice,
      data: encodedABI,
      nonce: web3Polygon.eth.getTransactionCount(_.addressAdmin),
    };

    const signedTx = await web3Polygon.eth.accounts.signTransaction(tx, _.privateAddressAdmin);
    const receipt = await web3Polygon.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log('receipt =====> ', receipt);
    console.log('******EndMintNFT******');
    return receipt.transactionHash;
  } catch (error) {
    console.log(`Mint NFT ERROR: `, error?.message);
  }
};

const ownerOf = async () => {
  console.log('******Owner Of******');
  const ownerOf = await nftContract.methods.ownerOf(_.tokenIdExist).call();
  console.log('ownerOf =====> ', ownerOf);
};

// mint('0xc33e03b764070a69fd7a997f4570bcff313453538fcb81cc00ee99c966f2bdba');
// giveAway('0xc33e03b764070a69fd7a997f4570bcff313453538fcb81cc00ee99c966f2bdba');
ownerOf();
