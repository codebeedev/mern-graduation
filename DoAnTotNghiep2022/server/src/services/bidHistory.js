
const { BidHistoryEntity } = require("../models/bidHistory")
const Web3 = require("web3")


const getSignatureClaim = async(body) => {
    let success = true
    let data = ""

    const nftAddresses = {type: "address[]", value: body?.nftAddresses}
    const tokenIds = {type: "uint256[]", value: body?.tokenIds};
    const paymentMethod = "0x0000000000000000000000000000000000000001";
    const price = body?.price;
    const seller = body?.seller;
    const bidder = body?.bidder;
    const listTime = body?.listTime;


    try {
        const web3 = new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s1.binance.org:8545/"))
        // const sellerSignatureHash = web3.utils.soliditySha3(body?.list_signature); 
        const hashedDataToSign = web3.utils.soliditySha3(nftAddresses, tokenIds, paymentMethod, price, seller, bidder, listTime, body?.list_signature);
        const private_key = process.env.OPERATOR_PRIVATE_KEY

        const signature = await web3.eth.accounts.sign(
            hashedDataToSign,
            private_key, 
        );
    
        data = signature?.signature

        // console.log(data);
    } catch (error) {
    }
    return{success, signature: data}
}

module.exports = {
    getSignatureClaim,
}