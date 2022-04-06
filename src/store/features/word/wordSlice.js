import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const wordSlice = createSlice({
    name: "word",
    initialState,
    reducers: {
        deleteWord: (state, action) => {
            state.splice(
                state.findIndex((item) => {
                    return item === action.payload;
                }),
                1
            );
        },
        initWords: (state, action) => {
            state = action.payload;
            return state;
        },
    },
});

export const { deleteWord, initWords } = wordSlice.actions;

export default wordSlice.reducer;
