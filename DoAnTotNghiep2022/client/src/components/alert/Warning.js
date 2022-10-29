import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { Button } from "reactstrap";
import "./style.scss"

const Warning = props => {
    const {
        onConfirm,
        title
    } = props
    return(
        <SweetAlert
            info
            onConfirm={() => {}}
            title=""
            showConfirm={false}
        >
            <div className="alert__mainTitle">
                {title ? title : "Failure"}
            </div>
            <div className="alert__btn">
                <Button
                    onClick={onConfirm ? onConfirm : null}
                    color="info"
                    outline
                >
                    Confirm
                </Button>
            </div>
        </SweetAlert>
    )
}

export default Warning