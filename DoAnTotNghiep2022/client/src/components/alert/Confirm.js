import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { Button } from "reactstrap";

const Confirm = props => {
    const {
        title,
        subTitle,
        onCancel,
        onConfirm
    } = props

    return(
        <SweetAlert
            info
            title={""}
            onConfirm={() => {}}
            showConfirm={false}
            style={{color: "black"}}
        >
            <p>
                <h1>
                    {title ? title : "Are you sure?"}
                </h1>
            </p>

            {
                subTitle ? 
                <p style={{color: "gray"}}>
                    {subTitle ? subTitle : "asdfa asdfasd"}
                </p>
                :
                null
            }

            <div>
                <Button
                    color="danger"
                    outline
                    style={{marginRight: "20px"}}
                    onClick={onCancel ? onCancel : () => {}}
                >
                    Cancel
                </Button>

                <Button
                    color="success"
                    outline
                    onClick={onConfirm ? onConfirm : () => {}}
                >
                    Confirm
                </Button>
            </div>

        </SweetAlert>
    )
}

export default Confirm