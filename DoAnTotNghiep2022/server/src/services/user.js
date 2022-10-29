
const {UserEntity} = require("../models/user")

const {v4} = require("uuid")

const checkBcAddress = async (body) => {
    let success = false
    let data = ""

    const find_user = await UserEntity.findOne({bc_address: body?.bc_address})

    if(find_user){
        data = {
            msg: "This bc_address is already existed",
            is_existed: true
        }
        success = true
    }
    else {
        data = {
            msg: "This bc_address is not existed",
            is_existed: false
        }
        success = true
    }
    return {success, ...data}
}

const createUser = async (body) => {
    let success = false
    let data = ""

    try {
        await UserEntity.create({
            bc_address: body?.bc_address,
            id: v4()
        })

        success = true
        data = {
            msg: "Create user successfully"
        }
    } catch (error) {
        success = false
        data = {
            msg: "Create user failure"
        }
    }

    return {success, ...data}
}

module.exports = {
    checkBcAddress,
    createUser,
}