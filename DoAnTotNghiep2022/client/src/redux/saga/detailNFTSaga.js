import { takeLatest, call, put } from 'redux-saga/effects'
import LINK_API from '../../constants/API'
import { getDetailNFT, getDetailNFTFailure, getDetailNFTSuccess } from "../reducer/detailNFTSlice"
import Axios from 'axios'

const fetchData = (id) => {
    return Axios({
        method: "GET",
        url: LINK_API.GET_DETAIL_NFT + `${id ? `?id=${id}` : ""}`,
    })
}

function* fetchDetailNFT (payload) {
    try {
        const id = payload?.payload?.id

        const response = yield call(fetchData, id)

        const data = response?.data

        yield put({type: getDetailNFTSuccess().type, payload: data})

    } catch (error) {
        yield put({ type: getDetailNFTFailure().type })
    }
}

const detailNFTSaga = [
    takeLatest(getDetailNFT().type, fetchDetailNFT)
]

export default detailNFTSaga
