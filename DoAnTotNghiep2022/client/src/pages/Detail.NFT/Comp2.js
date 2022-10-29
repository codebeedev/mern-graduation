import React from "react";
import { Col, Collapse, Row } from "reactstrap";
import ChevronDownIcon from "mdi-react/ChevronDownIcon"
import Provenance from "../../components/Provenance";
import { getProvenance } from "../../redux/reducer/provenanceSlice";
import { useDispatch, useSelector } from "react-redux";

const Comp2 = props => {

    const [is_open_collapse, setIsOpenCollapse] = React.useState(false)

    const detailNFTSlice = useSelector(state => state.detailNFTSlice)
    const provenanceSlice = useSelector(state => state.provenanceSlice)

    const dispatch = useDispatch()

    const handleGetProvenance = React.useCallback(() => {
        const payload = {
            nft_id: detailNFTSlice?.id
        }
        if(detailNFTSlice?.id) {
            dispatch(getProvenance(payload))
        }
    }, [detailNFTSlice?.id, dispatch])

    React.useEffect(() => {
        handleGetProvenance()
    }, [handleGetProvenance])

    const render_provenace = provenanceSlice?.data

    return(
        <div className="detailNFT__comp2">
            <Row>
                <Col xl="6" lg="6" md="12" sm="12" xs="12" >
                    <div className="detailNFT__provenance">
                        <div className="detailNFT__provenance--title">
                            <div className="title">
                                Nguồn gốc
                            </div>
                            <div 
                                className={
                                    `
                                        detailNFT__provenance--chev
                                        ${is_open_collapse ? "open" : ""}
                                    `
                                } 
                                onClick={() => setIsOpenCollapse(!is_open_collapse)}
                            >
                                <ChevronDownIcon/>
                            </div>
                        </div>
                        <hr/>
                        <Collapse isOpen={is_open_collapse}>
                            <Provenance
                                render_provenace={render_provenace? render_provenace : []}
                            />
                        </Collapse>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Comp2