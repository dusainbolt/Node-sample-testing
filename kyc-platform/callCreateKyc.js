const Web3 = require('web3');
const ABIJson = require('./contracts/KYCPlatform.json');

const web3 = new Web3('ws://localhost:8545');

const _ = {
  contractAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  publicKey: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
  privateKey:
    '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
  publicKeyUser: '0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc',
  privateKeyUser:
    '5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a',
  uid: 'QmQJqbkNjqJU7A194KTpLjPLYAw6je3onxre5R1P4bv7gY',
};

const KYCContract = new web3.eth.Contract(ABIJson.abi, _.contractAddress);

const getMessageHash = async () => {
  console.log('_.uid, _.publicKeyUser', _.uid, _.publicKeyUser);
  const hash = await KYCContract.methods
    .getCreateKYCMessageHash(_.uid, _.publicKeyUser)
    .call();
  return hash;
};

const createKYCMember = async () => {
  try {
    const hash = await getMessageHash();
    console.log('hash =====> ', hash);
    ('0x99d85ccdf7774de25d481acb0be1ac637ea0b32a353bb06c2e718cab1d02632b');
    ('0x99d85ccdf7774de25d481acb0be1ac637ea0b32a353bb06c2e718cab1d02632b');
    console.log('===========> START signature: ');
    const signature = web3.eth.accounts.sign(hash, _.privateKey).signature;
    console.log('signature =====> ', signature);
    ('0xff81348a2e219c8b904a96286206bab6918867f7f5cc5abbf0b1c2d6f081c0bc7e1b692d25b71ca4ddeee46a4bcc954c5d814046455568eb1322650634c67b8f1b');
    ('0xff81348a2e219c8b904a96286206bab6918867f7f5cc5abbf0b1c2d6f081c0bc7e1b692d25b71ca4ddeee46a4bcc954c5d814046455568eb1322650634c67b8f1b');
    console.log('******StartMintNFT******');
    const encodedABI =
      '0xfa397d22000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000002e516d555639577a5839337457316a66665556425663584d714c5562694769326938514d635a58395877734a6e68440000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000041fccdeb92e380e92971e4eeebcaf4cb8a2da2b8b9bcd726549b78f9e56d505a542eb900d8d8374d773af7c154407bf296ded3fa6c732b9bf4ecc85b2aee4cf9001c00000000000000000000000000000000000000000000000000000000000000';
    console.log('encodeABI: ', _.uid, signature);
    console.log('encodedABI =====> ', encodedABI);
    ('0xfa397d22000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000002e516d514a71626b4e6a714a5537413139344b54704c6a504c594177366a65336f6e787265355231503462763767590000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000041ff81348a2e219c8b904a96286206bab6918867f7f5cc5abbf0b1c2d6f081c0bc7e1b692d25b71ca4ddeee46a4bcc954c5d814046455568eb1322650634c67b8f1b00000000000000000000000000000000000000000000000000000000000000');
    ('0xfa397d22000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000002e516d514a71626b4e6a714a5537413139344b54704c6a504c594177366a65336f6e787265355231503462763767590000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000041ff81348a2e219c8b904a96286206bab6918867f7f5cc5abbf0b1c2d6f081c0bc7e1b692d25b71ca4ddeee46a4bcc954c5d814046455568eb1322650634c67b8f1b00000000000000000000000000000000000000000000000000000000000000');
    const gasPrice = await web3.eth.getGasPrice();
    console.log('gasPrice =====> ', gasPrice);
    const gas = await KYCContract.methods
      .createKYCMember(_.uid, signature)
      .estimateGas({ from: _.publicKeyUser });
    console.log('gas =====> ', gas);

    const tx = {
      from: _.publicKeyUser,
      to: _.contractAddress,
      gas,
      gasPrice,
      data: encodedABI,
      nonce: web3.eth.getTransactionCount(_.publicKeyUser),
    };

    const signedTx = await web3.eth.accounts.signTransaction(
      tx,
      _.privateKeyUser
    );
    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );
    console.log('receipt =====> ', receipt);
    console.log('******EndMintNFT******');
    return receipt.transactionHash;
  } catch (error) {
    console.log(`Mint NFT ERROR: `, error);
  }
};

createKYCMember();
