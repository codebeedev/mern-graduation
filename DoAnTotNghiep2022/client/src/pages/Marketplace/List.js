import React from "react";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import Item from "./Item";
import NoDataFound from "../../components/NoDataFound";
// import CheckBoldIcon from "mdi-react/CheckBoldIcon"
// import CloseThickIcon from "mdi-react/CloseThickIcon"

const List = props => {
    // const {history} = props

    const listMarketNFTSlice = useSelector(state => state.listMarketNFTSlice)

    return(
        <div className="marketplace__listNFT">
            <Row>
                {
                    listMarketNFTSlice?.data && listMarketNFTSlice?.data?.length > 0 ?
                    listMarketNFTSlice?.data?.map((nft, index) => {
                        return(
                            <Col
                                key={index}
                                xl="3" lg="4" md="6" sm="12" xs="12"
                                style={{display: "flex", padding: "5px 15px"}}
                            >
                                <Item
                                    nft={nft}
                                />
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