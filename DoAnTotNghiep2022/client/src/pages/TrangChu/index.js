import React from "react";
import { useDispatch } from "react-redux";
import Error from "../../components/alert/Error";
import Warning from "../../components/alert/Warning";
import { getInfo } from "../../redux/reducer/infoSlice";
import Info from "./components/Info";
import Title from "./components/Title";
import "./index.scss"
import Mode from "./components/Mode"
import Upload from "./components/Upload"

const TrangChu = props => {

    const [current_home_mode, setCurrentHomeMode] = React.useState("publish")

    const [alert, setAlert] = React.useState(null)

    const setOnProcess = process => {
        const status = process?.status
        const title = process?.title

        if(status === "error") {
            setAlert(<Error
                title={title}
                onConfirm={() => setAlert(null)}
            />)
        }
        else if(status === "warning") {
            setAlert(<Warning
                title={title}
                onConfirm={() => setAlert(null)}
            />)
        }
    }

    const dispatch = useDispatch()

    const handleGetInfo = React.useCallback(() => {
        dispatch(getInfo())
    }, [dispatch])

    React.useEffect(() => {
        handleGetInfo()
    }, [handleGetInfo])

    return (
        <div className="trangChu">
            {alert}
            <Title/>

            <div className="container">
                <Mode
                    current_home_mode={current_home_mode}
                    setCurrentHomeMode={setCurrentHomeMode}
                />
                <Upload
                    current_home_mode={current_home_mode}
                    setOnProcess={setOnProcess}
                    setCurrentHomeMode={setCurrentHomeMode}
                />
            </div>


            <Info/>
        </div>
    )
}

export default TrangChu