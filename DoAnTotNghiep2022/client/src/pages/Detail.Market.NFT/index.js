import React from "react";
import { withRouter } from "react-router-dom";
import "./index.scss"
import { useDispatch, useSelector } from "react-redux"
import { getDetailMarketNFT, cleanDetailMarketNFT } from "../../redux/reducer/detailMarketNFTSlice"
import Loading from "../../components/alert/Loading"
import Error from "../../components/alert/Error";
import Success from "../../components/alert/Success";
import Container from "./Container";
import Confirm from "../../components/alert/Confirm";
import {getBidHistory} from "../../redux/reducer/bidHistorySlice";
import { getProvenance } from "../../redux/reducer/provenanceSlice";

const DetailMarketNFT = props => {

    const {match} = props
    const dispatch = useDispatch()

    const detailMarketNFTSlice = useSelector(state => state.detailMarketNFTSlice)
    const provenanceSlice = useSelector(state => state.provenanceSlice)

    const [alert, setAlert] = React.useState(null)

    const setOnProcess = process => {
        const status = process?.status
        const title = process?.title
        const onConfirm = process?.onConfirm
        // const onCancel = process?.onCancel
        const subTitle = process?.subTitle

        if(status === "loading") {
            setAlert(<Loading/>)
        }
        if(status === "error") {
            setAlert(<Error
                onConfirm={() => setAlert(null)}
                title={title}
            />)
        }
        if(status === "close") {
            setAlert(null)
        }
        if(status === "success") {
            setAlert(<Success
                onConfirm={onConfirm ? onConfirm : () => setAlert(null)}
                title={title}
            />)
        }
        if(status === "confirm") {
            setAlert(<Confirm
                title={title}
                onConfirm={() => onConfirm()}
                onCancel={() => setAlert(null)}
                subTitle={subTitle}
            />)
        }
    }

    const handleGetDetailMarketNFT = React.useCallback(() => {
        const payload = {
            id: match?.params?.id
        }
        dispatch(getDetailMarketNFT(payload))
    }, [match, dispatch])

    React.useEffect(() => {
        handleGetDetailMarketNFT()

        return () => dispatch(cleanDetailMarketNFT())
    }, [handleGetDetailMarketNFT, dispatch])
    
    const handleSetLoading = React.useCallback(() => {
        if(detailMarketNFTSlice?.is_loading){
            setOnProcess({status: "loading"})
        }
        else {
            setOnProcess({status: "close"})
        }
    }, [detailMarketNFTSlice])

    React.useEffect(() => {
        handleSetLoading()
    }, [handleSetLoading])

    const handleGetBidHistory = React.useCallback(() => {
        if(detailMarketNFTSlice?.id){
            const payload = {
                id: detailMarketNFTSlice?.id
            }
            dispatch(getBidHistory(payload))
        }
    }, [detailMarketNFTSlice?.id, dispatch])

    React.useEffect(() => {
        handleGetBidHistory()
    }, [handleGetBidHistory])

    const handleGetProvenance = React.useCallback(() => {
        const payload = {
            nft_id: detailMarketNFTSlice?.nft_id
        }
        if(detailMarketNFTSlice?.nft_id) {
            dispatch(getProvenance(payload))
        }
    }, [detailMarketNFTSlice?.nft_id, dispatch])

    React.useEffect(() => {
        handleGetProvenance()
    }, [handleGetProvenance])

    const render_provenace = provenanceSlice?.data

    return(
        <div className="container detailMarketNFT">
            {alert}
            {
                detailMarketNFTSlice?.id ?
                <Container setOnProcess={setOnProcess} render_provenace={render_provenace} />
                : null
            }
        </div>
    )
}

export default withRouter(DetailMarketNFT)