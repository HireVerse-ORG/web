import { Button } from "@mui/material";
import { useState } from "react";

type GoogleSignInProps = {
    role: string;
    onStart?: () => void;
    onFinished?: () => void;
};

const GoogleSignIn = ({ role, onStart, onFinished }: GoogleSignInProps) => {
    const [loading, setLoading] = useState(false);
    
    const login = async () => {
        console.log(role);
        
    };

    return (
        <Button
            size="small"
            onClick={login}
            variant="outlined"
            fullWidth
            disabled={loading}
            sx={{borderColor: "text.disabled"}}
        >
            <img
                src="/google.svg" 
                alt="Google"
                style={{ width: 24, height: 24, marginRight: 8 }}
            />
            Continue with Google
        </Button>
    );
}

export default GoogleSignIn;
