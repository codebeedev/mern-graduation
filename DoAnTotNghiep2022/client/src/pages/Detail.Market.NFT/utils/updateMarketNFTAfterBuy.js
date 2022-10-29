import axios from "axios";
import LINK_API from "../../../constants/API";

const updateMarketNFTafterBuy = async(body) => {
    let success = false
    let data = ""

    try {
        await axios({
            method: "post",
            url: LINK_API.UPDATE_NFT_BUY,
            data: body
        })
        .then(res =>{
            success = true
            data = {...res?.data}
        })
        .catch(error => {
            success = false
        })
        
    } catch (error) {
        success = false
    }

    return {success, ...data}
}

export default updateMarketNFTafterBuy