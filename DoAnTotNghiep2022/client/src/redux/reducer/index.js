import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import axios from 'axios'

import bcAddressSlice from './bcAddressSlice'
import listNFTsByAddressSlice from "./listNFTsByAddressSlice"
import detailNFTSlice from './detailNFTSlice'
import listMarketNFTSlice from './listMarketNFTSlice'
import detailMarketNFTSlice from './detailMarketNFTSlice'
import bidHistorySlice from './bidHistorySlice'
import provenanceSlice from './provenanceSlice'
import infoSlice from './infoSlice'

const appReducer = combineReducers({
    bcAddressSlice,
    listNFTsByAddressSlice,
    detailNFTSlice,
    listMarketNFTSlice,
    detailMarketNFTSlice,
    bidHistorySlice,
    provenanceSlice,
    infoSlice,
})

const rootReducer = (state, action) => {
    if (action.type === 'CLEAN_STORE') {
        state = undefined
        storage.removeItem('persist:root')
        axios.defaults.headers.common.Authorization = ``;
    }

    return appReducer(state, action)
}
  
  export default rootReducer
