const { Router } = require("express")
const { v4 } = require("uuid")

const router = Router()

const { BidHistoryEntity } = require("../models/bidHistory")
const { MarketNFTEntity } = require("../models/marketNFT")


const { getSignatureClaim } = require("../services/bidHistory")

router.post("/place-a-bid", async(req, res) => {
    try {
        const body = req?.body

        const new_bid = {
            id: v4(),
            ...body
        }

        const existed_nft = await MarketNFTEntity.findOne({id: body?.market_nft_id})

        await BidHistoryEntity.create(new_bid)
        await MarketNFTEntity.updateOne({id: body?.market_nft_id}, {highest_bid: body?.bid_price, highest_bidder: body?.bidder, total_bids: parseInt(existed_nft?.total_bids) + 1})

        res.status(200).json({
            msg: "Place a bid success"
        })
        
    } catch (error) {
        res.status(400).json({
            msg: "Something went wrong, please contact to admin",
        })
    }
})

router.get("/bid-history", async(req, res) => {
    try {
        const id = req?.query?.id

        const list_bid_history = await BidHistoryEntity.find({market_nft_id: id}).sort({_id: -1})

        res.status(200).json(list_bid_history)
        
    } catch (error) {
        res.status(400).json({
            msg: "Something went wrong, please contact to admin",
        })
    }
})

router.post("/get-signature-claim", async(req, res) => {
    try {
        const body = req?.body

        const get_signature_claim_result = await getSignatureClaim(body)

        if(get_signature_claim_result?.success){
            res.status(200).json(get_signature_claim_result)
        }
        else{
            res.status(400).json(get_signature_claim_result)
        }
        
    } catch (error) {
        res.status(400).json({
            msg: "Something went wrong, please contact to admin",
        })
    }
})

module.exports = router