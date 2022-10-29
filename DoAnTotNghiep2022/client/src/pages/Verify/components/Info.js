import React from "react";

const Info = props => {
    const {render_nft} = props

    return(
        <div className="verify__info">
            <div className="verify__info--item">
                <span>Name: </span>
                <span>{render_nft?.name}</span>
            </div>

            <div className="verify__info--item">
                <span>Token ID: </span>
                <span>{render_nft?.token_id}</span>
            </div>
            
            <div className="verify__info--item">
                <span>Creator: </span>
                <span>{render_nft?.creator ?
                    render_nft?.creator?.slice(0, 9) + "..." + render_nft?.creator?.slice(render_nft?.creator?.length - 9, render_nft?.creator?.length)
                    :
                    ""
                }</span>
            </div>
            
            <div className="verify__info--item">
                <span>Owner: </span>
                <span>{render_nft?.owner ?
                    render_nft?.owner?.slice(0, 9) + "..." + render_nft?.owner?.slice(render_nft?.owner?.length - 9, render_nft?.owner?.length)
                    :
                    ""
                }</span>
            </div>
            
            <div className="verify__info--item">
                <span>Transaction hash: </span>
                <span>{render_nft?.tx_hash ?
                    render_nft?.tx_hash?.slice(0, 3) + "..." + render_nft?.tx_hash?.slice(render_nft?.tx_hash?.length - 15, render_nft?.tx_hash?.length)
                    :
                    ""
                }</span>
            </div>
        </div>
    )
}

export default Info