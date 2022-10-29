import { create } from "ipfs-http-client"
const client = create("https://ipfs.infura.io:5001/api/v0"); 

const deployPDFOnIPFS = async (asset) => {
    let success = false
    let data = ""

    try {
        const buffer = Buffer(asset)
        const added = await client.add(buffer)
        if(added?.path){
            data = `https://ipfs.infura.io/ipfs/${added.path}`
            success = true
        }
        else {
            success = false
        }
    } catch (error) {
        ;
        success = false
    }

    return {success, data}
}

export default deployPDFOnIPFS