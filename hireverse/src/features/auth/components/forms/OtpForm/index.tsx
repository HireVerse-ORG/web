import { Box, Button, CircularProgress, useMediaQuery, useTheme, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import OTPInput from "react-otp-input";
import './otp.css';
import { toast } from "sonner";

const RESEND_OTP_SECONDS = 120;

const OtpForm = () => {
    const [otp, setOtp] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [timer, setTimer] = useState(RESEND_OTP_SECONDS);
    const [isResendEnabled, setIsResendEnabled] = useState(false);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        const savedStartTime = sessionStorage.getItem("otpStartTime");
        if (savedStartTime) {
            const elapsedTime = Math.floor((Date.now() - Number(savedStartTime)) / 1000);
            setTimer(RESEND_OTP_SECONDS - elapsedTime);
        } else {
            sessionStorage.setItem("otpStartTime", Date.now().toString());
            setTimer(RESEND_OTP_SECONDS);
        }

        const countdown = setInterval(() => {
            setTimer((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(countdown);
                    setIsResendEnabled(true);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => {
            clearInterval(countdown);
        }
    }, [isResendEnabled]);


    const validateOtp = () => {
        if (otp.length !== 6 || !/^\d+$/.test(otp)) {
            setError("OTP must be a 6-digit number.");
            return false;
        }
        setError("");
        return true;
    };

    const handleSubmit = () => {
        if (!validateOtp()) return;

        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            toast.success("OTP Verified!");
        }, 2000);
    };

    const handleResendOtp = () => {
        // Reset the timer and resend the OTP
        sessionStorage.setItem("otpStartTime", Date.now().toString());
        setTimer(RESEND_OTP_SECONDS); // Reset timer to 120 seconds
        setIsResendEnabled(false);

        // Simulate sending a new OTP and notify the user
        toast.success("A new OTP has been sent!");
    };

    return (
        <Box>
            <Box marginBottom={1} sx={{ width: "100%" }}>
                {!isSmallScreen ? (
                    <OTPInput
                        value={otp}
                        onChange={(value) => {
                            setOtp(value);
                            if (error) validateOtp();
                        }}
                        numInputs={6}
                        shouldAutoFocus
                        renderSeparator={<span className="otp-separator">-</span>}
                        renderInput={(props) => (
                            <input {...props} className={`otp-input ${error ? "error" : ""}`} />
                        )}
                    />
                ) : (
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Enter OTP"
                        value={otp}
                        onChange={(e) => {
                            setOtp(e.target.value);
                            if (error) validateOtp();
                        }}
                        error={!!error}
                        helperText={error}
                    />
                )}
            </Box>

            <Box
                display="flex"
                justifyContent="end"
                alignItems="center"
            >
                <Button
                    onClick={handleResendOtp}
                    disabled={!isResendEnabled}
                >
                    Resend OTP {isResendEnabled ? "?" : `in (${Math.floor(timer / 60)}:${timer % 60 < 10 ? `0${timer % 60}` : timer % 60})`}
                </Button>
            </Box>

            <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                onClick={handleSubmit}
                disabled={isSubmitting}
                sx={{ marginTop: 2 }}
            >
                {isSubmitting ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                    "Verify"
                )}
            </Button>
        </Box>
    );
};

export default OtpForm;
