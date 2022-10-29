const { Router } = require("express")

const router = Router()

const {VerifyCountEntity} = require("../models/verifyCount")
const {UserEntity} = require("../models/user")
const { NFTEntity } = require("../models/nft")

router.get("/", async(req, res) => {
    try {
        const temp1 = await UserEntity.find()
        const temp2 = await NFTEntity.find()
        const temp3 = await VerifyCountEntity.findOne({id: "verifyCount"})

        return res.status(200).json({
            connected_address: temp1?.length ? temp1?.length : 0,
            published_nft: temp2?.length ? temp2?.length : 0,
            verified: temp3?.count ? temp3?.count : 0,
        })
        
    } catch (error) {
        res.status(400).json({
            msg: "Something went wrong, please contact to admin",
        })
    }
})

module.exports = router