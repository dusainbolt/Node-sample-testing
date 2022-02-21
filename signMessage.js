const Web3 = require("web3");
const ethers = require("ethers");

const getMessageHash = (arrayType = [], arrayData = []) => {
  return ethers.utils.solidityKeccak256(arrayType, arrayData);
};

const _ = {
  RPC_POLYGON: "https://rpc-mumbai.maticvigil.com",
  CONTRACT_ADDRESS_POLYGON: "0xE247a62298fdFf6F89a688a15aD9F108Ae3EeBD5",
  buyerAddress: "0x83eF7DEA9c0eD0CadE9Aed85702540CF5254c095",
  tokenId: "10022",
  metadata: "12321321321312321321",
  addressAdmin: "0x4001aB01ebf313c90b92f0cd7e7A1371db6ff5Fa",
  privateAddressAdmin:
    "997183d0aa6b358a4a9db62495dc38d68cce60a9c1601af56b8a75fd5e3915bd",
  tokenIds: [18, 19, 20],
  tokenIdExist: 11,
  addressBuyerList: [
    "0x83eF7DEA9c0eD0CadE9Aed85702540CF5254c095",
    "0x0b7ccB468fc4422a2F32a481cA88793023a6Ed92",
    "0x83eF7DEA9c0eD0CadE9Aed85702540CF5254c095",
  ],
};

const web3Polygon = new Web3(_.RPC_POLYGON);

// const signMessage = async (messageHash) => {

// }

const messageHash = ethers.utils.solidityKeccak256(
  ["string", "string"],
  ["Metareum Signature", "1645431377"]
);

const signature = web3Polygon.eth.accounts.sign(
  messageHash,
  _.privateAddressAdmin
).signature;

console.log("===> messageHash: ", messageHash);

console.log("===> signature: ", signature);