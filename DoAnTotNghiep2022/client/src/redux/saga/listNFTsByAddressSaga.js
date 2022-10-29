import { takeLatest, call, put } from 'redux-saga/effects'
import LINK_API from '../../constants/API'
import { getListNFTsByAddress, getListNFTsByAddressFailure, getListNFTsByAddressSuccess } from "../reducer/listNFTsByAddressSlice"
import Axios from 'axios'

const fetchData = (address) => {
    return Axios({
        method: "GET",
        url: LINK_API.LIST_NFT_BY_ADDRESS + `${address ? `?address=${address}` : ""}`,
    })
}

function* fetchListNFTsByAddress (payload) {
    try {
        const address = payload?.payload?.address

        const response = yield call(fetchData, address)

        const data = response?.data?.data

        yield put({type: getListNFTsByAddressSuccess().type, payload: data})

    } catch (error) {
        yield put({ type: getListNFTsByAddressFailure().type })
        
    }
}

const listNFTsByAddressSaga = [
    takeLatest(getListNFTsByAddress().type, fetchListNFTsByAddress)
]

export default listNFTsByAddressSaga
