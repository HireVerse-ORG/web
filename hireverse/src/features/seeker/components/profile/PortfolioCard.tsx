import { listSeekerPortfolio } from "@core/api/seeker/portfolioApi";
import AddButton from "@core/components/ui/AddButton";
import CustomDialog from "@core/components/ui/CustomDialog";
import EditButton from "@core/components/ui/EditButton";
import ScrollableContainer from "@core/components/ui/ScrollableContainer";
import useGet from "@core/hooks/useGet";
import colors from "@core/theme/colors";
import { SeekerPortfolio } from "@core/types/seeker.interface";
import { Box, Skeleton, Typography } from "@mui/material";
import { useState } from "react";
import SeekerPortfolioForm from "../forms/SeekerPortfolioForm";
import { DEAFULT_SEEKER_PORTFOLIO_IMAGE_URL } from "@core/utils/constants";

type PortfolioCardProps = {
    editable?: boolean;
    username?: string;
};

const PortfolioCard = ({ editable, username }: PortfolioCardProps) => {
    const { data: portfolios, setData: setPortfolios, loading, error } = useGet<SeekerPortfolio[]>(() => listSeekerPortfolio(username));

    const [portfolio, setPortfolio] = useState<SeekerPortfolio | null>(null);
    const [modelOpen, setModelOpen] = useState(false);

    const handleAddPortfolio = () => {
        setPortfolio(null);
        setModelOpen(true);
    };

    const handleEditPortfolio = (portfolio: SeekerPortfolio) => {
        setPortfolio(portfolio);
        setModelOpen(true);
    };

    const handleModelClose = () => setModelOpen(false);

    const handleAddPortfolioSuccess = (portfolio: SeekerPortfolio) => {
        setPortfolios((prevPortfolios) => [...prevPortfolios!, portfolio]);
        handleModelClose();
    };

    const handleEditPortfolioSuccess = (portfolio: SeekerPortfolio) => {
        setPortfolios((prevPortfolios) =>
            prevPortfolios!.map((prtf) =>
                prtf.id === portfolio.id ? { ...prtf, ...portfolio } : prtf
            )
        );
        handleModelClose();
    };

    const handleDeletePotfolioSuccess = (portfolio: SeekerPortfolio) => {
        setPortfolios((prevPortfolios) =>
            prevPortfolios!.filter((prtf) => prtf.id !== portfolio.id)
        );
        handleModelClose();
    }

    return (
        <Box sx={{ padding: 3, border: `1px solid ${colors.borderColour}` }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h6" fontWeight="bold">
                    Portfolios
                </Typography>
                {editable && <AddButton onClick={handleAddPortfolio} color="primary" />}
            </Box>

            {/* Portfolio Slider */}
            <ScrollableContainer
                sx={{
                    display: "flex",
                    overflowX: "auto",
                    gap: 2,
                    paddingBottom: 2,
                    mt: 2,
                }}
            >
                {loading && (
                    <>
                        {[...Array(4)].map((_, index) => (
                            <Box
                                key={index}
                                sx={{
                                    minWidth: 200,
                                    width: 200,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    border: `1px solid ${colors.borderColour}`,
                                }}
                            >
                                <Skeleton variant="rectangular" width="100%" height={150} />
                                <Skeleton variant="text" width="80%" sx={{ mt: 1 }} />
                            </Box>
                        ))}
                    </>
                )}

                {!loading && error && (
                    <Typography color="error" sx={{ mt: 2 }}>
                        Failed to load portfolios. Please try again.
                    </Typography>
                )}

                {/* Display Portfolios */}
                {!loading && !error && portfolios?.length ? (
                    portfolios.map((portfolio) => (
                        <Box
                            key={portfolio.id}
                            component="a"
                            href={portfolio.mediaLink || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                minWidth: 200,
                                width: 200,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                cursor: "pointer",
                                border: `1px solid ${colors.borderColour}`,
                                textDecoration: "none",
                                position: "relative",
                            }}
                        >
                            <Box
                                component="img"
                                src={portfolio.thumbnail || DEAFULT_SEEKER_PORTFOLIO_IMAGE_URL}
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
                                <EditButton
                                    onClick={(event) => {
                                        event.preventDefault();
                                        handleEditPortfolio(portfolio);
                                    }}
                                    color="white"
                                    sx={{
                                        position: "absolute",
                                        top: 8,
                                        right: 8,
                                        zIndex: 1,
                                    }}
                                />
                            )}
                        </Box>
                    ))
                ) : (
                    <Typography variant="body2">
                        No portfolios added.
                    </Typography>
                )}
            </ScrollableContainer>

            {/* form */}
            {editable && (
                <CustomDialog open={modelOpen} onClose={handleModelClose}>
                    <SeekerPortfolioForm portfolio={portfolio} onAdded={handleAddPortfolioSuccess}
                        onUpdated={handleEditPortfolioSuccess} onDeleted={handleDeletePotfolioSuccess} />
                </CustomDialog>
            )}
        </Box>
    );
};

export default PortfolioCard;
