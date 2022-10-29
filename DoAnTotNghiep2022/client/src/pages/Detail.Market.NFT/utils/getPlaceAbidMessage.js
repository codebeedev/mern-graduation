import axios from "axios";
import Web3 from "web3";
import LINK_API from "../../../constants/API";

const getPlaceAbidMessage = async(body, bcAddressSlice) => {
    let success = false
    let data = ""

    try {
        await axios({
            method: "POST",
            url: LINK_API.GET_MESSAGE_PLACE_A_BID,
            data: body
        })
        .then( async (res) => {
            const message = await res?.data?.data
            const web3 = new Web3(window.web3.currentProvider)

            const result = await web3.eth.personal.sign(message, bcAddressSlice?.data);
            data = result
            success = true
        })
        .catch(error => {
            success = false
        })
        
    } catch (error) {
        success = false
    }

    return {success, data}
}

export default getPlaceAbidMessage