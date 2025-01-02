import { Box, Container } from '@mui/material';
import Layout from '../components/Layout';
import HeroSection from '../components/sections/HeroSection';

const LandingPage = () => {
    return (
        <Layout>
            <Container maxWidth="lg">
                <HeroSection />
                {/* explore catrgory */}
            </Container>
            <Box bgcolor={"primary.main"} color={"white"}>
                <Container maxWidth="lg">
                    {/* start job post call to action */}
                </Container>
            </Box>
            <Container maxWidth="lg">
                {/* fetured job sectiom */}
            </Container>
        </Layout>
    );
}

export default LandingPage;
