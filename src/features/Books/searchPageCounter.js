import { createSlice } from "@reduxjs/toolkit";

export const searchPageCounterSlice = createSlice({
    name: 'searchPageCounter',
    initialState: {
        currentSearchPage: 1,
        searchTerm: ''
    },
    reducers: {
        setSearchTerm: (state, action)=>{
            state.searchTerm = action.searchTerm;
        },
        searchIncreaseCount : (state)=>{
            state.currentSearchPage++
        },
        searchDecreaseCount: (state)=>{
            if(state.currentPage>1){
                state.currentSearchPage--
            }
            else{
                return state.currentSearchPage
            }
        },
        searchResetCount:(state)=> {
            state.currentSearchPage = 1;
            state.searchTerm ='';
        },
    }
});

export const {setSearchTerm, searchIncreaseCount, searchDecreaseCount, searchResetCount} = searchPageCounterSlice.actions;
export default searchPageCounterSlice.reducer;