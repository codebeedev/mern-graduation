import axios from "axios";
import LINK_API from "../../../constants/API";

const listNFT = async (body) => {
    let success = false
    let data = ""

    try {
        await axios({
            method: "POST",
            url: LINK_API.CREATE_MARKET_NFT,
            data: body
        })
        .then(res => {
            data = res?.data
            success = true
        })
        .catch(error => {
            ;
            success = false
        })
        
    } catch (error) {
        success = false
    }

    return {success, ...data}
}

export default listNFT