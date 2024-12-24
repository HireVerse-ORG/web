import { configureStore } from "@reduxjs/toolkit";
import authReducer, { AuthState } from './authslice';

const store = configureStore({
    reducer: {
        auth: authReducer
    },
});

export type RootState = {
    auth: AuthState;
};

export type AppDispatch = typeof store.dispatch;
export default store;