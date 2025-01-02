import { useMsal } from "@azure/msal-react";
import { mslLoginRequest } from "@core/lib/mslConfig";
import { msSignin } from "@core/api/auth/authapi";
import { toast } from "sonner";
import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import useAppDispatch from "@core/hooks/useDispatch";
import { useNavigate } from "react-router-dom";
import { setCredential } from "@core/store/authslice";
import { getUserDashboardPath } from "@core/utils/helper";

type MSSignInProps = {
    role: string;
    onStart?: () => void;
    onFinished?: () => void;
};

const MSSignIn = ({ role, onStart, onFinished }: MSSignInProps) => {
    const [loading, setLoading] = useState(false);

    const { instance } = useMsal();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const login = async () => {
        setLoading(true);
        onStart && onStart();
        try {
            const response = await instance.loginPopup(mslLoginRequest);
            const res = await msSignin({ msToken: response.idToken, role });
            if (res.user.isBlocked) {
                toast.error("You have been blocked")
                return;
            }
            dispatch(setCredential({ user: res.user, token: res.token, rememberMe: true }));
            navigate(getUserDashboardPath(res.user.role))

        } catch (error: any) {
            toast.error(error.message || "Failed to authenticate Microsoft");
        } finally {
            setLoading(false);
            onFinished && onFinished();
        }
    };

    return (
        <Button
            size="small"
            onClick={login}
            variant="outlined"
            fullWidth
            disabled={loading}
            sx={{ borderColor: "text.disabled" }}
        >
            <img
                src="/Microsoft_logo.svg"
                alt="Microsoft"
                style={{ width: 24, height: 24, marginRight: 8 }}
            />
            {loading ? <CircularProgress size={20} /> : "Continue with Microsoft"}
        </Button>
    );
};

export default MSSignIn;
