import { Box, Button, Step, StepLabel, Stepper, Typography, MobileStepper, CircularProgress } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import StepIcon from "./StepIcon";

interface Step {
    title: string;
    icon: JSX.Element;
    content: JSX.Element;
}

interface CustomStepperProps {
    steps: Step[];
    activeStep: number;
    finishing: boolean;
    onNext: () => void;
    onBack: () => void;
    onReset: () => void;
    renderCompletion?: () => JSX.Element;
    ContentLayout?: React.ComponentType<{ children: React.ReactNode }>;
}

const CustomStepper = ({
    steps,
    activeStep,
    finishing,
    onNext,
    onBack,
    onReset,
    renderCompletion,
    ContentLayout
}: CustomStepperProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const isLastStep = activeStep === steps.length;

    return (
        <Box sx={{ width: "100%", height: "100%", mt: 5 }}>
            {/* Stepper */}
            {isMobile ? (
                <>
                    {!isLastStep && (
                        <MobileStepper
                            variant="dots"
                            steps={steps.length}
                            position="bottom"
                            activeStep={activeStep}
                            nextButton={
                                <Button
                                    size="small"
                                    onClick={onNext}
                                    disabled={isLastStep || finishing}
                                >
                                    {finishing ? (
                                        <CircularProgress size={24} color="inherit" />
                                    ) : (
                                        isLastStep ? "Finish" : "Next"
                                    )}
                                </Button>
                            }
                            backButton={
                                <Button
                                    size="small"
                                    onClick={onBack}
                                    disabled={activeStep === 0 || finishing}
                                >
                                    Back
                                </Button>
                            }
                        />
                    )}
                </>
            ) : (
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((step, index) => (
                        <Step key={index}>
                            <StepLabel
                                slots={{
                                    stepIcon: (props) => (
                                        <StepIcon {...props} icon={step.icon} />
                                    ),
                                }}
                            >
                                {step.title}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
            )}

            {/* Content */}
            {isLastStep ? (
                <Box sx={{ mt: 3, textAlign: "center" }}>
                    {renderCompletion ? (
                        renderCompletion()
                    ) : (
                        <>
                            <Typography variant="h6">All steps completed</Typography>
                            <Button onClick={onReset} variant="contained" sx={{ mt: 2 }}>
                                Reset
                            </Button>
                        </>
                    )}
                </Box>
            ) : (
                <Box sx={{ mt: 4 }}>
                    {/* step content */}
                    {ContentLayout ? (
                        <ContentLayout>
                            {steps[activeStep].content}
                        </ContentLayout>
                    ) : (
                        <>
                            {steps[activeStep].content}
                        </>
                    )}

                    {/* Buttons */}
                    {!isMobile && (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mt: 4,
                            }}
                        >
                            <Button
                                disabled={activeStep === 0 || finishing}
                                onClick={onBack}
                                variant="outlined"
                            >
                                Back
                            </Button>
                            <Button
                                onClick={onNext}
                                variant="contained"
                                color={activeStep === steps.length - 1 ? "success" : "primary"}
                                disabled={finishing}
                            >
                                {finishing ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : activeStep === steps.length - 1 ? (
                                    "Finish"
                                ) : (
                                    "Next Step"
                                )}
                            </Button>
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default CustomStepper;
