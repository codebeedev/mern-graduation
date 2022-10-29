import React from "react";
import { useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import { ColorExtractor } from "react-color-extractor"
import Web3 from "web3";
import Countdown from "./Countdown";
import LoadingImg from "../../assets/image/loading_img.png"
import getSignatureBuy from "./utils/getSignatureBuy";
import DigiPosMarketplace from "../../abi.file/DigiPosMarketplace.json"
// import sha256 from "crypto-js/sha256";
import Button from "./Button";
import BinanceCoin from "../../assets/image/BinanceCoin.png"
import updateMarketNFTafterBuy from "./utils/updateMarketNFTAfterBuy";
// import { getDetailMarketNFT } from "../../redux/reducer/detailMarketNFTSlice";
import { withRouter } from "react-router-dom";
import Mode from "./components/Mode";
import Bids from "./components/Bids";
import Provenance from "../../components/Provenance";

const Container = props => {
    const {setOnProcess, match, history, render_provenace} = props

    const detailMarketNFTSlice = useSelector(state => state.detailMarketNFTSlice)
    const bcAddressSlice = useSelector(state => state.bcAddressSlice)
    // const dispatch = useDispatch()

    const [startBgImgColor, setStartBgImgColor] = React.useState("")
    const [endBgImgColor, setEndBgImgColor] = React.useState("")

    const setBgImg = (e) => {
        setStartBgImgColor(e[0])
        setEndBgImgColor(e[e.length - 1])
    }

    const [temp_status, setTempStatus] = React.useState("")

    const handleSetTempStatus = React.useCallback(() => {
        if(Date.now() < detailMarketNFTSlice?.start_time ){
            setTempStatus("INCOMING")
        }
        else if(Date.now() >= detailMarketNFTSlice?.start_time && Date.now() <= detailMarketNFTSlice?.end_time){
            setTempStatus("ONSALE")
        }
        else if(Date.now() > detailMarketNFTSlice?.end_time ){
            setTempStatus("NOTFORSALE")
        }
    }, [detailMarketNFTSlice])

    React.useEffect(() => {
        handleSetTempStatus()

        return () => setTempStatus("")
    }, [handleSetTempStatus])

    const buy_price = detailMarketNFTSlice?.buy_price
    const render_buy_price = buy_price ?  parseFloat(Web3.utils.fromWei(buy_price?.toString(), "ether")) : 0 
    const highest_bid_price = detailMarketNFTSlice?.highest_bid
    const render_highest_bid_price = highest_bid_price ?  parseFloat(Web3.utils.fromWei(highest_bid_price?.toString(), "ether")) : 0 

    const [is_load_img, setIsLoadImg] = React.useState(true)

    const handleGetSignatureBuy = async () => {
        setOnProcess({status: "loading"})
        const body = {
            nftAddresses: [process.env.REACT_APP_NFT_SC_ADDR], 
            tokenIds: [detailMarketNFTSlice?.nft_info?.token_id],
            price: detailMarketNFTSlice?.buy_price,
            seller: detailMarketNFTSlice?.seller,
            listTime: detailMarketNFTSlice?.list_time,
            buyer: bcAddressSlice?.data,
            list_signature: Web3.utils.soliditySha3(detailMarketNFTSlice?.list_signature),
        }

        const get_signature_buy_result = await getSignatureBuy(body)
        if(get_signature_buy_result?.signature){
            try {
                const web3 = new Web3(window.web3.currentProvider)
                const MarketplaceContract = new web3.eth.Contract(DigiPosMarketplace, process.env.REACT_APP_MARKETPLACE_SC_ADDR)

                const result = await MarketplaceContract.methods.matchOrder(
                    [process.env.REACT_APP_NFT_SC_ADDR],
                    [detailMarketNFTSlice?.nft_info?.token_id],
                    get_signature_buy_result?.signature,
                    "0x0000000000000000000000000000000000000001",
                    detailMarketNFTSlice?.seller,
                    detailMarketNFTSlice?.buy_price, 
                    detailMarketNFTSlice?.list_time,
                    Web3.utils.soliditySha3(detailMarketNFTSlice?.list_signature),
                ).send({from: bcAddressSlice?.data, value: detailMarketNFTSlice?.buy_price})

                const transactionHash = result?.transactionHash

                if(transactionHash){
                    const body = {
                        tx_hash_buy: transactionHash,
                        nft_id: detailMarketNFTSlice?.nft_id,
                        market_nft_id: detailMarketNFTSlice?.id,
                        buyer_address: bcAddressSlice?.data,
                        buy_price: detailMarketNFTSlice?.buy_price,
                        seller: detailMarketNFTSlice?.seller,
                    }

                    const update_res = await updateMarketNFTafterBuy(body)

                    if(update_res?.success) {
                        // const payload = {
                        //     id: match?.params?.id
                        // }
                        // dispatch(getDetailMarketNFT(payload))
                        // setOnProcess({status: "success"})
                        history.push("/profile")
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

    const startBuy = async () => {
        const process = {
            status: "confirm",
            onConfirm: handleGetSignatureBuy,
        }
        setOnProcess(process)
    }

    return(
        <div className="detailMarketNFT__container">
            <Row>
                <Col xl="4" lg="5" md="12" sm="12" xs="12" className="p-3">
                    <div className="detailMarketNFT__leftCol">
                        <div className="detailMarketNFT__image">
                            <div className="detailMarketNFT__image--container">
                                <ColorExtractor getColors={e => {setBgImg(e)}}>
                                    <img
                                        src={is_load_img ? LoadingImg : detailMarketNFTSlice?.nft_info?.asset_uri}
                                        alt=""
                                        style={is_load_img ? {} : {backgroundImage: `linear-gradient(60deg, ${startBgImgColor} 0%, ${endBgImgColor} 100%)`,}}
                                        onLoad={() => {setIsLoadImg(false)}}
                                    />
                                </ColorExtractor>
                            </div>
                        </div>

                        <div className="detailMarketNFT__user">
                            <div className="detailMarketNFT__user--title">
                                Tác giả
                            </div>
                            <div className="detailMarketNFT__user--value">
                                {
                                    detailMarketNFTSlice?.nft_info?.creator?.slice(0, 9) + "..." +
                                    detailMarketNFTSlice?.nft_info?.creator?.slice(detailMarketNFTSlice?.nft_info?.creator?.length - 9, detailMarketNFTSlice?.nft_info?.creator?.length)
                                }
                            </div>
                            <div className="detailMarketNFT__user--title">
                                Chủ sở hữu
                            </div>
                            <div className="detailMarketNFT__user--value">
                                {
                                    detailMarketNFTSlice?.nft_info?.owner?.slice(0, 9) + "..." +
                                    detailMarketNFTSlice?.nft_info?.owner?.slice(detailMarketNFTSlice?.nft_info?.owner?.length - 9, detailMarketNFTSlice?.nft_info?.owner?.length)
                                }
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xl="8" lg="7" md="12" sm="12" xs="12" className="p-3">
                    <div className="detailMarketNFT__rightCol">
                        <div className="detailMarketNFT__name">
                            {detailMarketNFTSlice?.nft_info?.name}
                        </div>

                        <Row className="mt-4">
                            <Col>
                                <div className="detailMarketNFT__title">Giá</div>
                                <div className="detailMarketNFT__value price"> 
                                    <img
                                        src={BinanceCoin}
                                        alt=""
                                    />
                                <div>{render_buy_price} BNB</div></div>
                            </Col>

                            {
                                (temp_status === "INCOMING" || temp_status === "ONSALE") && !detailMarketNFTSlice?.is_sold ?
                                <Col>
                                    <div style={{textAlign: "end"}} className="detailMarketNFT__title">
                                        {
                                            temp_status === "INCOMING"?
                                            <>
                                                Bắt đầu trong
                                            </>
                                            :
                                            temp_status === "ONSALE" ?
                                            <>
                                                Kết thúc trong
                                            </>
                                            :
                                            null
                                        }
                                    </div>
                                    <Countdown
                                        nft={detailMarketNFTSlice}
                                        setTempStatus={setTempStatus}
                                        temp_status={temp_status}
                                    />
                                </Col>
                                : null
                            }
                        </Row>

                        {
                            detailMarketNFTSlice?.is_bid ?
                            <Row className="mt-4">
                                <Col>
                                    <div className="detailMarketNFT__title">
                                        {detailMarketNFTSlice?.highest_bidder ? 
                                        <>Đấu giá cao nhất bởi <strong style={{color: "white", fontWeight: "700"}}> {detailMarketNFTSlice?.highest_bidder?.slice(0, 7)}...{detailMarketNFTSlice?.highest_bidder?.slice(detailMarketNFTSlice?.highest_bidder?.length - 7, detailMarketNFTSlice?.highest_bidder?.length)}  </strong> </>
                                        : "Giá sàn"}   
                                    </div>
                                    <div className="detailMarketNFT__value price">
                                        <img
                                            src={BinanceCoin}
                                            alt=""
                                        />
                                        <div>{render_highest_bid_price} BNB</div>
                                    </div>
                                </Col>
                            </Row>
                            :
                            null
                        }

                        <div className="mt-4">
                            <Button
                                handleGetSignatureBuy={startBuy}
                                temp_status={temp_status}
                                setOnProcess={setOnProcess}
                            />
                        </div>

                        <div className="mt-4">
                            <Mode
                            />
                        </div>

                        <div className="mt-4 normal-scrollbar" style={{maxHeight:"35vh", minHeight: "200px", paddingLeft: "10px" , overflowY: "scroll", overflowX: "hidden"}}>
                            {
                                match?.params?.mode === "bids" ?
                                <Bids/>
                                :
                                match?.params?.mode === "provenance" ?
                                <Provenance render_provenace={render_provenace}/>
                                :
                                null
                            }
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default withRouter(Container)