import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    is_loading: false
}

const infoSlice = createSlice({
    name: "info",
    initialState,
    reducers:{
        getInfo: (state, action) => {
            return {
                is_loading: true,
            }
        },
        getInfoSuccess: (state, action) => {
            return {
                is_loading: false,
                ...action.payload
            }
        },
        getInfoFailure: (state, action) => {
            return {
                is_loading: false,
            }
        },
        cleanInfo: (state, action) => {
            return {
                is_loading: false,
            }
        },
    }
})

export const { getInfo, getInfoFailure, getInfoSuccess, cleanInfo } = infoSlice.actions

export default infoSlice.reducer