import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        createUser: (state, action) => {
            state = action.payload;
            return [state];
        },
        initUser: (state, action) => {
            state = action.payload;
            return [state];
        },
    },
});

export const { createUser, initUser } = userSlice.actions;

export default userSlice.reducer;
