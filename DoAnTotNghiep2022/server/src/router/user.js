const { Router } = require("express")

const router = Router()

const { createUser, checkBcAddress } = require("../services/user")

router.post("/create", async(req, res) => {
    try {
        const body = req?.body

        const create_user_result = await createUser(body)

        if(create_user_result?.success) {
            res.status(200).json(create_user_result)
        }
        else {
            res.status(400).json(create_user_result)
        }
        
        
    } catch (error) {
        res.status(400).json({
            msg: "Something went wrong, please contact to admin",
        })
    }
})

router.post("/check-bc-address", async(req, res) => {
    try {
        const body = req?.body

        const check_bc_address_result = await checkBcAddress(body)

        if(check_bc_address_result?.success){
            res.status(200).json(check_bc_address_result)
        }
        else {
            res.status(400).json(check_bc_address_result)
        }

    } catch (error) {
        res.status(400).json({
            msg: "Something went wrong, please contact to admin",
        })
    }
})

module.exports = router