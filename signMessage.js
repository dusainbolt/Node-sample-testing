const Web3 = require("web3");
const ethers = require("ethers");
const crypto = require("crypto-js");

const BN = ethers.BigNumber;

const _ = {
  RPC_POLYGON: "https://rpc-mumbai.maticvigil.com",
  CONTRACT_ADDRESS_POLYGON: "0xE247a62298fdFf6F89a688a15aD9F108Ae3EeBD5",
  addressAdmin: "0x4001aB01ebf313c90b92f0cd7e7A1371db6ff5Fa",
  privateAddressAdmin:
    "997183d0aa6b358a4a9db62495dc38d68cce60a9c1601af56b8a75fd5e3915bd",
  APP_KEY: "997183d0aa6b358a4a9db",
};

const web3Polygon = new Web3(_.RPC_POLYGON);

// const signMessage = async (messageHash) => {

// }

// const messageHash = ethers.utils.solidityKeccak256(
//   ["string", "string"],
//   ["Metareum Signature", "1645431377"]
// );

const msgObj = {
  originalMessage: "Metareum Signature",
  dateTime: BN.from(Date.now()).div(1000).toString(),
};

const messageHash = crypto.AES.encrypt(JSON.stringify(msgObj), _.APP_KEY).toString();

const signature = web3Polygon.eth.accounts.sign(
  messageHash,
  _.privateAddressAdmin
).signature;

console.log("===> messageHash: ", messageHash);

console.log("===> signature: ", signature);
