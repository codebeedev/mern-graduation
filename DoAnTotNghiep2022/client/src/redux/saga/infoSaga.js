import { takeLatest, call, put } from 'redux-saga/effects'
import LINK_API from '../../constants/API'
import { getInfo, getInfoFailure, getInfoSuccess } from "../reducer/infoSlice"
import Axios from 'axios'

const fetchData = () => {
    return Axios({
        method: "GET",
        url: LINK_API.GET_INFO ,
    })
}

function* fetchInfo (payload) {
    try {

        const response = yield call(fetchData)

        const data = response?.data

        yield put({type: getInfoSuccess().type, payload: data})

    } catch (error) {
        yield put({ type: getInfoFailure().type })
        
    }
}

const infoSaga = [
    takeLatest(getInfo().type, fetchInfo)
]

export default infoSaga
