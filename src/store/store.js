import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/features/user/userSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
});
