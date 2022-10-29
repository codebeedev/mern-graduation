import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    is_loading: false
}

const provenanceSlice = createSlice({
    name: "provenance",
    initialState,
    reducers:{
        getProvenance: (state, action) => {
            return {
                is_loading: true,
            }
        },
        getProvenanceSuccess: (state, action) => {
            return {
                is_loading: false,
                data: action.payload
            }
        },
        getProvenanceFailure: (state, action) => {
            return {
                is_loading: false,
            }
        },
        cleanProvenance: (state, action) => {
            return {
                is_loading: false,
            }
        },
    }
})

export const { getProvenance, getProvenanceFailure, getProvenanceSuccess, cleanProvenance } = provenanceSlice.actions

export default provenanceSlice.reducer