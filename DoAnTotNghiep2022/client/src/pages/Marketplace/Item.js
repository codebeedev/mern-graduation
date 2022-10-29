import React from "react";
import { ColorExtractor } from "react-color-extractor"
import Countdown from "./Countdown";
import bnbIcon from "../../assets/image/bnbIcon.png"
import Web3 from "web3";
import Fade from "./Fade";
import { withRouter } from "react-router-dom";
import LoadingImg from "../../assets/image/loading_img.png"

const Item = props => {
    const {nft, history} = props

    const [startBgImgColor, setStartBgImgColor] = React.useState("")
    const [endBgImgColor, setEndBgImgColor] = React.useState("")

    const setBgImg = (e) => {
        setStartBgImgColor(e[0])
        setEndBgImgColor(e[e.length - 1])
    }

    const [temp_status, setTempStatus] = React.useState("")

    const handleSetTempStatus = React.useCallback(() => {
        if(Date.now() < nft?.start_time ){
            setTempStatus("INCOMING")
        }
        else if(Date.now() >= nft?.start_time && Date.now() <= nft?.end_time){
            setTempStatus("ONSALE")
        }
        else if(Date.now() > nft?.end_time ){
            setTempStatus("NOTFORSALE")
        }
    }, [nft])

    React.useEffect(() => {
        handleSetTempStatus()

        return () => setTempStatus("")
    }, [handleSetTempStatus])

    const buy_price = nft?.buy_price
    const render_buy_price = buy_price ?  parseFloat(Web3.utils.fromWei(buy_price?.toString(), "ether")) : 0

    const [is_load_img, setIsLoadImg] = React.useState(true)

    return(
        <div className="marketplace__listNFT--item"
            onClick={() => {
                if(nft?.id){
                    history.push(`/detail-market-nft/${nft?.id}/provenance`)
                }
            }}
        >
            {
                temp_status !== "ONSALE" || nft?.is_sold ?
                <Fade
                    temp_status={temp_status}
                    nft={nft}
                    setTempStatus={setTempStatus}
                />
                :
                null
            }
            <div className="image">
                <div className="render-image">
                    <ColorExtractor getColors={e => {setBgImg(e)}}>
                        <img
                            src={is_load_img ? LoadingImg : nft?.nft_info?.asset_uri}
                            alt=""
                            style={is_load_img ? {} : {backgroundImage: `linear-gradient(60deg, ${startBgImgColor} 0%, ${endBgImgColor} 100%)`,}}
                            onLoad={() => {setIsLoadImg(false)}}
                        />
                    </ColorExtractor>
                </div>
                {
                    temp_status === "ONSALE" && !nft?.is_sold ?
                    <Countdown
                        nft={nft}
                        setTempStatus={setTempStatus}
                    />
                    :
                    null
                }
                {
                    nft?.is_bid ?
                    <div className="marketplace__listNFT--bids">
                        Lượt đấu giá: {nft?.total_bids}
                    </div>
                    :
                    null
                }
            </div>

            <div className="name">
                {nft?.nft_info?.name}
            </div>

            <div
                style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "0px 10px 10px 10px"
                }}
            >
                <div className="price">
                    <img
                        src={bnbIcon}
                        alt=""
                    />
                    <div>
                        {render_buy_price} BNB
                    </div>
                </div>

                {
                    temp_status === "ONSALE" && !nft?.is_sold ?
                    <div className="buyNow">
                        Buy now
                    </div>
                    :
                    null
                }
            </div>
        </div>
    )
}

export default withRouter(Item)