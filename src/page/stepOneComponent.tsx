import {
    Box,
 FormControl, FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    TextField
} from "@mui/material";
import {dispatch} from "../store/store";
import {updateReview} from "../store/feature/reviewSlice";
import React from "react";
import {ChildComponentProps} from "../constant/type";

const MealOptions = ["breakfast", "lunch", "dinner"]

const StepOneComponent: React.FC<ChildComponentProps> = (props) => {

    const handleChangeMeal = (event: SelectChangeEvent) => {
        const data = {...props.reviewDataPass.review, meal: event.target.value as string}
        dispatch(updateReview(data))
    };

    const handleChangePeople = (event: SelectChangeEvent) => {
        const data = {...props.reviewDataPass.review, noOfPeople: event.target.value as string}
        dispatch(updateReview(data))
    };


    return (
        <Box display='flex' alignItems='center' justifyContent='center'>
            <Stack spacing={6}>
                <Stack>
                    <FormControl error={!!props.errors.meal}>
                        <InputLabel id="select-label-meal">Please Select a meal</InputLabel>
                        <Select
                            labelId="select-label-meal"
                            label="Please Select a meal"
                            {...props.register("meal", {
                                required: "Please select an option !",
                            })}
                            defaultValue={''}
                            value={props.reviewDataPass.review.meal}
                            onChange={handleChangeMeal}
                            size={"small"}
                        >
                            {MealOptions.map((item) => (
                                <MenuItem key={item} value={item}>{item}</MenuItem>
                            ))}
                        </Select>
                        {props.errors.meal?.message && (
                            <FormHelperText>
                                {props.errors.meal.message as string}
                            </FormHelperText>
                        )}
                    </FormControl>
                </Stack>

                <Stack>
                    <TextField size={"small"} type="number" id={"noOfPeople"}
                               label="Please Enter Number of people"
                               error={!!props.errors.noOfPeople}
                               helperText={props.errors.noOfPeople?.message as string}
                               {...props.register("noOfPeople", {
                                   onChange: handleChangePeople,
                                   value: props.reviewDataPass.review.noOfPeople,
                                   required: "Number of People is required !",
                                   validate: (value) => (value < 10 && value > 0) || "Number must be less than 10",
                               })}
                    />
                </Stack>
            </Stack>
        </Box>
    )
}

export default StepOneComponent