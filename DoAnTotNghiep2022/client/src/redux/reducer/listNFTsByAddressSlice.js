import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    is_loading: false
}

const listNFTsByAddressSlice = createSlice({
    name: "listNFTsByAddress",
    initialState,
    reducers:{
        getListNFTsByAddress: (state, action) => {
            return {
                is_loading: true,
            }
        },
        getListNFTsByAddressSuccess: (state, action) => {
            return {
                is_loading: false,
                data: action.payload
            }
        },
        getListNFTsByAddressFailure: (state, action) => {
            return {
                is_loading: false,
            }
        },
        cleanListNFTsByAddress: (state, action) => {
            return {
                is_loading: false,
            }
        },
    }
})

export const { getListNFTsByAddress, getListNFTsByAddressFailure, getListNFTsByAddressSuccess, cleanListNFTsByAddress } = listNFTsByAddressSlice.actions

export default listNFTsByAddressSlice.reducer