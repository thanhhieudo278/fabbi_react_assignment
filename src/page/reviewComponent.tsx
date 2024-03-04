import {
    Box,
    Grid,
    List,
    ListItem, ListItemText,
    Typography
} from "@mui/material";
import {ReviewSLiceType} from "../constant/type";

const ReviewComponent = (reviewDataPass: ReviewSLiceType) => {
    const review = reviewDataPass.review

    return (
        <Box display='flex' flexDirection={"column"} alignItems='center' justifyContent='center'
             sx={{p: 2, border: '1px solid #808080'}}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography mt={2}>Meal</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography mt={2}>{review.meal}</Typography>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography mt={2}>No. of. People</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography mt={2}>{review.noOfPeople}</Typography>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography mt={2}>Restaurant</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography mt={2}>{review.restaurant}</Typography>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography mt={2}>Dishes</Typography>
                </Grid>
                <Grid item xs={6}>
                    <List sx={{width: '100%'}}>
                        {review.dishesOrders && review.dishesOrders.map((item) => (
                            <ListItem
                                key={item.id}
                                disableGutters
                            >
                                <ListItemText primary={item.dish}/>
                                <ListItemText primary={item.noOfSer}/>
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ReviewComponent