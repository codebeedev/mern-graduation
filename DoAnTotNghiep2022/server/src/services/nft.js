
const {NFTEntity} = require("../models/nft")
const {ProvananceEntity} = require("../models/provenance")

const {v4} = require("uuid")

const Web3 = require("web3")

const verify = async (body) => {
    let success = false
    let data = ""

    const temp_asset_uri = body?.asset_uri
    const temp_asset_hash = body?.asset_hash 
    const user_bc_address = body?.user_bc_address

    const nft_existed_01 = await NFTEntity.findOne({asset_uri: temp_asset_uri})
    const nft_existed_02 = await NFTEntity.findOne({asset_hash: temp_asset_hash})
    const nft_existed_03 = await NFTEntity.findOne({certificate_uri: temp_asset_uri})
    const nft_existed_04 = await NFTEntity.findOne({certificate_hash: temp_asset_hash})

    if(nft_existed_01){
        success = true
        data = {
            msg: "This asset is already existed",
            is_yours: nft_existed_01?.owner === user_bc_address ? true : false,
            owner: nft_existed_01?.owner,
            tx_hash: nft_existed_01?.tx_hash,
            token_id: nft_existed_01?.token_id,
        }
    }   
    else {
        if(nft_existed_02){
            success = true
            data = {
                msg: "This asset is already existed",
                is_yours: nft_existed_02?.owner === user_bc_address ? true : false,
                owner: nft_existed_02?.owner,
                tx_hash: nft_existed_02?.tx_hash,
                token_id: nft_existed_02?.token_id,
            }
        }   
        else {
            if(nft_existed_03){
                success = true
                data = {
                    msg: "This asset is already existed",
                    is_yours: nft_existed_03?.owner === user_bc_address ? true : false,
                    owner: nft_existed_03?.owner,
                    tx_hash: nft_existed_03?.tx_hash,
                    token_id: nft_existed_03?.token_id,
                }
            }   
            else {
                if(nft_existed_04){
                    success = true
                    data = {
                        msg: "This asset is already existed",
                        is_yours: nft_existed_04?.owner === user_bc_address ? true : false,
                        owner: nft_existed_04?.owner,
                        tx_hash: nft_existed_04?.tx_hash,
                        token_id: nft_existed_04?.token_id,
                    }
                }   
                else {
                    success = true
                    data = {
                        msg: "This asset is not already existed",
                        can_create: true
                    }
                }
            }
        }
    }

    return {success, ...data}
}

const createNFT = async(data) => {
    const id = v4()

    const newData = {
        id,
        ...data,
    }

    await NFTEntity.create(newData)

    await ProvananceEntity.create({
        nft_id: id,
        id: v4(),
        minter: data?.creator,
        type: "mint",
        tx_hash: data?.tx_hash,
    })

    return {
        success: true,
        msg: "Create NFT success"
    }
}

const getListNFTsByAddress = async(data) => {

    const list = await NFTEntity.find({owner: data?.address}).sort({_id: -1})

    const renderList = list ? list.map((nft) => {
        return{
            _id: nft?._id,
            id: nft?.id,
            name: nft?.name,
            asset_uri: nft?.asset_uri,
            is_market: nft?.is_market,
        }
    }): []

    return {
        success: true,
        data: renderList
    }
}

const listMarketplaceNFT = async (body) => {
    let success = false
    let data = ""

    try {
        // data = body

        const web3 = new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s1.binance.org:8545/"))

        const hashedDataToSign = web3.utils.soliditySha3(data)

        success = true
        data = hashedDataToSign
        
    } catch (error) {
        success = false
    }

    return {success, data}
}

module.exports = {
    verify,
    createNFT,
    getListNFTsByAddress,
    listMarketplaceNFT,
}