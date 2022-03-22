import { createSlice } from "@reduxjs/toolkit";

export const searchBookContextSlice = createSlice({
    name: 'pageCounter',
    initialState: {
        currentPage: 1
    },
    reducers: {
        searchIncreaseCount : (state)=>{
            state.currentPage++
        },
        searchDecreaseCount: (state)=>{
            if(state.currentPage>1){
                state.currentPage--
            }
            else{
                return state.currentPage
            }
        },
        searchResetCount:(state)=>{
            state.currentPage = 1
        },
    }
});

export const {searchIncreaseCount, searchDecreaseCount, searchResetCount} = searchBookContextSlice.actions;
export default searchBookContextSlice.reducer;