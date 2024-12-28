import { Box, Button, CircularProgress, useMediaQuery, useTheme, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import OTPInput from "react-otp-input";
import './otp.css';
import { toast } from "sonner";
import { sendOtp, verifyUser } from "@core/api/auth/authapi";
import useAppDispatch from "@core/hooks/useDispatch";
import { useNavigate } from "react-router-dom";
import { setCredential } from "@core/store/authslice";
import { getUserDashboardPath } from "@core/utils/helper";

const RESEND_OTP_SECONDS = 120;

type OtpFormProps = {
    email: string;
}

const OtpForm = ({ email }: OtpFormProps) => {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [timer, setTimer] = useState(RESEND_OTP_SECONDS);
    const [isResendEnabled, setIsResendEnabled] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isResending, setIsResending] = useState(false);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

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

    const handleSubmit = async () => {
        if (!validateOtp()) return;

        setIsSubmitting(true);
        try {
            const res = await verifyUser({ email, otp })
            dispatch(setCredential({ user: res.user, token: res.token, rememberMe: false }));
            navigate(getUserDashboardPath(res.user.role))
            toast.success("OTP Verified!");
        } catch (error: any) {
            toast.error(error)
        } finally {
            setIsSubmitting(false)
        }
    };

    const handleResendOtp = async () => {
        setIsResending(true)
        try {
            await sendOtp(email)
            sessionStorage.setItem("otpStartTime", Date.now().toString());
            setTimer(RESEND_OTP_SECONDS);
            setIsResendEnabled(false);
            toast.success("A new OTP has been sent!");
        } catch (error: any) {
            toast.error(error)
        } finally {
            setIsResending(false)
        }

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
                    disabled={!isResendEnabled || isResending}
                >
                    {isResending ? (
                        <>
                            Resending..<CircularProgress size={14} />
                        </>
                    )
                        : (
                            <>
                                Resend OTP {isResendEnabled ? "?" : `in (${Math.floor(timer / 60)}:${timer % 60 < 10 ? `0${timer % 60}` : timer % 60})`}
                            </>
                        )}
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
