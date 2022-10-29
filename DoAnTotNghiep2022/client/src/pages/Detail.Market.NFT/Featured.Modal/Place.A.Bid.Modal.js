import React from "react";
import { useSelector } from "react-redux";
import { Button, Col, Input, InputGroup, InputGroupText, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import Web3 from "web3";
import BinanceCoin from "../../../assets/image/BinanceCoin.png"

const PlaceABidModal = props => {
    const {
        isOpen,
        toggle,
        temp_bid_amount,
        setTempBidAmount,
        handlePlaceABid,
    } = props

    const detailMarketNFTSlice = useSelector(state => state.detailMarketNFTSlice)

    const buy_price = detailMarketNFTSlice?.buy_price
    const render_buy_price = buy_price ?  parseFloat(Web3.utils.fromWei(buy_price?.toString(), "ether")) : 0 
    const highest_bid_price = detailMarketNFTSlice?.highest_bid
    const render_highest_bid_price = highest_bid_price ?  parseFloat(Web3.utils.fromWei(highest_bid_price?.toString(), "ether")) : 0 

    const handleToggle = () => {
        toggle()
        setTempBidAmount("")
    }

    const is_can_place_a_bid = parseFloat(temp_bid_amount) > render_highest_bid_price && parseFloat(temp_bid_amount) < render_buy_price

    return(
        <Modal centered isOpen={isOpen} toggle={handleToggle} style={{color: "black"}}>
            <ModalHeader toggle={handleToggle}>
                Place a bid
            </ModalHeader>

            <ModalBody>
                <Row>
                    <Col>
                    <div className="detailMarketNFT__title modalComp">Price</div>
                    <div className="detailMarketNFT__value modalComp price"> 
                        <img
                            src={BinanceCoin}
                            alt=""
                        />
                    <div>{render_buy_price} BNB</div></div>
                    </Col>
                    <Col>
                        <div className="detailMarketNFT__title modalComp">
                            Highest bid 
                        </div>
                        <div className="detailMarketNFT__value modalComp price">
                            <img
                                src={BinanceCoin}
                                alt=""
                            />
                            <div>{render_highest_bid_price} BNB</div>
                        </div>
                    </Col>
                </Row>

                <Label>
                    Amount
                </Label>

                <InputGroup>
                    <InputGroupText>
                        BNB
                    </InputGroupText>
                    <Input
                        type="number"
                        value={temp_bid_amount}
                        onChange={e => setTempBidAmount(e.target.value)}
                        placeholder="Amount"
                    />
                </InputGroup>
            </ModalBody>

            <ModalFooter>
                <Button 
                    color={is_can_place_a_bid ? "warning" : "secondary"} 
                    outline={!is_can_place_a_bid}
                    disabled={!is_can_place_a_bid}
                    onClick={is_can_place_a_bid ? handlePlaceABid : () => {}}
                >
                    Place a bid
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default PlaceABidModal