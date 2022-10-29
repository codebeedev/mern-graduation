import React from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

const Mode = props => {
    const {match, history} = props

    const detailMarketNFTSlice = useSelector(state => state.detailMarketNFTSlice)

    const mode_list = [
        {
            mode: "provenance",
            title: "Nguồn gốc",
        },
        {
            mode: "bids",
            title: "Đấu giá",
        },
    ]

    return(
        <div className="detailMarketNFT__mode">
            {
                mode_list?.map((mode, index) => {
                    const is_bid = detailMarketNFTSlice?.is_bid
                    const is_show_mode = mode.mode !== "bids" ? true : is_bid ? true :  false
                    const current_mode = match?.params?.mode
                    const is_actived = current_mode === mode.mode
 
                    return(
                        is_show_mode ?
                        <div
                            className={
                                `
                                    detailMarketNFT__mode--item
                                    ${is_actived ? "actived" : "inactived"}
                                `
                            }
                            key={index}
                            onClick={() => {
                                if(!is_actived){
                                    history.push(`/detail-market-nft/${detailMarketNFTSlice?.id}/${mode.mode}`)
                                }
                            }}
                        >
                            {mode.title}
                        </div>
                        :
                        null
                    )
                })
            }
        </div>
    )
}

export default withRouter(Mode)