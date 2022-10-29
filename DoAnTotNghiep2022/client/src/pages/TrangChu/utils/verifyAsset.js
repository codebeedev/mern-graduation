import axios from "axios";
import LINK_API from "../../../constants/API";

const verifyAsset = async (asset_uri, asset_hash, user_bc_address) => {
    let success = false
    let data = ""
    const body = {asset_uri, asset_hash, user_bc_address}

    await axios({
        method: "POST",
        url: LINK_API.VERIFY,
        data: body
    })
    .then(res => {
        success = true
        data = {...res.data}
    })
    .catch(error => {
        ;
        success = false
    })

    return {success, ...data}  
}

export default verifyAsset