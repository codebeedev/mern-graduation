import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import Web3 from "web3";
import NoDataFound from "../../../components/NoDataFound";

const Bids = props => {

    const bidHistorySlice = useSelector(state => state.bidHistorySlice)

    return(
        <div className="detailMarketNFT__bids">
            {
                bidHistorySlice?.data && bidHistorySlice?.data?.length > 0 ?
                bidHistorySlice?.data?.map((bid, index) => {
                    const time = bid?.bid_time
                    const bidder = bid?.bidder
                    const bid_price = bid?.bid_price?.toString()
                    const render_bid_price = bid_price ? parseFloat(Web3.utils.fromWei(bid_price, "ether")) : 0

                    return(
                        <div
                            key={index}
                            className="detailMarketNFT__bids--item"
                        >
                            <div className="detailMarketNFT__bids--line"> <div/> </div>
                            <div className="detailMarketNFT__bids--container">
                                <div className="detailMarketNFT__bids--content">
                                    đấu giá bởi <span className="address">{bidder.slice(0,7)}...{bidder.slice(bidder.length - 7, bidder.length)}</span> với
                                    <span className="price"> {render_bid_price} BNB </span>
                                </div>
                                <div className="detailMarketNFT__bids--time">
                                    {moment(time).format("DD/MM/YYYY HH:mm:ss")}
                                </div>
                            </div>
                        </div>
                    )
                })
                :
                <NoDataFound/>
            }
        </div>
    )
}

export default Bids