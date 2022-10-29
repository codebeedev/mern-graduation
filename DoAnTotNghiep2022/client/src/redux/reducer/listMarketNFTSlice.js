import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    is_loading: false
}

const listMarketNFTSlice = createSlice({
    name: "listMarketNFT",
    initialState,
    reducers:{
        getListMarketNFT: (state, action) => {
            return {
                is_loading: true,
            }
        },
        getListMarketNFTSuccess: (state, action) => {
            return {
                is_loading: false,
                data: action.payload
            }
        },
        getListMarketNFTFailure: (state, action) => {
            return {
                is_loading: false,
            }
        },
        cleanListMarketNFT: (state, action) => {
            return {
                is_loading: false,
            }
        },
    }
})

export const { getListMarketNFT, getListMarketNFTFailure, getListMarketNFTSuccess, cleanListMarketNFT } = listMarketNFTSlice.actions

export default listMarketNFTSlice.reducer