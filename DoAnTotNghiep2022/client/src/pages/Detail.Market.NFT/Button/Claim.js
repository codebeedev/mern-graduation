import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";
import getSignatureClaim from "../utils/getSignatureClaim";
import DigiPosMarketplace from "../../../abi.file/DigiPosMarketplace.json"
import updateMarketNFTafterBuy from "../utils/updateMarketNFTAfterBuy";
import { getDetailMarketNFT } from "../../../redux/reducer/detailMarketNFTSlice";
import { withRouter } from "react-router-dom";

const Claim  =props => {
    const {setOnProcess, match} = props

    const detailMarketNFTSlice = useSelector(state => state.detailMarketNFTSlice)
    const bcAddressSlice = useSelector(state => state.bcAddressSlice)
    const dispatch = useDispatch()

    const handleClaim = async () => {
        setOnProcess({status: "loading"})
        const body = {
            nftAddresses: [process.env.REACT_APP_NFT_SC_ADDR], 
            tokenIds: [detailMarketNFTSlice?.nft_info?.token_id],
            price: detailMarketNFTSlice?.highest_bid,
            seller: detailMarketNFTSlice?.seller,
            listTime: detailMarketNFTSlice?.list_time,
            bidder: bcAddressSlice?.data,
            list_signature: Web3.utils.soliditySha3(detailMarketNFTSlice?.list_signature),
        }

        const get_signature_claim_res = await getSignatureClaim(body)
        if(get_signature_claim_res?.success) {
            try {
                const web3 = new Web3(window.web3.currentProvider)
                const MarketplaceContract = new web3.eth.Contract(DigiPosMarketplace, process.env.REACT_APP_MARKETPLACE_SC_ADDR)
        
                const result = await MarketplaceContract.methods.matchOrder(
                    [process.env.REACT_APP_NFT_SC_ADDR],
                    [detailMarketNFTSlice?.nft_info?.token_id],
                    get_signature_claim_res?.signature,
                    "0x0000000000000000000000000000000000000001",
                    detailMarketNFTSlice?.seller,
                    detailMarketNFTSlice?.highest_bid, 
                    detailMarketNFTSlice?.list_time,
                    Web3.utils.soliditySha3(detailMarketNFTSlice?.list_signature),
                ).send({from: bcAddressSlice?.data, value: detailMarketNFTSlice?.highest_bid})
        
                const transactionHash = result?.transactionHash

                if(transactionHash){
                    const body = {
                        tx_hash_buy: transactionHash,
                        nft_id: detailMarketNFTSlice?.nft_id,
                        market_nft_id: detailMarketNFTSlice?.id,
                        buyer_address: bcAddressSlice?.data,
                        buy_price: detailMarketNFTSlice?.highest_bid,
                        seller: detailMarketNFTSlice?.seller,
                    }

                    const update_res = await updateMarketNFTafterBuy(body)

                    if(update_res?.success) {
                        const payload = {
                            id: match?.params?.id
                        }
                        dispatch(getDetailMarketNFT(payload))
                        setOnProcess({status: "success"})
                    }
                    else {
                        setOnProcess({status: "error"})
                    }
                }
                else {
                    setOnProcess({status: "error"})
                }
                
            } catch (error) {
                setOnProcess({status: "error"})
            }
            
        }
        else {
            setOnProcess({status: "error"})
        }
    }

    return(
        <>
            <div className="detailMarketNFT__buttons--buyNow placeABid" onClick={handleClaim}>
                Claim
            </div>
        </>
    )
}

export default withRouter(Claim)