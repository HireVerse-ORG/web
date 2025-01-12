import { Box, Container } from '@mui/material';
import React from 'react';
import Logo from '../ui/Logo';

type BlankLayoutProps = {
    children: React.ReactNode;
}
const BlankLayout = ({children}: BlankLayoutProps) => {
    return (
        <Box sx={{background: "white", minHeight: "100vh"}}>
            <Box>
                <Container sx={{paddingBlock: 3}}>
                    <Logo/>
                </Container>
            </Box>
            <Container>
                {children}
            </Container>
        </Box>
    );
}

export default BlankLayout;
