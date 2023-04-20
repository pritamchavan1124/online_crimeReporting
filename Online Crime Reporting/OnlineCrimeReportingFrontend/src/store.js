import { configureStore } from "@reduxjs/toolkit";
//import the auth-slice to load it into store
import authSlice from "./slices/authSlice";

//create store with required reducers
const store=configureStore({
    reducer:{
        authSlice,
    },
})
export default store
//further need to provide this store throughout the application. so go in index.js provide the store with the help of provider