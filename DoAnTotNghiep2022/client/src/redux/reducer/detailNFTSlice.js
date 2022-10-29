import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    is_loading: false
}

const detailNFTSlice = createSlice({
    name: "detailNFT",
    initialState,
    reducers:{
        getDetailNFT: (state, action) => {
            return {
                is_loading: true,
            }
        },
        getDetailNFTSuccess: (state, action) => {
            return {
                is_loading: false,
                ...action.payload
            }
        },
        getDetailNFTFailure: (state, action) => {
            return {
                is_loading: false,
            }
        },
        cleanDetailNFT: (state, action) => {
            return {
                is_loading: false,
            }
        },
    }
})

export const { getDetailNFT, getDetailNFTFailure, getDetailNFTSuccess, cleanDetailNFT } = detailNFTSlice.actions

export default detailNFTSlice.reducer