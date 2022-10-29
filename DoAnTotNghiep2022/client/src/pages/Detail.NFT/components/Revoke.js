import React from "react";
import UploadOutlineIcon from "mdi-react/UploadOutlineIcon";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import LINK_API from "../../../constants/API";
import DigiPosMarketplace from "../../../abi.file/DigiPosMarketplace.json"
import Web3 from "web3";
import { getDetailNFT } from "../../../redux/reducer/detailNFTSlice";
import { withRouter } from "react-router-dom";

const Revoke = props => {
    const {setOnProcess, match} = props

    const dispatch = useDispatch()
    const detailNFTSlice = useSelector(state => state.detailNFTSlice)
    const bcAddressSlice = useSelector(state => state.bcAddressSlice)

    const handleCallBC = async (data) => {
        try {
            const web3 = new Web3(window.web3.currentProvider)
            const MarketplaceContract = new web3.eth.Contract(DigiPosMarketplace, process.env.REACT_APP_MARKETPLACE_SC_ADDR)

            const result = await MarketplaceContract.methods.revokeItem(
                data.message,
                data.signature,
            ).send({from: bcAddressSlice?.data})

            await axios({
                method: "POST",
                url: LINK_API.UPDATE_AFTER_REVOKE,
                data: {
                    revoker: bcAddressSlice?.data,
                    tx_hash: result?.transactionHash,
                    nft_id: detailNFTSlice?.id
                }
            })
            .then(res => {
                const payload = {
                    id: match?.params?.id
                }
                dispatch(getDetailNFT(payload))
            })
            .catch(error => {
                setOnProcess({status: "error"})
            })
            
        } catch (error) {
            setOnProcess({status: "error"})
        }

    }

    const handleRevoke = async () => {
        setOnProcess({status: "loading"})
        await axios({
            url: LINK_API.GET_REVOKE_INFO + `?nftId=${detailNFTSlice?.id}`,
            method: "GET",
        })
        .then(async(res) => {
            await handleCallBC(res?.data)
        })
        .catch(e => {
            setOnProcess({status: "error"})
        })
    }

    return(
        <>
            <div id="list-nft" onClick={handleRevoke}>
                <UploadOutlineIcon/> Thu hồi
            </div> 
        </>
    )
}

export default withRouter(Revoke)