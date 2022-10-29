import React from "react";
import { withRouter } from "react-router-dom";
import "./index.scss"
import Logo from "./Logo";
import Menu from "./Menu";
import ConnectMetaMask from "./Connect.MetaMask/index";
import Loading from "../alert/Loading"
import Error from "../alert/Error";
import Success from "../alert/Success";

const Header = props => {

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

    return(
        <div className="header">
            {
                alert ?
                <div
                    style={{
                        position: "fixed",
                        top: "0", left: "0",
                        width: "100vw", height: "100vh"  , zIndex: "10"
                    }}
                >
                    {alert}
                </div>
                :
                null
            }
            <div className="container header__container">
                <Logo/>
                <Menu/>
                <ConnectMetaMask
                    setOnProcess={setOnProcess}
                />
            </div>
        </div>
    )
}

export default withRouter(Header)