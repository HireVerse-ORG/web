import AddButton from "@core/components/ui/AddButton";
import EditButton from "@core/components/ui/EditButton";
import ScrollableContainer from "@core/components/ui/ScrollableContainer";
import colors from "@core/theme/colors";
import { Box, Typography } from "@mui/material";

type PortfolioCardProps = {
    editable?: boolean;
    username?: string;
}

const portfolios = [
    { id: 1, title: "Portfolio 1", image: "https://placehold.co/500x500", mediaLink: "dummy-link" },
    { id: 2, title: "Portfolio 2", image: "https://placehold.co/500x500", mediaLink: "dummy-link" },
    { id: 3, title: "Portfolio 3", image: "https://placehold.co/500x500", mediaLink: "dummy-link" },
    { id: 4, title: "Portfolio 4", image: "https://placehold.co/500x500", mediaLink: "dummy-link" },
];

const PortfolioCard = ({ editable, username }: PortfolioCardProps) => {
    return (
        <Box sx={{ padding: 3, border: `1px solid ${colors.borderColour}` }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h6" fontWeight="bold">
                    Portfolios
                </Typography>
                {editable && <AddButton color="primary" />}
            </Box>

            {/* Portfolio Slider */}
            <ScrollableContainer
                sx={{
                    display: "flex",
                    overflowX: "auto",
                    gap: 2,
                    paddingBottom: 2,
                    mt: 2
                }}
            >
                {portfolios.map((portfolio) => (
                    <Box
                        key={portfolio.id}
                        component="a"
                        href={portfolio.mediaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            minWidth: 200,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            cursor: "pointer",
                            border: `1px solid ${colors.borderColour}`,
                            textDecoration: 'none',
                            position: "relative", 
                        }}
                    >
                        <Box
                            component="img"
                            src={portfolio.image}
                            alt={portfolio.title}
                            sx={{
                                width: "100%",
                                height: 150,
                                objectFit: "cover",
                            }}
                            loading="lazy"
                        />
                        <Typography
                            variant="body1"
                            sx={{
                                marginTop: 1,
                                textAlign: "center",
                                padding: 1,
                                width: "100%",
                                fontWeight: "bold",
                                color: "text.primary",
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {portfolio.title}
                        </Typography>

                        {/* Edit Button */}
                        {editable && (
                            <EditButton color="white" sx={{
                                position: "absolute",
                                top: 8,
                                right: 8,
                                zIndex: 1,
                            }} />
                        )}
                    </Box>
                ))}
            </ScrollableContainer>
        </Box>
    );
}

export default PortfolioCard;
