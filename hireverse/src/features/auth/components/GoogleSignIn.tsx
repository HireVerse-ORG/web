import { googleSignin } from "@core/api/auth/authapi";
import { Button, CircularProgress } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { useState } from "react";
import useAppDispatch from "@core/hooks/useDispatch";
import { useNavigate } from "react-router-dom";
import { setCredential } from "@core/store/authslice";
import { getUserDashboardPath } from "@core/utils/helper";

type GoogleSignInProps = {
    role: string;
    onStart?: () => void;
    onFinished?: () => void;
    disabled?: boolean;
};

const GoogleSignIn = ({ role, onStart, onFinished, disabled }: GoogleSignInProps) => {
    const [loading, setLoading] = useState(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const { access_token } = tokenResponse;

                const res = await googleSignin({ gToken: access_token, role });
                if (res.user.isBlocked) {
                    toast.error("You have been blocked")
                    return;
                }
                dispatch(setCredential({ user: res.user, token: res.token, rememberMe: true }));
                navigate(getUserDashboardPath(res.user.role))
            } catch (error: any) {
                toast.error(error.message || "Google sign-in failed");
            } finally {
                setLoading(false);
                onFinished?.();
            }
        },
        onError: () => {
            setLoading(false);
            onFinished?.();
            toast.error("Google sign-in was unsuccessful");
        },
        onNonOAuthError: () => {
            setLoading(false);
            onFinished?.();
            toast.info("Sign-in process was canceled.");
        },
    });

    const handleLogin = () => {
        setLoading(true);
        onStart?.();
        login();
    }

    return (
        <Button
            size="small"
            onClick={handleLogin}
            variant="outlined"
            fullWidth
            disabled={loading || disabled}
            sx={{ borderColor: "text.disabled", position: "relative" }}
        >
            <img
                src="/google.svg"
                alt="Google"
                style={{ width: 24, height: 24, marginRight: 8 }}
            />
            {loading ? <CircularProgress size={20} /> : "Continue with Google"}
        </Button>
    );
};

export default GoogleSignIn;
