import axios from "axios"
import LINK_API from "../../../constants/API"

const handlePlaceABid = async(body) => {
    let success = false
    let data = ""

    try {
        await axios({
            method: "POST",
            url: LINK_API.PLACE_A_BID,
            data: body
        })
        .then(res=> {
            data = {...res?.data}
            success = true
        })
        .catch(error => {
            success = false
        })

    } catch (error) {
        success = false
    }

    return {success, ...data}
    
}

export default handlePlaceABid