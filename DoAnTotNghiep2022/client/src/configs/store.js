import reducer from '../redux/reducer'
import { persistReducer, persistStore ,} from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../redux/saga'

import {configureStore } from "@reduxjs/toolkit"

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2,
  timeout: null
}

const pReducer = persistReducer(persistConfig, reducer)

const sagaMiddleware = createSagaMiddleware({
  onError: () => { 
  }
})

const middleWare = [
  sagaMiddleware
]

const store = configureStore({reducer: pReducer, middleware: middleWare})
const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)

export { store, persistor }
