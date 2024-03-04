import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {reviewSlice} from "./feature/reviewSlice";

const store = configureStore({
    reducer: {
        reviewSlice: reviewSlice.reducer,
    },
});

const { dispatch } = store;

const useAppDispatch: () => typeof store.dispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> =
    useSelector;

export { useAppDispatch, useAppSelector, dispatch, store };
