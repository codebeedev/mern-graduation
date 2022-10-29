import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    is_loading: false
}

const detailMarketNFTSlice = createSlice({
    name: "detailMarketNFT",
    initialState,
    reducers:{
        getDetailMarketNFT: (state, action) => {
            return {
                is_loading: true,
            }
        },
        getDetailMarketNFTSuccess: (state, action) => {
            return {
                is_loading: false,
                ...action.payload
            }
        },
        getDetailMarketNFTFailure: (state, action) => {
            return {
                is_loading: false,
            }
        },
        cleanDetailMarketNFT: (state, action) => {
            return {
                is_loading: false,
            }
        },
    }
})

export const { getDetailMarketNFT, getDetailMarketNFTFailure, getDetailMarketNFTSuccess, cleanDetailMarketNFT } = detailMarketNFTSlice.actions

export default detailMarketNFTSlice.reducer