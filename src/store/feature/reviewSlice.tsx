import {createSlice} from "@reduxjs/toolkit";
import {dispatch} from "../store";
import {ReviewSLiceType} from "../../constant/type";
import {v4 as uuidv4} from 'uuid';


const initialState: ReviewSLiceType = {
    review: {
        meal: '',
        noOfPeople: 1,
        restaurant: '',
        dishesOrders: [
            {
                dish: '',
                noOfSer: 1,
                id: uuidv4()
            }
        ]
    },
    isValid: false,
    dishesList: [],
    errors: []
};


export const reviewSlice = createSlice({
    name: "reviewSlice",
    initialState,
    reducers: {
        updateReview: (state, action) => {
            console.log("action.payload", action.payload)
            state.review.meal = action.payload.meal;
            state.review.noOfPeople = action.payload.noOfPeople;
            state.review.restaurant = action.payload.restaurant;
            state.review.dishesOrders = action.payload.dishesOrders;
        },

        getDishesList: (state, action) => {
            state.dishesList = action.payload
        },
    },

})

export const fetchDishesListApi = async () => {
    const response = await import('../../../src/constant/dishes.json'); // Dynamic import
    try {
        if (response) {
            dispatch(getDishesList(response.default.dishes))
        }
    } catch (e) {
        console.log(e)
    }
};


export const {updateReview, getDishesList} = reviewSlice.actions;