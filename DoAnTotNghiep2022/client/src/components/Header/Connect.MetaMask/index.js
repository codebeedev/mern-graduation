import React from "react"
import MetaMaskLogo from "../../../assets/image/MetaMaskLogo.png"
import { useSelector, useDispatch } from "react-redux"
import { saveBcAddress, cleanBcAddress } from "../../../redux/reducer/bcAddressSlice"
import connectMetaMask from "../../../utils/connectMetaMask"
import checkBcAddress from "../utils/checkBcAddress"
import createUser from "../utils/createUser"
import Web3 from "web3"

const ConnectMetaMask = props => {
    const {setOnProcess} = props

    const dispatch = useDispatch()
    
    const bcAddressSlice = useSelector(state => state.bcAddressSlice)

    const handleConnectMetaMask = async () => {
        if(bcAddressSlice?.data && bcAddressSlice?.is_connected) {
            dispatch(cleanBcAddress())
        }
        else {
            setOnProcess({status: "loading"})
            const connect_metaMask_result = await connectMetaMask()
            if(connect_metaMask_result?.success && connect_metaMask_result?.account[0]){
                const check_bc_address_result = await checkBcAddress(Web3.utils.toChecksumAddress(connect_metaMask_result?.account[0]))
                if(check_bc_address_result?.success) {
                    if(check_bc_address_result?.is_existed){
                        dispatch(saveBcAddress(Web3.utils.toChecksumAddress(connect_metaMask_result?.account[0])))
                        setOnProcess({status: "close"})
                    }
                    else {
                        const create_user_result = await createUser(Web3.utils.toChecksumAddress(connect_metaMask_result?.account[0]))
                        if(create_user_result?.success) {
                            dispatch(saveBcAddress(Web3.utils.toChecksumAddress(connect_metaMask_result?.account[0])))
                            setOnProcess({status: "close"})
                        }
                        else {
                            setOnProcess({status: "error"})
                        }
                    }
                }
                else {
                    setOnProcess({status: "error"})
                }
            }
            else {
                setOnProcess({status: "error"})
            }
        }
    }

    const handleAccountsChanged = React.useCallback( async (accounts) => {
        if(accounts[0] && bcAddressSlice?.is_connected){
            setOnProcess({status: "loading"})
            const check_bc_address_result = await checkBcAddress(Web3.utils.toChecksumAddress(accounts[0]))
            if(check_bc_address_result?.success) {
                if(check_bc_address_result?.is_existed){
                    dispatch(saveBcAddress(Web3.utils.toChecksumAddress(accounts[0])))
                    setOnProcess({status: "close"})
                }
                else {
                    const create_user_result = await createUser(Web3.utils.toChecksumAddress(accounts[0]))
                    if(create_user_result?.success) {
                        dispatch(saveBcAddress(Web3.utils.toChecksumAddress(accounts[0])))
                        setOnProcess({status: "close"})
                    }
                    else {
                        setOnProcess({status: "error"})
                    }
                }
            }
            else {
                setOnProcess({status: "error"})
            }
        }
    }, [bcAddressSlice?.is_connected, dispatch, setOnProcess])

    React.useEffect(() => {
        if(bcAddressSlice?.is_connected && window?.ethereum){
            window.ethereum.on("accountsChanged", handleAccountsChanged)
        }
        else{
            window?.ethereum?.removeListener("accountsChanged", handleAccountsChanged)
        }
    }, [handleAccountsChanged, bcAddressSlice?.is_connected])

    const handleCheckMetaMaskInstalled = async () => {
        const is_metamask_installed = window?.ethereum?.isMetaMask
        if(is_metamask_installed){
            await handleConnectMetaMask()
        }
        else {
            window.open("https://metamask.io/download/", "_blank")
            setOnProcess({status: "error", title: "Please install MetaMask extension"})
        }
    }

    return(
        <div className="header__connectMetaMask"
            onClick={handleCheckMetaMaskInstalled}
        >
            <img
                src={MetaMaskLogo}
                alt=""
            />
            {
                bcAddressSlice?.data && bcAddressSlice?.is_connected ?
                <>
                    {bcAddressSlice?.data?.slice(0, 7)}
                    ...
                    {bcAddressSlice?.data?.slice(bcAddressSlice?.data?.length - 7 , bcAddressSlice?.data?.length)}
                </>
                :
                <>Kết nối ví</>
            }
        </div>
    )
}

export default ConnectMetaMask