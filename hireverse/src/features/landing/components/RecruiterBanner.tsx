import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Container, Grid2 } from '@mui/material';

const RecruiterBanner = () => {
    return (
        <Box sx={{ bgcolor: 'primary.main', py: 8, px: 4 }}>
            <Container>
                <Grid2
                    container
                    spacing={2}
                    justifyContent={"space-between"}
                    wrap='nowrap'
                    sx={{
                        flexDirection: { xs: 'column-reverse', md: 'row' } 
                    }}
                >
                    <Grid2 columns={{ xs: 12, md: 6 }}>
                        <Box sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'left',
                        }}>
                            <Typography variant="h4" fontWeight={"bold"} color="common.white" gutterBottom>
                                Start posting jobs today
                            </Typography>
                            <Typography variant="body1" color="common.white" mb={2}>
                                Start posting jobs for free.
                            </Typography>
                            <Button variant='contained' sx={{
                                maxWidth: '200px',
                                backgroundColor: "white",
                                color: "primary.main",
                                '&:hover': {
                                    backgroundColor: "white",
                                    color: "primary.dark",
                                }
                            }}>Sign Up For Free</Button>
                        </Box>
                    </Grid2>
                    <Grid2 columns={{ xs: 12, md: 6 }}>
                        <Box>
                            <img
                                src="/images/company-dasboard.png"
                                alt="Recruiter Banner"
                                style={{
                                    width: '100%',
                                    maxWidth: '500px',
                                    height: 'auto',
                                    objectFit: 'cover'
                                }}
                            />
                        </Box>
                    </Grid2>
                </Grid2>
            </Container>
        </Box>
    );
};

export default RecruiterBanner;
