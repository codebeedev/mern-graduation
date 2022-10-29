import Web3 from "web3"

const loadWeb3 = async () => {
    let success = false
    try {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        }
        if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
    
            success = true 
            return {success}
        }
        else {
            success = false
            return {success}
        }
    } catch (error) {
        success = false
        return {success}
    }
}

export default loadWeb3