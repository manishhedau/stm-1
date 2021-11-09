import { configureStore } from "@reduxjs/toolkit";
import reducer from "./studentsSlice";


export default function () {
    const store = configureStore({
        reducer
    })
    return store;
}