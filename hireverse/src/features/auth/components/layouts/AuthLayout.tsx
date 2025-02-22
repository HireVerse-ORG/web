import { Box, useTheme, useMediaQuery } from "@mui/material";
import Logo from "../../../../core/components/ui/Logo";
import useAppSelector from "@core/hooks/useSelector";
import { Navigate } from "react-router-dom";
import ScrollableContainer from "@core/components/ui/ScrollableContainer";

type AuthLayoutProps = {
    children: React.ReactNode;
    imageSrc?: string;
};

const AuthLayout = ({ children, imageSrc = "/images/working-beach.png"}: AuthLayoutProps) => {
    const user = useAppSelector(state => state.auth.user);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    if (user) {
        if (user.role === "admin") return <Navigate to={'/admin'} />
        if (user.role === "seeker") return <Navigate to={'/seeker'} />
        if (user.role === "company") return <Navigate to={'/company'} />
    }

    return (
        <Box display={isSmallScreen ? "block" : "flex"} height="100vh" sx={{
            overflow: "hidden"
        }}>
            {!isSmallScreen && (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flex={1}
                    sx={{
                        backgroundColor: "secondary",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    <img
                        src={imageSrc}
                        alt="auth-layout-bg"
                        style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                            bottom: "0",
                        }}
                    />
                    <Box position="absolute" top={16} left={16} zIndex={2}>
                        <Logo />
                    </Box>
                </Box>
            )}

            {/* Right side */}
            <Box
                display="flex"
                flexDirection="column"
                justifyContent={isSmallScreen ? "top" : "center"}
                alignItems="center"
                flex={1}
                sx={{
                    backgroundColor: "white",
                    height: '100%',
                    overflowY: 'scroll'
                }}
            >
                {isSmallScreen && (
                    <Box width={'100%'} textAlign={"left"} marginBottom={3} sx={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        zIndex: 1000,
                        backgroundColor: "white",
                        py: 2,
                        px: 3,
                    }}>
                        <Logo />
                    </Box>
                )}
                <ScrollableContainer
                    display="flex"
                    flexDirection="column"
                    justifyContent={"center"}
                    alignItems="center"
                    width={"100%"}
                    height={"100%"} sx={{ overflowY: "scroll", paddingTop: 3}}
                    px={isSmallScreen ? 3 : 0}    
                >
                    {children}
                </ScrollableContainer>
            </Box>
        </Box>
    );
};

export default AuthLayout;
