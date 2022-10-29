import React from "react";
import "./index.scss"

const SuspenseComponent = props => {
    return(
        <div className="suspenseComponent">
            <div>
                <h1>Loading</h1>
            </div>
        </div>
    )
}

export default SuspenseComponent