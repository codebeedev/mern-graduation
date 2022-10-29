import React from "react";
import { withRouter } from "react-router-dom";
import "./index.scss"
import { useDispatch, useSelector } from "react-redux";
import { getListNFTsByAddress, cleanListNFTsByAddress } from "../../redux/reducer/listNFTsByAddressSlice";
import List from "./List";

const Profile = props => {
    const dispatch = useDispatch()

    const bcAddressSlice = useSelector(state => state.bcAddressSlice)

    const handleGetListNFTsByAddress = React.useCallback(() => {
        if(bcAddressSlice?.data){
            const payload = {
                address: bcAddressSlice?.data
            }
            dispatch(getListNFTsByAddress(payload))
        }
        else {
            dispatch(cleanListNFTsByAddress())
        }
    }, [bcAddressSlice, dispatch])

    React.useEffect(() => {
        handleGetListNFTsByAddress()
    }, [handleGetListNFTsByAddress])

    return(
        <div className="profile container">
            <List/>
        </div>
    )
}

export default withRouter(Profile)