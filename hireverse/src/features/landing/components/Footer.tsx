import { Box, Typography, TextField, Button, Link, Divider, IconButton, Grid2 } from "@mui/material";
import { Facebook, Instagram, LinkedIn, Twitter, YouTube } from "@mui/icons-material";
import Logo from "@core/components/ui/Logo";

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: "#202430",
                color: "grey.300",
                py: 6,
                px: 4,
            }}
        >
            <Grid2 container spacing={4} justifyContent={"space-between"}>
                {/* Left Section */}
                <Grid2 columns={{xs: 12, md: 3}}>
                    <Logo theme="light" />
                    <Typography variant="body2" sx={{ mt: 2, maxWidth: 300 }}>
                        Great platform for job seekers passionate about startups. Find your dream job easier.
                    </Typography>
                </Grid2>

                {/* About Section */}
                <Grid2 columns={{xs: 12, md: 3}}>
                    <Typography variant="h6" sx={{ mb: 2, color: "grey.100" }}>
                        About
                    </Typography>
                    <Box>
                        {["Companies", "Pricing", "Terms", "Advice", "Privacy Policy"].map((item, index) => (
                            <Link
                                key={index}
                                href="#"
                                underline="hover"
                                color="inherit"
                                display="block"
                                sx={{ mb: 1 }}
                            >
                                {item}
                            </Link>
                        ))}
                    </Box>
                </Grid2>

                {/* Resources Section */}
                <Grid2 columns={{xs: 12, md: 3}}>
                    <Typography variant="h6" sx={{ mb: 2, color: "grey.100" }}>
                        Resources
                    </Typography>
                    <Box>
                        {["Help Docs", "Guide", "Updates", "Contact Us"].map((item, index) => (
                            <Link
                                key={index}
                                href="#"
                                underline="hover"
                                color="inherit"
                                display="block"
                                sx={{ mb: 1 }}
                            >
                                {item}
                            </Link>
                        ))}
                    </Box>
                </Grid2>

                {/* Subscription Section */}
                <Grid2 columns={{xs: 12, md: 3}}>
                    <Typography variant="h6" sx={{ mb: 2, color: "grey.100" }}>
                        Get job notifications
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        The latest job news and articles sent to your inbox weekly.
                    </Typography>
                    <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={1}>
                        <TextField
                            variant="outlined"
                            placeholder="Email Address"
                            fullWidth
                            size="small"
                            sx={{
                                bgcolor: "grey.800",
                                input: { color: "grey.300" },
                            }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                px: 3,
                                minWidth: "120px",
                                whiteSpace: "nowrap",
                            }}
                        >
                            Subscribe
                        </Button>
                    </Box>
                </Grid2>
            </Grid2>

            <Divider sx={{ my: 4, borderColor: "grey.700" }} />

            {/* Footer Bottom */}
            <Box
                display="flex"
                flexDirection={{ xs: "column", md: "row" }}
                justifyContent="space-between"
                alignItems="center"
                sx={{ textAlign: { xs: "center", md: "left" } }}
            >
                <Typography variant="body2" sx={{ mb: { xs: 2, md: 0 } }}>
                    2025 © HireVerse. All rights reserved.
                </Typography>

                {/* Social Media Icons */}
                <Box display="flex" gap={2}>
                    <IconButton href="#" color="inherit" sx={{ "&:hover": { color: "grey.100" } }}>
                        <Facebook />
                    </IconButton>
                    <IconButton href="#" color="inherit" sx={{ "&:hover": { color: "grey.100" } }}>
                        <Instagram />
                    </IconButton>
                    <IconButton href="#" color="inherit" sx={{ "&:hover": { color: "grey.100" } }}>
                        <LinkedIn />
                    </IconButton>
                    <IconButton href="#" color="inherit" sx={{ "&:hover": { color: "grey.100" } }}>
                        <Twitter />
                    </IconButton>
                    <IconButton href="#" color="inherit" sx={{ "&:hover": { color: "grey.100" } }}>
                        <YouTube />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;
