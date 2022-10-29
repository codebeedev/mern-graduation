import axios from "axios"
import React from "react"
import { withRouter } from "react-router-dom"
import LINK_API from "../../constants/API"
import "./index.scss"
import Product from "./components/Product"
import Info from "./components/Info"
import { useDispatch, useSelector } from "react-redux"
import { getProvenance } from "../../redux/reducer/provenanceSlice";
import Provenance from "../../components/Provenance"

const Verify = props => {
    const {
        match,
    } = props 

    const [render_nft, setRenderNFT] = React.useState("")

    const handleGetInfo = React.useCallback(() => {
        axios({
            method: "GET",
            url: LINK_API.GET_VERIFY_INFO,
            params: {
                "asset_uri": `https://ipfs.infura.io/ipfs/${match?.params?.cid}`,
                "asset_hash": match?.params?.asset_hash,
            }
        })
        .then(res => {
            setRenderNFT(res?.data);
        })
        .catch(error => {

        })
    }, [match?.params])

    React.useEffect(() => {
        handleGetInfo()
    }, [handleGetInfo])

    const provenanceSlice = useSelector(state => state.provenanceSlice)
    const dispatch = useDispatch()

    const handleGetProvenance = React.useCallback(() => {
        const payload = {
            nft_id: render_nft?.id
        }
        if(render_nft?.id) {
            dispatch(getProvenance(payload))
        }
    }, [render_nft?.id, dispatch])

    React.useEffect(() => {
        handleGetProvenance()
    }, [handleGetProvenance])

    const render_provenace = provenanceSlice?.data

    return(
        <div className="verify container">
            {
                render_nft ?
                <>
                    <Product render_nft={render_nft} />

                    <Info render_nft={render_nft} />

                    <div className="verify__provenance normal-scrollbar">
                        <Provenance
                            render_provenace={render_provenace}
                        />
                    </div>
                </>
                :
                <>
                    Không tìm thấy dữ liệu
                </>
            }
        </div>
    )
}

export default withRouter(Verify)