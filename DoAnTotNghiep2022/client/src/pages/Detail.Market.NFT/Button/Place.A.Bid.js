import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PlaceABidModal from "../Featured.Modal/Place.A.Bid.Modal";
import getPlaceAbidMessage from "../utils/getPlaceAbidMessage"
import Web3 from "web3";
import handlePlaceABid2 from "../utils/handlePlaceABid";
import { getDetailMarketNFT } from "../../../redux/reducer/detailMarketNFTSlice"
import { withRouter } from "react-router-dom";

const PlaceABid = props => {
    const {setOnProcess, match} = props

    const dispatch = useDispatch()

    const [temp_bid_amount, setTempBidAmount] = React.useState("")

    const bcAddressSlice = useSelector(state => state.bcAddressSlice)
    const detailMarketNFTSlice = useSelector(state => state.detailMarketNFTSlice)

    const [is_place_a_bid_modal, setIsPlaceABidModal] = React.useState(false)
    const handleSetIsPlaceABidModal = () => {
        setIsPlaceABidModal(!is_place_a_bid_modal)
    }

    const hanldeError = () => {
        setTempBidAmount("")
        setOnProcess({status: "error"})
    }

    const handlePlaceABid = async () => {
        setOnProcess({status: "loading"})
        handleSetIsPlaceABidModal()

        const bid_time = Date.now()

        const body = {
            nftAddresses: process.env.REACT_APP_NFT_SC_ADDR,
            tokenIds: detailMarketNFTSlice?.nft_info?.token_id,
            bid_time,
            bid_price: temp_bid_amount ?  (Web3.utils.toWei(temp_bid_amount?.toString(), "ether")).toString() : "",
            list_signature: detailMarketNFTSlice?.list_signature
        }  

        const get_message_res = await getPlaceAbidMessage(body, bcAddressSlice)
        if(get_message_res?.success){
            const bid_signature = get_message_res?.data

            const place_a_bid_body = {
                bid_signature,
                bidder: bcAddressSlice?.data,
                bid_time,
                bid_price: temp_bid_amount ?  (Web3.utils.toWei(temp_bid_amount?.toString(), "ether")).toString() : "",
                nft_id: detailMarketNFTSlice?.nft_id,
                market_nft_id: detailMarketNFTSlice?.id,
            }

            const place_a_bid_res = await handlePlaceABid2(place_a_bid_body)
            if(place_a_bid_res?.success){
                const payload = {
                    id: match?.params?.id
                }
                setOnProcess({status: "success", onConfirm: () => {dispatch(getDetailMarketNFT(payload))}})
            }
            else {
                hanldeError()
            }
        }
        else {
            hanldeError()
        }
    }

    const checkHighestBidder = async () => {
        if(detailMarketNFTSlice?.highest_bidder?.toUpperCase() === bcAddressSlice?.data?.toUpperCase()){
            setOnProcess({status: "error", title: "You're the highest bidder"})
        }
        else {
            handleSetIsPlaceABidModal()
        }
    }

    return(
        <>
            <PlaceABidModal
                isOpen={is_place_a_bid_modal}
                toggle={handleSetIsPlaceABidModal}
                setTempBidAmount={setTempBidAmount}
                temp_bid_amount={temp_bid_amount}
                handlePlaceABid={handlePlaceABid}
            />
            <div className="detailMarketNFT__buttons--buyNow placeABid" onClick={checkHighestBidder}>
                Place a bid
            </div>
        </>
    )
}

export default withRouter(PlaceABid)