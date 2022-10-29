import LINK_API from "../../../constants/API";
import axios from "axios";

const createUser = async (bc_address) => {
    let success = false
    let data = ""

    await axios({
        method: "POST",
        url: LINK_API.CREATE_USER,
        data: {
            bc_address: bc_address
        }
    })
    .then(res => {
        success = true
        data = res?.data
    })
    .catch(error => {
        success = false
    })

    return {success, ...data}
}

export default createUser