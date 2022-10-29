import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    is_connected: false,
    data: ""
}

const bcAddressSlice = createSlice({
    name: "bcAddress",
    initialState,
    reducers:{
        saveBcAddress: (state, action) => {
            return {
                is_connected: true,
                data: action.payload
            }
        },
        cleanBcAddress: (state, action) => {
            return {
                is_connected: false,
                data: ""
            }
        }
    }
})

export const { cleanBcAddress, saveBcAddress } = bcAddressSlice.actions

export default bcAddressSlice.reducer