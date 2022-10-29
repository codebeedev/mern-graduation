import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { Button } from "reactstrap";
import "./style.scss"

const Success = props => {
    const {
        onConfirm,
        title
    } = props
    return(
        <SweetAlert
            success
            onConfirm={() => {}}
            title=""
            showConfirm={false}
        >
            <div className="alert__mainTitle">
                {title ? title : "Success"}
            </div>
            <div className="alert__btn">
                <Button
                    onClick={onConfirm ? onConfirm : null}
                    color="success"
                    outline
                >
                    Confirm
                </Button>
            </div>
        </SweetAlert>
    )
}

export default Success