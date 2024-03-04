import {
    Box, FormControl, FormHelperText,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select, SelectChangeEvent,
    TextField
} from "@mui/material";
import React, {ChangeEvent} from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {ChildComponentProps, DishesOrder} from "../constant/type";
import {dispatch} from "../store/store";
import {updateReview} from "../store/feature/reviewSlice";
import {v4 as uuidv4} from "uuid";


const StepThreeComponent: React.FC<ChildComponentProps> = (props) => {

    function cloneDeep(obj: object) {
        return JSON.parse(JSON.stringify(obj));
    }

    const dishList = (props.reviewDataPass.dishesList && props.reviewDataPass.dishesList.length > 0) ?
        props.reviewDataPass.dishesList.map(i => {
            if (props.reviewDataPass.review.restaurant === i.restaurant) return i.name
        }).filter(i => !!i) : []

    const dishesOrders = props.reviewDataPass.review.dishesOrders

    const handleChangeDish = (event: SelectChangeEvent, item: DishesOrder) => {
        const data = cloneDeep(props.reviewDataPass)
        data.review.dishesOrders.forEach((e: DishesOrder) => {
            if (e.id === item.id) {
                e.dish = event.target.value as string
            }
        })
        dispatch(updateReview(data.review))
    }

    const handleChangeNoOfServe = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, item: DishesOrder) => {
        const data = cloneDeep(props.reviewDataPass);
        data.review.dishesOrders.forEach((e: DishesOrder) => {
            if (e.id === item.id) {
                e.noOfSer = Number(event.target.value as string)
            }
        })
        dispatch(updateReview(data.review))
    }

    const handleClickAdd = () => {
        const data = cloneDeep(props.reviewDataPass)
        data.review.dishesOrders.push({
            dish: '',
            noOfSer: 1,
            id: uuidv4()
        })
        dispatch(updateReview(data.review))
    }

    const handleClickDelete = (id: string) => {
        const data = cloneDeep(props.reviewDataPass)
        data.review.dishesOrders = data.review.dishesOrders.filter((i: DishesOrder) => i.id !== id)
        dispatch(updateReview(data.review))
    }


    return (
        <Box flexDirection={"column"} display='flex' alignItems='center' justifyContent='center'>
            {dishesOrders && dishesOrders?.length > 0 && dishesOrders.map((item) =>
                <Grid key={item.id} container direction="row" spacing={1} mt={2}>
                    <Grid item xs={7} direction={"column"} container justifyContent={"center"}>
                        <FormControl error={!!props.errors[`${item.id + item.dish}`]}>
                            <InputLabel id={item.id}>Please Select a Dish</InputLabel>
                            <Select
                                {...props.register(`${item.id + item.dish}`, {
                                    required: "Please select an option !",
                                    validate: (value) => dishesOrders.filter(i => i.dish == value).length < 2 || "Can't select the same dish twice !"
                                })}
                                labelId={item.id}
                                label="Please Select a Dish"
                                size={"small"}
                                defaultValue={''}
                                value={item.dish}
                                onChange={(e) => handleChangeDish(e, item)}
                            >
                                {dishList.map((i, index) => (
                                    <MenuItem key={index} value={i}>{i}</MenuItem>
                                ))}
                            </Select>
                            {props.errors[`${item.id + item.dish}`] && (
                                <FormHelperText>
                                    {props.errors[`${item.id + item.dish}`]?.message as string}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={5} direction={"row"} container alignItems={"center"}>
                        <FormControl error>
                            <TextField
                                label="Please Enter no. of servings"
                                size={"small"}
                                type="number"
                                value={item.noOfSer}
                                error={!!props.errors[`${item.id + item.noOfSer}`]}
                                helperText={props.errors[`${item.id + item.noOfSer}`]?.message as string}
                                {...props.register(`${item.id + item.noOfSer}`, {
                                    onChange: (e) => {
                                        handleChangeNoOfServe(e, item)
                                    },
                                    required: "Number of People is required !",
                                    validate: (value) =>  value > 0 || "No of serving is over 0"
                                })}
                            ></TextField>

                        </FormControl>
                        <IconButton color={"error"} onClick={() => handleClickDelete(item.id)} aria-label="delete"
                                    size="large">
                            <HighlightOffIcon fontSize="inherit"/>
                        </IconButton>

                    </Grid>

                </Grid>
            )}

            <IconButton color={"primary"} sx={{mt: 2}} onClick={handleClickAdd} aria-label="delete" size="large">
                <AddCircleIcon fontSize="inherit"/>
            </IconButton>
        </Box>
    )
}
export default StepThreeComponent


