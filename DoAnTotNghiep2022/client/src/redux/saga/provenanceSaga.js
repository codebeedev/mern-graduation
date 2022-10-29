import { takeLatest, call, put } from 'redux-saga/effects'
import LINK_API from '../../constants/API'
import { getProvenance, getProvenanceFailure, getProvenanceSuccess } from "../reducer/provenanceSlice"
import Axios from 'axios'

const fetchData = (nft_id) => {
    return Axios({
        method: "GET",
        url: LINK_API.GET_PROVENANCE,
        params: {
            nft_id
        }
    })
}

function* fetchProvenance (payload) {
    try {
        const nft_id = payload?.payload?.nft_id

        const response = yield call(fetchData, nft_id)

        const data = response?.data

        yield put({type: getProvenanceSuccess().type, payload: data})

    } catch (error) {
        yield put({ type: getProvenanceFailure().type })
    }
}

const provenanceSaga = [
    takeLatest(getProvenance().type, fetchProvenance)
]

export default provenanceSaga
