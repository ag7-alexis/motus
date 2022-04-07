import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import wordSlice from "./features/word/wordSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        words: wordSlice,
    },
});
