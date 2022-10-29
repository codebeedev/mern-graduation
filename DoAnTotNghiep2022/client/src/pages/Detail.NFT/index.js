import React from "react"
import "./index.scss"
import { withRouter } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getDetailNFT, cleanDetailNFT } from "../../redux/reducer/detailNFTSlice"
import Loading from "../../components/alert/Loading"
import Error from "../../components/alert/Error";
import Success from "../../components/alert/Success";
import Comp1 from "./Comp1"
import Comp2 from "./Comp2"

const DetailNFT = props => {
    const {match} = props
    const dispatch = useDispatch()

    const detailNFTSlice = useSelector(state => state.detailNFTSlice)
    const bcAddressSlice = useSelector(state => state.bcAddressSlice)

    const [alert, setAlert] = React.useState(null)

    const setOnProcess = process => {
        const status = process?.status
        // const onConfirm = process?.onConfirm
        const title = process?.title
        const onConfirm = process?.onConfirm


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
    }

    const handleGetDetailNFT = React.useCallback(() => {
        const payload = {
            id: match?.params?.id
        }
        dispatch(getDetailNFT(payload))
    }, [match, dispatch])

    React.useEffect(() => {
        handleGetDetailNFT()

        return () => dispatch(cleanDetailNFT())
    }, [handleGetDetailNFT, dispatch])
    
    const handleSetLoading = React.useCallback(() => {
        if(detailNFTSlice?.is_loading){
            setOnProcess({status: "loading"})
        }
        else {
            setOnProcess({status: "close"})
        }
    }, [detailNFTSlice])

    React.useEffect(() => {
        handleSetLoading()
    }, [handleSetLoading])

    return(
        <div className="container detailNFT">
            {alert}
            {
                !detailNFTSlice?.is_loading && detailNFTSlice?.id && bcAddressSlice?.is_connected ?
                <>
                    <Comp1
                        setOnProcess={setOnProcess}
                    />

                    <Comp2
                    
                    />
                </>
                :
                null
            }
        </div>
    )
}

export default withRouter(DetailNFT)