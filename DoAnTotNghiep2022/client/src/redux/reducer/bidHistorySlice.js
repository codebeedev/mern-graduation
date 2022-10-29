import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    is_loading: false
}

const bidHistorySlice = createSlice({
    name: "bidHistory",
    initialState,
    reducers:{
        getBidHistory: (state, action) => {
            return {
                is_loading: true,
            }
        },
        getBidHistorySuccess: (state, action) => {
            return {
                is_loading: false,
                data: action.payload
            }
        },
        getBidHistoryFailure: (state, action) => {
            return {
                is_loading: false,
            }
        },
        cleanBidHistory: (state, action) => {
            return {
                is_loading: false,
            }
        },
    }
})

export const { getBidHistory, getBidHistoryFailure, getBidHistorySuccess, cleanBidHistory } = bidHistorySlice.actions

export default bidHistorySlice.reducer