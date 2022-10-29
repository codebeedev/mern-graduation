
import loadWeb3 from "./loadWeb3";
import Web3 from "web3";

const connectMetaMask = async () => {
    let success = false
    const load_web3_result = await loadWeb3()
    if(load_web3_result?.success){
        try {
            const web3 = new Web3(window.web3.currentProvider);
            const account = await web3.eth.getAccounts();
            const chainId = await web3.eth.getChainId();

            success = true
            return {
                success,
                account,
                chainId,
            }
        } catch (error) {
            success = false
            return {success}
        }
    }
    else {
        success = false
        return {success}
    }

}

export default connectMetaMask