import { takeLatest, call, put } from 'redux-saga/effects'
import LINK_API from '../../constants/API'
import { getBidHistory, getBidHistoryFailure, getBidHistorySuccess } from "../reducer/bidHistorySlice"
import Axios from 'axios'

const fetchData = (temp_payload) => {
    return Axios({
        method: "GET",
        url: LINK_API.GET_BID_HISTORY + `?id=${temp_payload?.id}` ,
    })
}

function* fetchBidHistory (payload) {
    try {
        const temp_payload = payload?.payload

        const response = yield call(fetchData, temp_payload)

        const data = response?.data

        yield put({type: getBidHistorySuccess().type, payload: data})

    } catch (error) {
        yield put({ type: getBidHistoryFailure().type })
        
    }
}

const bidHistorySaga = [
    takeLatest(getBidHistory().type, fetchBidHistory)
]

export default bidHistorySaga
