const { Router } = require("express")

const router = Router()

const { createMessage, createMarketNFT, getSignatureBuy, updateMarketNFTafterBuy, createPlaceABidMessage, updateNFTAfterRevoke } = require("../services/marketNFT")
const { MarketNFTEntity } = require("../models/marketNFT")

router.post("/list/get-message", async(req, res) => {
    try {
        const body = req?.body

        const create_message_result = await createMessage(body)
        if(create_message_result?.success){
            res.status(200).json(create_message_result)
        }
        else {
            res.status(400).json(create_message_result)
        }
        
    } catch (error) {
        res.status(400).json({
            msg: "Something went wrong, please contact to admin",
        })
    }
})

router.post("/list/create", async(req, res) => {
    try {
        const body = req?.body

        const create_market_nft = await createMarketNFT(body)
        if(create_market_nft?.success){
            res.status(200).json(create_market_nft)
        }
        else {
            res.status(400).json(create_market_nft)
        }
        
    } catch (error) {
        res.status(400).json({
            msg: "Something went wrong, please contact to admin",
        })
    }
})

router.get("/get-list", async(req, res) => {
    try {
        const list = await MarketNFTEntity.find().sort({_id: -1})

        if(list){
            res.status(200).json(list)
        }
        else {
            res.status(400).json({
                msg: "Can not find list market nft"
            })
        }
        
    } catch (error) {
        res.status(400).json({
            msg: "Something went wrong, please contact to admin",
        })
    }
})

router.get("/detail", async(req, res) => {
    try {
        const id = req?.query?.id
        const exited_nft = await MarketNFTEntity.findOne({id})

        if(exited_nft){
            res.status(200).json(exited_nft)
        }
        else{
            res.status(400).json({
                msg: "can not find this nft",
            })
        }
        
    } catch (error) {
        res.status(400).json({
            msg: "Something went wrong, please contact to admin",
        })
    }
})

router.post("/get-signature-buy", async(req, res) => {
    try {
        const body = req?.body

        console.log(body);

        const get_signature_buy_result = await getSignatureBuy(body)

        if(get_signature_buy_result?.success){
            res.status(200).json(get_signature_buy_result)
        }
        else{
            res.status(400).json(get_signature_buy_result)
        }
        
    } catch (error) {
        res.status(400).json({
            msg: "Something went wrong, please contact to admin",
        })
    }
})

router.post("/update-nft-buy", async(req, res) => {
    try {
        const body = req?.body

        const get_signature_buy_result = await updateMarketNFTafterBuy(body)

        if(get_signature_buy_result?.success){
            res.status(200).json(get_signature_buy_result)
        }
        else{
            res.status(400).json(get_signature_buy_result)
        }
        
    } catch (error) {
        res.status(400).json({
            msg: "Something went wrong, please contact to admin",
        })
    }
})

router.post("/place-a-bid/get-message", async(req, res) => {
    try {
        const body = req?.body

        const create_message_result = await createPlaceABidMessage(body)
        if(create_message_result?.success){
            res.status(200).json(create_message_result)
        }
        else {
            res.status(400).json(create_message_result)
        }
        
    } catch (error) {
        res.status(400).json({
            msg: "Something went wrong, please contact to admin",
        })
    }
})

router.get("/revoke-info", async (req, res) => {
    try {
        const nft_id = req?.query?.nftId

        const existed_nft = await MarketNFTEntity.findOne({nft_id: nft_id})

        const response = {
            signature: existed_nft?.list_signature,
            message: existed_nft?.message,
            market_nft_id: existed_nft?.id,
        }

        res.status(200).json(response)
        
    } catch (error) {
        res.status(400).json({
            msg: "Something went wrong, please contact to admin",
        })
    }
})

router.post("/update-nft-after-revoke", async(req, res) => {
    try {
        const body = req?.body

        const update_after_revoke_res = await updateNFTAfterRevoke(body)

        if(update_after_revoke_res?.success){
            res.status(200).json(update_after_revoke_res)
        }
        else {
            res.status(400).json(update_after_revoke_res)
        }
        
    } catch (error) {
        res.status(400).json({
            msg: "Something went wrong, please contact to admin",
        })
    }
})

module.exports = router