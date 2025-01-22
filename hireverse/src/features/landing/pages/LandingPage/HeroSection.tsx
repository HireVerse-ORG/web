import { Box, Container, Typography } from "@mui/material";
import JobSeacrhBox from "../../../../core/components/ui/JobSearchBox";


const HeroSection = () => {
    return (
        <Container>
            <Box sx={{
                position: 'relative',
                paddingY: { xs: 8, sm: 10 },
                minHeight: 'calc(100vh - 78px)',
            }}>
                {/* Image */}
                <Box
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '50%',
                        height: '100%',
                        zIndex: -1,
                    }}
                >
                    <img
                        src="/images/hero.png"
                        alt="Hero Section Image"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                </Box>

                {/* Content */}
                <Box>
                    <Box sx={{
                        maxWidth: { sm: '100%', md: '50%' },
                        textAlign: { xs: 'center', sm: 'center', md: 'left' },
                        mb: 5,
                    }}>
                        {/* Title Typography */}
                        <Typography
                            variant="h3"
                            fontWeight={"bold"}
                            component="h1"
                            gutterBottom
                        >
                            Your Dream Job Awaits You
                        </Typography>

                        {/* Description Typography */}
                        <Typography
                            component={'p'}
                            sx={{
                                lineHeight: 1.5,
                                color: 'text.disabled',
                            }}
                        >
                            Find the perfect job that matches your skills and ambitions. Explore opportunities with top employers and take the next step in your career today.
                        </Typography>
                    </Box>

                    {/* Search Box */}
                    <Box sx={{
                        maxWidth: { md: "70%" },
                        boxShadow: 4,
                    }}>
                        <JobSeacrhBox onSearch={() => {}}/>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}

export default HeroSection;
