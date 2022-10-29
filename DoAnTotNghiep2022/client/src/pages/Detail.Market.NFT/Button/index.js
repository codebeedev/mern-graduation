import React from "react"
import { useSelector } from "react-redux"
import { Col, Row } from "reactstrap"
import CheckBoldIcon from "mdi-react/CheckBoldIcon"
import PlaceABid from "./Place.A.Bid"
import Claim from "./Claim"

const Button = props => {
    const {temp_status, handleGetSignatureBuy, setOnProcess} = props

    const detailMarketNFTSlice = useSelector(state => state.detailMarketNFTSlice)
    const bcAddressSlice = useSelector(state => state.bcAddressSlice)

    const is_owning = detailMarketNFTSlice?.nft_info?.owner?.toString().toUpperCase() === bcAddressSlice?.data?.toString().toUpperCase()

    return(
        <Row className="detailMarketNFT__buttons">
            {
                is_owning ?
                <Col xl="6" lg="6" md="6" sm="6" xs="6" className="detailMarketNFT__buttons--col">
                    <div className="detailMarketNFT__buttons--owning"><CheckBoldIcon/> Owning</div>
                </Col>
                :
                temp_status === "INCOMING" ?
                <>
                    <Col xl="6" lg="6" md="6" sm="6" xs="6" className="detailMarketNFT__buttons--col">
                        <div className="detailMarketNFT__buttons--owning"><CheckBoldIcon/> Incoming</div>
                    </Col>
                </>
                :
                (temp_status === "ONSALE" && !detailMarketNFTSlice?.is_sold) ?
                <>
                    <Col xl="6" lg="6" md="6" sm="6" xs="6" className="detailMarketNFT__buttons--col">
                        <div className="detailMarketNFT__buttons--buyNow" onClick={handleGetSignatureBuy}>
                            Buy now
                        </div>
                    </Col>
                    {
                        detailMarketNFTSlice?.is_bid ?
                        <Col xl="6" lg="6" md="6" sm="6" xs="6" className="detailMarketNFT__buttons--col">
                            <PlaceABid
                                setOnProcess={setOnProcess}
                            />
                        </Col>
                        :
                        null
                    }
                </>
                :
                (temp_status === "ONSALE" && detailMarketNFTSlice?.is_sold) ?
                <>
                    <Col xl="6" lg="6" md="6" sm="6" xs="6" className="detailMarketNFT__buttons--col">
                        <div className="detailMarketNFT__buttons--owning"><CheckBoldIcon/> Sold</div>
                    </Col>
                </>
                :
                temp_status === "NOTFORSALE" ?
                <>
                    {
                        detailMarketNFTSlice?.is_sold ?
                        <>
                            <Col xl="6" lg="6" md="6" sm="6" xs="6" className="detailMarketNFT__buttons--col">
                                <div className="detailMarketNFT__buttons--owning"><CheckBoldIcon/> Sold</div>
                            </Col>
                        </>
                        :
                        <>
                            {
                                detailMarketNFTSlice?.highest_bidder?.toString().toUpperCase() ===  bcAddressSlice?.data?.toString().toUpperCase()?
                                <>
                                    <Col xl="6" lg="6" md="6" sm="6" xs="6" className="detailMarketNFT__buttons--col">
                                        <Claim
                                            setOnProcess={setOnProcess}
                                        />
                                    </Col>
                                </>
                                :
                                <>
                                    <Col xl="6" lg="6" md="6" sm="6" xs="6" className="detailMarketNFT__buttons--col">
                                        <div className="detailMarketNFT__buttons--owning"><CheckBoldIcon/> Not for sale</div>
                                    </Col>
                                </>
                            }
                        </>
                    }
                </>
                :
                null
            }
        </Row>
    )
}

export default Button