import { takeLatest, call, put } from 'redux-saga/effects'
import LINK_API from '../../constants/API'
import { getListMarketNFT, getListMarketNFTFailure, getListMarketNFTSuccess } from "../reducer/listMarketNFTSlice"
import Axios from 'axios'

const fetchData = () => {
    return Axios({
        method: "GET",
        url: LINK_API.GET_LIST_MARKET_NFT ,
    })
}

function* fetchListMarketNFT (payload) {
    try {

        const response = yield call(fetchData)

        const data = response?.data

        yield put({type: getListMarketNFTSuccess().type, payload: data})

    } catch (error) {
        yield put({ type: getListMarketNFTFailure().type })
        
    }
}

const listMarketNFTSaga = [
    takeLatest(getListMarketNFT().type, fetchListMarketNFT)
]

export default listMarketNFTSaga
