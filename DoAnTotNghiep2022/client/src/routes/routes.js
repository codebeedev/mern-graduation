import React, { Suspense } from "react";
import { Switch, Redirect, Route, withRouter } from "react-router";
import SuspenseComponent from "../components/Suspense.Component";
import MainRoutes from "./main.routes";
import NormalRoutes from "./normal.routes";
import Header from "../components/Header";
import Loading from "../components/alert/Loading";
import Error from "../components/alert/Error";
import Success from "../components/alert/Success"
import { cleanBcAddress } from "../redux/reducer/bcAddressSlice";
import { useDispatch } from "react-redux";

const Routes = props => {

    const dispatch = useDispatch()

    React.useEffect(() => {
        return () => {
            dispatch(cleanBcAddress())
        }
    }, [dispatch])

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
        <Suspense fallback={<SuspenseComponent/>}>
            {alert}
            <Switch>
                <Redirect exact from="/" to="/home"></Redirect>
                {
                    MainRoutes.map((page, index) => {
                        const Component = page.component
                        return(
                            <Route path={page.path} key={index} >
                                <Header setOnProcess={setOnProcess}/>
                                <div
                                    style={{
                                        paddingTop: "70px"
                                    }}
                                >
                                    <Route path={`${page.path}`} component={() => <Component setOnProcess={setOnProcess}/>}></Route>
                                </div>
                            </Route>
                        )
                    })
                }
                {
                    NormalRoutes.map((page, index) => {
                        const Component = page.component
                        return(
                            <Route path={page.path} key={index} >
                                <div>
                                    <Route path={`${page.path}`} component={() => <Component setOnProcess={setOnProcess}/>}></Route>
                                </div>
                            </Route>
                        )
                    })
                }
                <Route render={() => <Redirect to="/home" />} />
            </Switch>

        </Suspense>
    )
}

export default withRouter(Routes)