import {
    Box,
    FormControl, FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
} from "@mui/material";
import {dispatch} from "../store/store";

import {updateReview} from "../store/feature/reviewSlice";
import {ChildComponentProps} from "../constant/type";
import React from "react";

const StepTwoComponent: React.FC<ChildComponentProps> = (props) => {

    const handleChangeRestaurant = (event: SelectChangeEvent) => {
        const data = {...props.reviewDataPass.review, restaurant: event.target.value as string}
        dispatch(updateReview(data))
    };

    const restaurant = (props.reviewDataPass.dishesList && props.reviewDataPass.dishesList.length > 0) ?
        props.reviewDataPass.dishesList
            .map(item => {
                if (props.reviewDataPass.review.meal && item.availableMeals.includes(props.reviewDataPass.review.meal)) {
                    return item.restaurant
                }
            })
            .filter((value, index, myArray) => myArray.indexOf(value) === index) : []

    return (
        <Box display='flex' alignItems='center' justifyContent='center'>
            <Stack spacing={2}>
                <Stack>
                    <FormControl error={!!props.errors.restaurant}>
                        <InputLabel id="select-label-res">
                            Please Select a Restaurant
                        </InputLabel>
                        <Select
                            sx={{width: "250px"}}
                            {...props.register("restaurant", {
                                required: "Please select an option !",
                            })}
                            labelId="select-label-res"
                            label="Please Select a Restaurant"
                            size={"small"}
                            defaultValue={''}
                            value={props.reviewDataPass.review.restaurant}
                            onChange={handleChangeRestaurant}
                        >
                            {restaurant.map((item, index) => (
                                <MenuItem key={index} value={item}>{item}</MenuItem>
                            ))}
                        </Select>
                        {props.errors.restaurant?.message && (
                            <FormHelperText>
                                {props.errors.restaurant.message as string}
                            </FormHelperText>
                        )}
                    </FormControl>
                </Stack>
            </Stack>
        </Box>
    )
}

export default StepTwoComponent