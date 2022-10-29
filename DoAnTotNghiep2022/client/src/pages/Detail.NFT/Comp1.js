import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Collapse, Input, InputGroup, InputGroupText, Label, Row, UncontrolledCollapse } from "reactstrap";
import { ColorExtractor } from "react-color-extractor"
import CheckBoldIcon from "mdi-react/CheckBoldIcon"
import CloseThickIcon from "mdi-react/CloseThickIcon"
import UploadOutlineIcon from "mdi-react/UploadOutlineIcon"
import generateTimeRangeConfig from "../../constants/timeConfig";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import moment from "moment";
import getMessage from "./utils/getMessage"
import Web3 from "web3";
import listNFT from "./utils/listNFT";
import { getDetailNFT } from "../../redux/reducer/detailNFTSlice";
import Revoke from "./components/Revoke";
import RedirectComp from "../../components/RedirectComp";

const Comp1 = props => {
    const {setOnProcess} = props

    const dispatch = useDispatch()

    const [startBgImgColor, setStartBgImgColor] = React.useState("")
    const [endBgImgColor, setEndBgImgColor] = React.useState("")

    const setBgImg = (e) => {
        setStartBgImgColor(e[0])
        setEndBgImgColor(e[e.length - 1])
    } 

    const detailNFTSlice = useSelector(state => state.detailNFTSlice)
    const bcAddressSlice = useSelector(state => state.bcAddressSlice)

    const keyRef = React.useRef(Date.now());

    const [listingDuration, setListingDuration] = React.useState({
        startDate: moment().startOf("minutes").toDate().valueOf(),
        endDate: moment().add(7, "days").startOf("minutes").toDate().valueOf(),
    });

    const [is_activate_timed_auction, setIsActivateTimedAuction] = React.useState(false)

    const handleApply = (event, picker) => {
        if (event.type !== "cancel") {
          setListingDuration({
            startDate: picker.startDate.valueOf(),
            endDate: picker.endDate.valueOf(),
          });
        }
    };

    const [fixed_price, setFixedPrice] = React.useState("")
    const [start_price, setStartPrice] = React.useState("")

    const hanldeListNFT = async () => {
        if(fixed_price){
            setOnProcess({status: "loading"})
            const temp_bid_message = is_activate_timed_auction ?
            {
                start_price: Web3.utils.toWei(start_price?.toString(), "ether").toString(),
                highest_bid: Web3.utils.toWei(start_price?.toString(), "ether").toString(),
                highest_bidder: ""
            } : ""
            const body_get_message = {
                nft_id: detailNFTSlice?.id,
                seller: bcAddressSlice?.data,
                start_time: listingDuration?.startDate,
                end_time: listingDuration?.endDate,
                buy_price: Web3.utils.toWei(fixed_price?.toString(), "ether").toString(),
                is_bid: is_activate_timed_auction,
                ...temp_bid_message,
            }
            const get_message_result = await getMessage(body_get_message, bcAddressSlice)

            if(get_message_result?.success){
                const body_list_nft = {
                    ...body_get_message,
                    list_signature: get_message_result?.data,
                    message: get_message_result?.message
                }
                const list_nft_result = await listNFT(body_list_nft)

                if(list_nft_result?.success) {
                    const payload = {
                        id: detailNFTSlice?.id
                    }
                    dispatch(getDetailNFT(payload))
                    setOnProcess({status: "success", title: "Đăng lên sàn thành công"})
                }
                else {
                    setOnProcess({status: "error", title: "Đăng lên sàn thất bại"})
                }

            }
            else {
                setOnProcess({status: "error", title: "Đăng lên sàn thất bại"})
            }
        }
        else {
            setOnProcess({status: "error", title: "Vui lòng điền giá"})
        }
    }

    return(
        detailNFTSlice?.id ?
        <div className="detailNFT__comp1">
            <Row>
                <Col>
                    <ColorExtractor getColors={e => {setBgImg(e)}}>
                        <img
                            src={detailNFTSlice?.asset_uri}
                            alt=""
                            className="detailNFT__comp1--image"
                            style={{backgroundImage: `linear-gradient(60deg, ${startBgImgColor} 0%, ${endBgImgColor} 100%)`,}}
                        />
                    </ColorExtractor >
                </Col>

                <Col>
                    <div className="detailNFT__comp1--name">
                        {detailNFTSlice?.name}
                    </div>

                    <RedirectComp
                        asset_uri={detailNFTSlice?.asset_uri}
                        json_uri={detailNFTSlice?.json_uri}
                        certificate_uri={detailNFTSlice?.certificate_uri}
                    />
                    <div className={
                        `
                            detailNFT__comp1--isMarket
                            ${detailNFTSlice?.is_market ? "is_market" : ""}
                        `
                    }>
                         {detailNFTSlice?.is_market ? "Đang trên sàn" : "Chưa lên sàn"}
                        {detailNFTSlice?.is_market ? <CheckBoldIcon/> : <CloseThickIcon/>}
                    </div>

                    <div className="detailNFT__comp1--btns">
                        {!detailNFTSlice?.is_market ?
                            <div id="list-nft">
                                <UploadOutlineIcon/> Đăng lên sàn
                            </div> 
                        :
                        <Revoke
                            setOnProcess={setOnProcess}
                        />
                        }
                    </div>
                </Col>
            </Row>

            {
                !detailNFTSlice?.is_market? 
                <UncontrolledCollapse toggler="list-nft">
                    <div className="detailNFT__comp1--listNFT">
                        <Row>
                            <Col>
                                <Label>
                                    Thời gian diễn ra
                                </Label>
                                <DateRangePicker
                                    key={keyRef.current}
                                    initialSettings={{
                                    ...generateTimeRangeConfig()
                                    }}
                                    onEvent={handleApply}
                                    alwaysShowCalendars={true}
                                    autoApply={false}   
                                    className="ok"
                                >
                                <input type="text" className="form-control" readOnly />
                                </DateRangePicker>

                                <br/>
                                <Input
                                    type="checkbox"
                                    style={{marginRight: "5px"}}
                                    checked={is_activate_timed_auction}
                                    onChange={() => setIsActivateTimedAuction(!is_activate_timed_auction)}
                                />
                                <Label onClick={() => setIsActivateTimedAuction(!is_activate_timed_auction)} check >Kích hoạt đấu giá</Label>
                            </Col>

                            <Col>
                                <Label>
                                    Giá
                                </Label>
                                <InputGroup>
                                    <InputGroupText>
                                        BNB
                                    </InputGroupText>
                                    <Input
                                        placeholder="Giá"
                                        value={fixed_price}
                                        onChange={e => {
                                            setFixedPrice(e.target.value)
                                        }}
                                    />
                                </InputGroup>
                                <Collapse isOpen={is_activate_timed_auction} >
                                    <div style={{marginTop: "10px"}}>
                                        <Label>
                                            Giá sàn
                                        </Label>
                                        <InputGroup>
                                            <InputGroupText>
                                                BNB
                                            </InputGroupText>
                                            <Input
                                                placeholder="Giá sàn"
                                                onChange={e => setStartPrice(e.target.value)}
                                                value={start_price}
                                            />
                                        </InputGroup>
                                    </div>
                                </Collapse>

                                <div className="detailNFT__comp1--btns" style={{marginTop: "15px"}}>
                                    <div onClick={hanldeListNFT}>
                                        <UploadOutlineIcon/>
                                        Đăng lên sàn
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </UncontrolledCollapse>
                :
                null
            }

            
        </div>
        :
        <div>
            ok
        </div>
    )
}

export default Comp1