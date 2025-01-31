import { useState } from "react";
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { ExpandMore, FilterList } from "@mui/icons-material";
import { industries, companyTypes } from "@core/data/companyFormData";
import CustomDialog from "@core/components/ui/CustomDialog";

type CompanyFiltersProps = {
    onApplyFilters: (filters: any) => void;
};

export interface ICompanyFilter {
    industries: string[];
    companyTypes: string[];
    [key: string]: string | string[];
}

const CompanyFilters = ({ onApplyFilters }: CompanyFiltersProps) => {
    const [filters, setFilters] = useState<ICompanyFilter>({
        industries: [],
        companyTypes: [],
    });

    const [modalOpen, setModalOpen] = useState(false);
    const isSmallScreen = useMediaQuery("(max-width: 768px)");

    const handleFilterChange = (filterType: string, value: string) => {
        setFilters((prev) => {
            const selected = prev[filterType] as string[];
            const updated = selected.includes(value)
                ? selected.filter((item) => item !== value)
                : [...selected, value];
            return { ...prev, [filterType]: updated };
        });
    };

    const applyFilters = () => {
        onApplyFilters(filters);
        if (isSmallScreen) setModalOpen(false);
    };

    const accordianStyle = {
        boxShadow: "none",
        "&:before": { display: "none" },
        border: "none",
    };
    const accordianContentStyle = { display: "flex", flexDirection: "column" };
    const accordianTitleStyle = { fontWeight: 500 };

    const renderFilterContent = () => (
        <>
            {/* Industries Filter */}
            <Accordion sx={accordianStyle}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography sx={accordianTitleStyle}>Industries</Typography>
                </AccordionSummary>
                <AccordionDetails sx={accordianContentStyle}>
                    {industries.map(({ value, label }) => (
                        <FormControlLabel
                            key={value}
                            control={
                                <Checkbox
                                    checked={filters.industries.includes(value)}
                                    onChange={() => handleFilterChange("industries", value)}
                                />
                            }
                            label={label}
                        />
                    ))}
                </AccordionDetails>
            </Accordion>

            {/* Company Types Filter */}
            <Accordion sx={accordianStyle}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography sx={accordianTitleStyle}>Company Types</Typography>
                </AccordionSummary>
                <AccordionDetails sx={accordianContentStyle}>
                    {companyTypes.map(({ value, label }) => (
                        <FormControlLabel
                            key={value}
                            control={
                                <Checkbox
                                    checked={filters.companyTypes.includes(value)}
                                    onChange={() => handleFilterChange("companyTypes", value)}
                                />
                            }
                            label={label}
                        />
                    ))}
                </AccordionDetails>
            </Accordion>

            {/* Apply Filters Button */}
            <Button
                variant="text"
                color="inherit"
                fullWidth
                onClick={applyFilters}
                sx={{ my: 2 }}
            >
                Apply Filters
            </Button>
        </>
    );

    return (
        <Box>
            {isSmallScreen ? (
                <>
                    <Button
                        variant="text"
                        onClick={() => setModalOpen(true)}
                        fullWidth
                        sx={{ width: "100px", color: "black" }}
                        startIcon={<FilterList />}
                    >
                        Filter
                    </Button>

                    {/* Modal for Filters */}
                    <CustomDialog open={modalOpen} onClose={() => setModalOpen(false)} title="Job Filters">
                        <Box>{renderFilterContent()}</Box>
                    </CustomDialog>
                </>
            ) : (
                // Sidebar Filters for Larger Screens
                <Box>{renderFilterContent()}</Box>
            )}
        </Box>
    );
};

export default CompanyFilters;
