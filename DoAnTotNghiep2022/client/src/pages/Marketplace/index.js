import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import "./index.scss"
import { getListMarketNFT } from "../../redux/reducer/listMarketNFTSlice";
import Loading from "../../components/alert/Loading";
import Error from "../../components/alert/Error";
import Success from "../../components/alert/Success";
import List from "./List";

const Marketplace = props => {

    const dispatch = useDispatch()
    const listMarketNFTSlice = useSelector(state => state.listMarketNFTSlice)
    
    const [alert, setAlert] = React.useState(null)

    const setOnProcess = process => {
        const status = process?.status
        // const onConfirm = process?.onConfirm
        const title = process?.title

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
                onConfirm={() => setAlert(null)}
                title={title}
            />)
        }
    }

    const handleGetListMarketNFT = React.useCallback(() => {
        dispatch(getListMarketNFT())
    }, [dispatch])

    React.useEffect(() => {
        handleGetListMarketNFT()
    }, [handleGetListMarketNFT])

    const handleSetLoading = React.useCallback(() => {
        if(listMarketNFTSlice?.is_loading){
            setOnProcess({status: "loading"})
        }
        else {
            setOnProcess({status: "close"})
        }
    }, [listMarketNFTSlice])

    React.useEffect(() => {
        handleSetLoading()
    }, [handleSetLoading])

    return(
        <div className="marketplace container">
            {alert}
            <List/>
        </div>
    )
}

export default withRouter(Marketplace)