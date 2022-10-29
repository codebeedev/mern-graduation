import React from "react";
import { useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import FileCheckIcon from "mdi-react/FileCheckIcon"
import ShieldCheckIcon from "mdi-react/ShieldCheckIcon"
import LinkBoxVariantIcon from "mdi-react/LinkBoxVariantIcon"

const Info = props => {
    
    const infoSlice = useSelector(state => state.infoSlice)

    console.log(infoSlice);

    return(
        <Row className="homeInfo">
            <Col className="homeInfo__col">
                <div>
                    <div>
                        <FileCheckIcon/>
                    </div>
                    <div>
                        <div>
                            Published Assets
                        </div>
                        <div className="value">
                            {infoSlice?.published_nft}
                        </div>
                    </div>
                </div>
            </Col>

            <Col className="homeInfo__col">
                <div>
                    <div>
                        <ShieldCheckIcon/>
                    </div>
                    <div>
                        <div>
                            Validations
                        </div>
                        <div className="value">
                            {infoSlice?.verified}
                        </div>
                    </div>
                </div>
            </Col>

            <Col className="homeInfo__col">
                <div>
                    <div>
                        <LinkBoxVariantIcon/>
                    </div>
                    <div>
                        <div>
                            Connected Addresses
                        </div>  
                        <div className="value">
                            {infoSlice?.connected_address}
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default Info