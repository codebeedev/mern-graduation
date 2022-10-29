import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import "./style.scss"

const Loading = props => {
    return(
        <SweetAlert
            onConfirm={() => {}}
            title=""
            showConfirm={false}
        >
            <div className="lds-hourglass"/>
            <div className="alert__mainTitle">
                Processing
            </div>
            <div className="alert__subTitle">
                Please wait a minute ...
            </div>
        </SweetAlert>
    )
}

export default Loading