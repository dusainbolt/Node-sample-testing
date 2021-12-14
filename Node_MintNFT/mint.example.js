async _min(user, tokenId, artworkToken, purchase: Purchase) {
  let flagNonce = false
  try {
    this.logger.warn('******StartMintNFT******');
    const nftContract = new web3Moneta.eth.Contract(
      ABI_CONTRACT_NFT.output.abi,
      process.env.MONETA_NFTPROXY,
    );
    // mint(address owner, uint256 tokenID, uint256 backendTxID)
    console.log('data', user.address, tokenId, artworkToken)
    const encodedABI = await nftContract.methods
      .mint(user.address, tokenId, artworkToken)
      .encodeABI();
    const gasPrice = await web3Moneta.eth.getGasPrice();
    const gas = await nftContract.methods
      .mint(user.address, tokenId, artworkToken)
      .estimateGas({ from: this.addressMONETA });
    let nonce = this.getNonceMONETA()
    flagNonce = true
    console.log('nonce: ', nonce)
    const tx = {
      from: this.addressMONETA,
      to: process.env.MONETA_NFTPROXY,
      gas,
      gasPrice,
      data: encodedABI,
      nonce: nonce,
    };

    const signedTx = await web3Moneta.eth.accounts.signTransaction(
      tx,
      await this.s3Service.decrypt(this.hashMONETA),
    );

    purchase.txid = signedTx.transactionHash
    await purchase.save()

    const receipt = await web3Moneta.eth.sendSignedTransaction(
      signedTx.rawTransaction,
    );
    this.logger.warn('******EndMintNFT******');
    return receipt.transactionHash;
  } catch (error) {
    this.logger.error(`Mint NFT ERROR: `, error)
    if (flagNonce) this.nonceMONETA--
  }
}