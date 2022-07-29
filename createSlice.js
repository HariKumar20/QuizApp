import { createSlice } from "@reduxjs/toolkit";

export const userScoreSlice  = createSlice({
    name : 'score',
    initialState :
    {
        result : 0,
    } ,
    reducers :
    {
        setUserScore : (state , action) =>
        {
            state.result = action.payload
            console.log(action.payload);
        }
    }
})
export const {setUserScore }= userScoreSlice.actions;

export default userScoreSlice.reducer 