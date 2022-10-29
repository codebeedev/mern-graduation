import { takeLatest, call, put } from 'redux-saga/effects'
import LINK_API from '../../constants/API'
import { getDetailMarketNFT, getDetailMarketNFTFailure, getDetailMarketNFTSuccess } from "../reducer/detailMarketNFTSlice"
import Axios from 'axios'

const fetchData = (id) => {
    return Axios({
        method: "GET",
        url: LINK_API.GET_DETAIL_MARKET_NFT + `${id ? `?id=${id}` : ""}`,
    })
}

function* fetchDetailMarketNFT (payload) {
    try {
        const id = payload?.payload?.id

        const response = yield call(fetchData, id)

        const data = response?.data

        yield put({type: getDetailMarketNFTSuccess().type, payload: data})

    } catch (error) {
        yield put({ type: getDetailMarketNFTFailure().type })
        
    }
}

const detailMarketNFTSaga = [
    takeLatest(getDetailMarketNFT().type, fetchDetailMarketNFT)
]

export default detailMarketNFTSaga
