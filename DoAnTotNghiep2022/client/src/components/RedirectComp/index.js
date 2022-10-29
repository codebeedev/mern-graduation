import React from "react";
import "./index.scss"
import EarthIcon from "mdi-react/EarthIcon"
import ArrowTopRightIcon from "mdi-react/ArrowTopRightIcon"
import CertificateIcon from "mdi-react/CertificateIcon"

const RedirectComp = props => {
    const {
        asset_uri,
        json_uri,
        certificate_uri,
    } = props

    return(
        <div className="redirectComp">
            <div className="earth"
                onClick={() => {
                    window.open(asset_uri, "_blank")
                }}
            >
                <EarthIcon/>
            </div>
            <div className="certi"
                onClick={() => {
                    window.open(certificate_uri, "_blank")
                }}
            >
                <CertificateIcon/>
            </div>
            <div className="arrow"
                onClick={() => {
                    window.open(json_uri, "_blank")
                }}
            >
                <ArrowTopRightIcon/>
            </div>
        </div>
    )
}

export default RedirectComp