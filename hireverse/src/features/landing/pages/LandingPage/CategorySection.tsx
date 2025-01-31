import { publicJobCategoryList } from "@core/api/shared/jobCategoryApi";
import useGet from "@core/hooks/useGet";
import colors from "@core/theme/colors";
import { IJobCategory } from "@core/types/jobCategory.interface";
import { IPaginationResponse } from "@core/types/pagination.interface";
import { ArrowOutward } from "@mui/icons-material";
import { Box, Container, Typography, Skeleton, Grid2 } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CategorySection = () => {
    const { data, loading, error } = useGet<IPaginationResponse<IJobCategory>>(() => publicJobCategoryList(1, 8));

    const navigate = useNavigate();

    if (error || !data) {
        return null;
    }

    return (
        <Box sx={{ background: "white", py: 8, px: 4 }}>
            <Container>
                <Typography variant="h4" fontWeight="bold" mb={4}>
                    Explore Categories
                </Typography>

                <Grid2 container spacing={3}>
                    {loading
                        ? Array.from(new Array(8)).map((_, index) => (
                            <Grid2
                                key={index}
                                size={{ xs: 6, sm: 3 }}>
                                <Skeleton
                                    variant="rectangular"
                                    height={50}
                                    sx={{ borderRadius: 1 }}
                                />
                            </Grid2>
                        ))
                        : data?.data.map((category) => (
                            <Grid2
                                key={category.id}
                                onClick={() => navigate(`/find-jobs?keyword=${category.name.toLowerCase()}`)}
                                size={{ xs: 6, sm: 3 }}
                                sx={{
                                    textAlign: "center",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: 1.5,
                                    p: 2,
                                    borderRadius: 0,
                                    backgroundColor: `${colors.secondory.veryLight}`,
                                    transition: "all 0.3s ease",
                                    cursor: "pointer",
                                    position: "relative",
                                    "&:hover": {
                                        backgroundColor: "primary.main",
                                        color: "white",
                                        transform: "scale(1.05)",
                                        borderRadius: 1,
                                    },
                                    "&:hover .icon": {
                                        opacity: 1,
                                        transform: "translateX(4px)",
                                    },
                                }}
                            >
                                <Typography fontWeight="600">{category.name}</Typography>
                                <ArrowOutward
                                    fontSize="small"
                                    className="icon"
                                    sx={{
                                        opacity: 0,
                                        transition: "opacity 0.3s ease, transform 0.3s ease",
                                    }}
                                />
                            </Grid2>
                        ))}
                </Grid2>
            </Container>
        </Box>
    );
};

export default CategorySection;
