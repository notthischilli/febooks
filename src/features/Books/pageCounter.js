import { createSlice } from "@reduxjs/toolkit";

export const pageCounterSlice = createSlice({
    name: 'pageCounter',
    initialState: {
        currentPage: 1
    },
    reducers: {
        increaseCount : (state)=>{
            state.currentPage++
        },
        decreaseCount: (state)=>{
            if(state.currentPage>1){
                state.currentPage--
            }
            else{
                return state.currentPage
            }
        },
        resetCount:(state)=>{
            state.currentPage = 1
        }
    }
});

export const {increaseCount, decreaseCount, resetCount} = pageCounterSlice.actions;
export default pageCounterSlice.reducer;