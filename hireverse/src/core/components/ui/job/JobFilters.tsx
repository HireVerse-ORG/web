import { useEffect, useState } from "react";
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
import CustomDialog from "../CustomDialog";
import { EMPLOYMENT_TYPES } from "@core/data/companyFormData";
import { jobCategoryListByJobKeyword } from "@core/api/shared/jobCategoryApi";

type JobFiltersProps = {
    onApplyFilters: (filters: any) => void;
    jobKeyword?: string;
};

export interface IJobFilter {
    employmentTypes: string[];
    categories: string[];
    salaryRange: string;
    [key: string]: string | string[];
}

const JobFilters = ({ onApplyFilters, jobKeyword }: JobFiltersProps) => {
    const [categories, setCategories] = useState<{ label: string; value: string }[]>([]);
    const [filters, setFilters] = useState<IJobFilter>({
        employmentTypes: [],
        categories: [],
        salaryRange: "",
    });

    const fetchCategories = async (keyWord: string) => {
        try {
            const data = await jobCategoryListByJobKeyword(keyWord);
            const mappedCategory = data.map((ct) => ({ value: ct, label: ct }));
            setCategories(mappedCategory);
        } catch (error) {
            setCategories([]);
        }
    };

    useEffect(() => {
        if (jobKeyword) {
            fetchCategories(jobKeyword);
        }
    }, [jobKeyword]);

    const [modalOpen, setModalOpen] = useState(false);
    const isSmallScreen = useMediaQuery("(max-width: 768px)");

    const handleFilterChange = (filterType: string, value: string) => {
        setFilters((prev) => {
            if (filterType === "salaryRange") {
                return { ...prev, [filterType]: prev.salaryRange === value ? "" : value };
            } else {
                const selected = prev[filterType] as string[];
                const updated = selected.includes(value)
                    ? selected.filter((item) => item !== value)
                    : [...selected, value];
                return { ...prev, [filterType]: updated };
            }
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

    const salaryRanges: { label: string; value: string }[] = [
        { label: "0-20000", value: "0-20000" },
        { label: "20001-50000", value: "20001-50000" },
        { label: "50001-100000", value: "50001-100000" },
        { label: "100001+", value: "100001-10000000" },
    ];

    const renderFilterContent = () => (
        <>
            <Accordion sx={accordianStyle}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography sx={accordianTitleStyle}>Types of Employment</Typography>
                </AccordionSummary>
                <AccordionDetails sx={accordianContentStyle}>
                    {EMPLOYMENT_TYPES.map(({ value, label }: { value: string; label: string }) => (
                        <FormControlLabel
                            key={value}
                            control={
                                <Checkbox
                                    checked={filters.employmentTypes.includes(value)}
                                    onChange={() => handleFilterChange("employmentTypes", value)}
                                />
                            }
                            label={label}
                        />
                    ))}
                </AccordionDetails>
            </Accordion>

            {/* Categories */}
            <Accordion sx={accordianStyle}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography sx={accordianTitleStyle}>Categories</Typography>
                </AccordionSummary>
                <AccordionDetails sx={accordianContentStyle}>
                    {categories.map(({ value, label }) => (
                        <FormControlLabel
                            key={value}
                            control={
                                <Checkbox
                                    checked={filters.categories.includes(value)}
                                    onChange={() => handleFilterChange("categories", value)}
                                />
                            }
                            label={label}
                        />
                    ))}
                </AccordionDetails>
            </Accordion>

            {/* Salary Range */}
            <Accordion sx={accordianStyle}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography sx={accordianTitleStyle}>Salary Range</Typography>
                </AccordionSummary>
                <AccordionDetails sx={accordianContentStyle}>
                    {salaryRanges.map(({ value, label }) => (
                        <FormControlLabel
                            key={value}
                            control={
                                <Checkbox
                                    checked={filters.salaryRange === value}
                                    onChange={() => handleFilterChange("salaryRange", value)}
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

export default JobFilters;
