const { Router } = require("express")

const router = Router()

const { NFTEntity } = require("../models/nft")

const { ProvananceEntity } = require("../models/provenance")

const { VerifyCountEntity } = require("../models/verifyCount")

const { verify , createNFT, getListNFTsByAddress} = require("../services/nft")

router.post("/verify", async(req, res) => {
    try {
        const body = req?.body

        const verify_result = await verify(body)

        if(verify_result?.success){
            const temp = await VerifyCountEntity.findOne({id: "verifyCount"})

            await VerifyCountEntity.updateOne({id: "verifyCount"}, {count: temp?.count + 1})

            res.status(200).json({
                ...verify_result
            })
        }
        else {
            res.status(400).json({
                ...verify_result
            })
        }
        
    } catch (error) {
        res.status(400).json({
            msg: "Something went wrong, please contact to admin",
        })
    }
})

router.post("/create", async(req, res) => {
    try {
        const data = req.body

        const check_nft_result = await createNFT(data)

        if(check_nft_result?.success){
            res.status(200).json({
                ...check_nft_result
            })
        }
        else {
            res.status(400).json({
                ...check_nft_result
            })
        }
        
    } catch (error) {
        res.status(400).json({
            msg: "Something went wrong, please contact to admin",
        })
    }
})

router.get("/list/by-address", async(req, res) => {
    try {
        const data = req.query

        const check_nft_result = await getListNFTsByAddress(data)

        if(check_nft_result?.success){
            res.status(200).json({
                ...check_nft_result
            })
        }
        else {
            res.status(400).json({
                ...check_nft_result
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

        const exited_nft = await NFTEntity.findOne({id})

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

router.get("/provenance", async(req, res) => {
    try {
        const nft_id = req?.query?.nft_id

        const list_provenance =   await ProvananceEntity.find({nft_id}).sort({_id: -1})

        return res.status(200).json(list_provenance)
        
    } catch (error) {
        res.status(400).json({
            msg: "Something went wrong, please contact to admin",
        })
    }
})

router.get("/verify-info", async (req, res) => {
    try {
        const query = req?.query

        const find_nft = await NFTEntity.findOne(query)

        return  res.status(200).json(find_nft)
    } catch (error) {
        res.status(400).json({
            msg: "Something went wrong, please contact to admin",
        })
    }
})

module.exports = router