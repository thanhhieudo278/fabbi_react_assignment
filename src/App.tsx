import React, {useEffect, useState} from 'react';
import './App.scss';
import {Alert, AlertTitle, Box, Button, IconButton, Step, StepLabel, Stepper, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import StepOneComponent from "./page/stepOneComponent";
import StepTwoComponent from "./page/stepTwoComponent";
import StepThreeComponent from "./page/stepThreeComponent";
import ReviewComponent from "./page/reviewComponent";
import {dispatch, useAppSelector} from "./store/store";
import {fetchDishesListApi, updateReview} from "./store/feature/reviewSlice";
import {useForm} from "react-hook-form";
import {v4 as uuidv4} from "uuid";

const steps = ["Step1", "Step2", "Step3", "Review"]

const App = () => {
    const reviewData = useAppSelector((state) => state.reviewSlice);
    const [activeStep, setActiveStep] = React.useState(0);
    const [alert, setAlert] = useState(false);

    const handleNext = () => {
        if (activeStep === steps.length) {
            dispatch(
                updateReview(
                    {
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
                    }))
            setActiveStep(0);
        } else if (activeStep === steps.length - 1) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1)
        } else setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    useEffect(() => {
        fetchDishesListApi()
    }, [])


    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({mode: "onSubmit"});


    const onValid = () => {
        if (activeStep === 2){
            if(Number(reviewData.review.noOfPeople) >= Number(reviewData.review?.dishesOrders?.map(i => i.noOfSer)
                    .reduce((sum, e) => (sum && e) ? sum + e : sum))){
                handleNext()
            }else{
                setAlert(true)
            }
        }else handleNext()

    }


    return (
        <div className="App">
            {alert && <Alert
                variant={"filled"}
                severity="error"
                color={"error"}
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setAlert(false);
                        }}
                    >
                        <CloseIcon fontSize="inherit"/>
                    </IconButton>
                }
                sx={{m:2, position:"absolute", bottom: 0, right: 0, width: "500px", zIndex: 10000000,}}
            >
                <AlertTitle>Error</AlertTitle>
                The total number of dishes should be greater or equal to the number of people selected and a maximum of 10 is allowed
            </Alert>}
            <header className="App-header">
                <Box sx={{width: '50%', marginTop: '10%'}}>
                    <Box sx={{width: '60%', marginBottom: '20%'}}>
                        <Stepper activeStep={activeStep}>
                            {steps.map((label, index) => {
                                const stepProps: { completed?: boolean } = {};
                                const labelProps: {
                                    optional?: React.ReactNode;
                                } = {};
                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                    </Box>
                    <form onSubmit={handleSubmit(onValid)}>
                        <Box>
                            {activeStep === steps.length &&
                                <React.Fragment>
                                    <Box display={"flex"} justifyContent={"center"}>
                                        <Typography sx={{mt: 2, mb: 1}}>
                                            All steps completed - you&apos;re finished
                                        </Typography>
                                    </Box>
                                </React.Fragment>
                            }
                            {activeStep === 0 && (
                                <React.Fragment>
                                    <StepOneComponent register={register} reviewDataPass={reviewData}
                                                      errors={errors}></StepOneComponent>
                                </React.Fragment>
                            )}
                            {activeStep === 1 && (
                                <React.Fragment>
                                    <StepTwoComponent register={register} reviewDataPass={reviewData}
                                                      errors={errors}></StepTwoComponent>
                                </React.Fragment>
                            )}
                            {activeStep === 2 && (
                                <React.Fragment>
                                    <StepThreeComponent register={register} reviewDataPass={reviewData}
                                                        errors={errors}></StepThreeComponent>
                                </React.Fragment>
                            )}
                            {activeStep === 3 && (
                                <React.Fragment>
                                    <ReviewComponent {...reviewData}></ReviewComponent>
                                </React.Fragment>
                            )}
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            pt: "20%",
                            justifyContent: 'space-between'
                        }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{mr: 1}}
                            >
                                Back
                            </Button>

                            <Button type={"submit"}>
                                {
                                    activeStep === steps.length ? 'reset' :
                                        activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                            </Button>
                        </Box>
                    </form>
                </Box>
            </header>
        </div>
    );
}
export default App

