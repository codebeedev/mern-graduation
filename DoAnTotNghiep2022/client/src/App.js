import React from "react";
import "./assets/styles/_index.scss"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom"
import Routes from "./routes/routes";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./configs/store";

const App = props => {
  return(
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Routes/>
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </div>
  )
}

export default App