const Web3 = require("web3")

const { MarketNFTEntity } = require("../models/marketNFT")
const { NFTEntity } = require("../models/nft")
const {v4} = require("uuid")
const { ProvananceEntity } = require("../models/provenance")
const { BidHistoryEntity } = require("../models/bidHistory")

const createMessage = async (body) => {
    let success = false
    let data = ""

    try {
        const web3 = new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s1.binance.org:8545/"))
        const hashedDataToSign = web3.utils.soliditySha3(body)

        success = true
        data = hashedDataToSign
        
    } catch (error) {
        success = false
    }

    return {success, data}
}

const createMarketNFT = async (body) => {
    const nft_existed = await NFTEntity.findOne({id: body?.nft_id})
    const render_nft_exited = nft_existed ?
    {
        _id: nft_existed?._id,
        name: nft_existed?.name,
        description: nft_existed?.description,
        asset_uri: nft_existed?.asset_uri,
        certificate_uri: nft_existed?.certificate_uri,
        json_uri: nft_existed?.json_uri,
        creator: nft_existed?.creator,
        owner: nft_existed?.owner,
        tx_hash: nft_existed?.tx_hash,
        token_id: nft_existed?.token_id,
    }
    :
    ""
    const new_market_nft = {
        ...body,
        nft_info: render_nft_exited,
        id: v4(),
    }

    let success = false
    let msg = ""

    if(nft_existed && render_nft_exited && new_market_nft){
        await MarketNFTEntity.create(new_market_nft)
        await NFTEntity.updateOne({id: body?.nft_id}, {is_market: true})

        await ProvananceEntity.create({
            nft_id: body?.nft_id,
            id: v4(),
            seller: body?.seller,
            type: "list",
            buy_price: body?.buy_price,
        })

        success = true
        msg = "List NFT successfully"
    }
    else {
        msg = "List NFT failure"
    }

    return {success, msg}
}

const getSignatureBuy = async (body) => {
    let success = true
    let data = ""

    const nftAddresses = {type: "address[]", value: body?.nftAddresses}
    const tokenIds = {type: "uint256[]", value: body?.tokenIds};
    const paymentMethod = "0x0000000000000000000000000000000000000001";
    const price = body?.price;
    const seller = body?.seller;
    const buyer = body?.buyer;
    const listTime = body?.listTime;


    try {
        const web3 = new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s1.binance.org:8545/"))
        // const sellerSignatureHash = web3.utils.soliditySha3(body?.list_signature); 
        const hashedDataToSign = web3.utils.soliditySha3(nftAddresses, tokenIds, paymentMethod, price, seller, buyer, listTime, body?.list_signature);
        const private_key = process.env.OPERATOR_PRIVATE_KEY

        const signature = await web3.eth.accounts.sign(
            hashedDataToSign,
            private_key, 
        );
    
        data = signature?.signature
    } catch (error) {
        
    }
    return{success, signature: data}
}

const updateMarketNFTafterBuy = async (body) => {
    let success = false
    let msg = ""

    const {
        tx_hash_buy,
        nft_id,
        market_nft_id,
        buyer_address,
        buy_price,
        seller,
    } = body
    
    const purchase_doc = {
        id: v4(),
        nft_id,
        type: "purchase",
        buyer: buyer_address,
        buy_price,
        tx_hash: tx_hash_buy,
    }

    const transfer_doc = {
        id: v4(),
        nft_id,
        type: "transfer",
        from_address: seller,
        to_address: buyer_address,
    }

    try {
        await BidHistoryEntity.deleteMany({market_nft_id})
        await MarketNFTEntity.deleteOne({id: market_nft_id})
        await NFTEntity.updateOne({id: nft_id}, {owner: buyer_address, is_market: false})
        await ProvananceEntity.create(transfer_doc)
        await ProvananceEntity.create(purchase_doc)

        success = true
        msg = "Update NFT success"

    } catch (error) {
        success = false
    }

    return {success, msg}
}

const createPlaceABidMessage = async (body) => {
    let success = false
    let data = ""

    try {
        const web3 = new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s1.binance.org:8545/"))
        const nftAddresses = {type: "address[]", value: body?.nftAddresses}
        const tokenIds = {type: "uint256[]", value: body?.tokenIds};
        const bid_price = body?.bid_price?.toString();
        const bid_time = body?.bid_time;
        const list_signature_hash = web3.utils.soliditySha3(body?.list_signature)

        const hashedDataToSign = web3.utils.soliditySha3(nftAddresses, tokenIds, bid_price, bid_time, list_signature_hash)

        success = true
        data = hashedDataToSign
        
    } catch (error) {
        success = false
    }

    return {success, data}
}

const updateNFTAfterRevoke = async(body) => {
    let success = false
    let msg = ""

    try {
        const nft_id = body?.nft_id
        const tx_hash = body?.tx_hash
        const revoker =  body?.revoker

        const new_provenance = {
            id: v4(),
            nft_id: nft_id,
            type: "revoke",
            revoker: revoker,
            tx_hash: tx_hash,
        }

        await NFTEntity.updateOne({id: nft_id}, {is_market: false})
        await MarketNFTEntity.deleteOne({nft_id})
        await ProvananceEntity.create(new_provenance)

        success = true
        msg = "Update NFT after revoke success"
        
    } catch (error) {
        success = false
        msg = "Update NFT after revoke fail"
    }

    return {success, msg}
}

module.exports = {
    createMessage,
    createMarketNFT,
    getSignatureBuy,
    updateMarketNFTafterBuy,
    createPlaceABidMessage,
    updateNFTAfterRevoke,
}