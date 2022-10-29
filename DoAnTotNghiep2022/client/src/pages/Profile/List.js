import React from "react";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import CheckBoldIcon from "mdi-react/CheckBoldIcon"
import CloseThickIcon from "mdi-react/CloseThickIcon"
import NoDataFound from "../../components/NoDataFound";

const List = props => {
    const {history} = props

    const listNFTsByAddressSlice = useSelector(state => state.listNFTsByAddressSlice)

    return(
        <div className="profile__listNFT">
            <Row>
                {
                    listNFTsByAddressSlice?.data && listNFTsByAddressSlice?.data?.length > 0 ?
                    listNFTsByAddressSlice?.data?.map((nft, index) => {
                        return(
                            <Col
                                key={index}
                                xl="3" lg="4" md="6" sm="12" xs="12"
                                style={{display: "flex", padding: "5px 15px"}}
                            >
                               
                                <div
                                    className="profile__listNFT--item"
                                    onClick={() => {
                                        history.push(`/detail-nft/${nft?.id}`)
                                    }}
                                >
                                    <div className="image">
                                        <div className="render-image">
                                            <img
                                                src={nft?.asset_uri}
                                                alt=""
                                            />
                                        </div>
                                    </div>

                                    <div className="profile__listNFT--info">
                                        <div className="profile__listNFT--name">{nft?.name}</div>
                                        <div
                                            className={`
                                                profile__listNFT--market
                                                ${nft?.is_market ? "is_market" : ""}
                                            `}
                                        >
                                            {nft?.is_market ? "Đang trên sàn" : "Chưa lên sàn"}
                                            {nft?.is_market ? <CheckBoldIcon/> : <CloseThickIcon/>}
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        )
                    })
                    :
                    <NoDataFound/>
                }
            </Row>
        </div>
    )
}

export default withRouter(List)