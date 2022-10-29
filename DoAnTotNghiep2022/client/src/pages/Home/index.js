import React from "react";
import "./index.scss"
import Title from "./components/Title";
import Mode from "./components/Mode";
import Upload from "./components/Upload";
import Error from "../../components/alert/Error"
import Warning from "../../components/alert/Warning"
import { useDispatch } from "react-redux";
import { getInfo } from "../../redux/reducer/infoSlice";
import Info from "./Info";

const Home = props => {

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

    return(
        <div className="home container">
            {alert}
            <Title/>
            <Mode
                current_home_mode={current_home_mode}
                setCurrentHomeMode={setCurrentHomeMode}
            />
            <Upload
                current_home_mode={current_home_mode}
                setOnProcess={setOnProcess}
                setCurrentHomeMode={setCurrentHomeMode}
            />
            <Info/>
        </div>
    )
}

export default Home