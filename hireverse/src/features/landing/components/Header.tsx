import { Box, Button, Divider, Typography, Container, Drawer, List, ListItem, ListItemText } from '@mui/material';
import Logo from "@core/components/ui/Logo";
import { useNavigate } from 'react-router-dom';
import { useTheme, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import useAppSelector from '@core/hooks/useSelector';
import { getUserDashboardPath } from '@core/utils/helper';
import MenuButton from '@core/components/ui/MenuButton';

const Header = () => {
    const user = useAppSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [openMenu, setOpenMenu] = useState(false);

    const handleNavigation = (path: string) => {
        navigate(path);
        setOpenMenu(false);
    };

    const navigationStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: '100%',
        cursor: 'pointer',
        '&:hover': {
            borderBottom: '2px solid',
            borderColor: 'primary.main',
        },
    };

    const listItemStyle = {
        padding: '10px 16px',
        borderRadius: 1,
        '&:hover': {
            color: 'primary.main',
            fontWeight: 'bold'
        },
    }

    const toggleMenu = () => {
        setOpenMenu(!openMenu);
    };

    return (
        <>
            <Container>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    minHeight={78}
                >
                    {/* Left side */}
                    <Box height={'inherit'} display="flex" gap={3} alignItems="center">
                        <Logo />

                        {!isMobile && (
                            <Box display="flex" height={"100%"} gap={3}>
                                <Box sx={navigationStyle} onClick={() => handleNavigation('/find-jobs')}>
                                    <Typography variant="h6" fontSize={'14px'}>
                                        Find Jobs
                                    </Typography>
                                </Box>
                                <Box sx={navigationStyle} onClick={() => handleNavigation('/discover-companies')}>
                                    <Typography variant="h6" fontSize={'14px'}>
                                        Discover Companies
                                    </Typography>
                                </Box>
                            </Box>
                        )}
                    </Box>

                    {/* Right side */}
                    <Box display="flex" alignItems="center" justifyContent={'center'} gap={1}>
                        {!isMobile && (
                            <>
                                {!user ? (
                                    <>
                                        <Button
                                            variant="text"
                                            color="primary"
                                            onClick={() => handleNavigation('/auth?page=login')}
                                        >
                                            Login
                                        </Button>
                                        <Divider
                                            orientation="vertical"
                                            sx={{
                                                margin: '0 8px',
                                                borderColor: 'primary.main',
                                                height: 30,
                                            }}
                                        />
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleNavigation('/auth?page=signup')}
                                        >
                                            Sign Up
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => handleNavigation(getUserDashboardPath(user.role))}
                                    >
                                        Go to Dashboard
                                    </Button>
                                )}
                            </>
                        )}
                    </Box>


                    {isMobile && (
                        <Box display="flex" alignItems="center" justifyContent={'center'}>
                            <MenuButton onToggle={toggleMenu}/>
                        </Box>
                    )}
                </Box>
            </Container>

            {/* Mobile Menu */}
            <Drawer
                anchor="right"
                open={openMenu}
                onClose={toggleMenu}
            >
                <Box
                    sx={{
                        width: 250,
                        backgroundColor: 'background.paper',
                        padding: '16px',
                        overflow: 'hidden',
                        maxHeight: '100vh',
                    }}
                    role="presentation"
                >
                    <List
                        sx={{
                            padding: 0,
                            margin: 0,
                        }}
                    >
                        <ListItem
                            component="div"
                            onClick={() => handleNavigation('/find-jobs')}
                            sx={listItemStyle}
                        >
                            <ListItemText primary="Find Jobs" />
                        </ListItem>

                        <ListItem
                            component="div"
                            onClick={() => handleNavigation('/discover-companies')}
                            sx={listItemStyle}
                        >
                            <ListItemText primary="Discover Companies" />
                        </ListItem>

                        <Divider sx={{ marginY: 1 }} />

                        {!user ? (
                            <>
                                <ListItem onClick={() => handleNavigation('/auth?page=login')}>
                                    <Button fullWidth >Login</Button>
                                </ListItem>
                                <ListItem onClick={() => handleNavigation('/auth?page=signup')}>
                                    <Button variant="contained" fullWidth >Sign Up</Button>
                                </ListItem>
                            </>
                        ) : (
                            <>
                                <ListItem onClick={() => handleNavigation(getUserDashboardPath(user.role))}>
                                    <Button variant="contained" fullWidth >Go to Dashboard</Button>
                                </ListItem>
                            </>
                        )}
                    </List>
                </Box>

            </Drawer>
        </>
    );
};

export default Header;
