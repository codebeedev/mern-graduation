
import axios from "axios";
import LINK_API from "../../../constants/API";

const getSignatureBuy = async (body) => {
    let success = false
    let data = ""

    try {
        await axios({
            method: "POST",
            url: LINK_API.GET_SIGNATURE_BUY,
            data: body
        })
        .then(res => {
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

export default getSignatureBuy