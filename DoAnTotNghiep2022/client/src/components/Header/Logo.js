import React from "react";
import { withRouter } from "react-router-dom";
import DigiposLogo01 from "../../assets/image/DigiposLogo01.png"

const Logo = props => {
    return(
        <div className="header__logo">
            <img
                src={DigiposLogo01}
                alt=""
            />
        </div>
    )
}

export default withRouter(Logo)