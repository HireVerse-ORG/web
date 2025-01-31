import SecondaryLightLayout from '@core/components/layouts/SecondoryLightLayout';
import SearchWithLocation from '@core/components/ui/SearchWithLocation';
import { ICompanyProfile } from '@core/types/company.interface';
import { Box, Pagination, Skeleton, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CompanyFilters, { ICompanyFilter } from './CompanyFilters';
import { listPublicCompanies } from '@core/api/shared/companyApi';
import CompanyCard from './CompanyCard';

const FindCompanies = () => {
    const [loading, setLoading] = useState(false);
    const [companies, setCompanies] = useState<ICompanyProfile[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalCompanies, setTotalCompanies] = useState(0);
    const [location, setLocation] = useState({ location: "", city: "", country: "" });
    const [companyTitle, setCompanyTitle] = useState("");
    const [filters, setFilters] = useState<ICompanyFilter>({
        companyTypes: [],
        industries: [],
    });

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const keyword = searchParams.get("keyword") || "";
        const location = searchParams.get("location") || "";
        const city = searchParams.get("city") || "";
        const country = searchParams.get("country") || "";

        setCompanyTitle(keyword);
        setLocation({ location, city, country });
    }, [searchParams]);

    const fetchCompanies = async () => {
        setLoading(true);
        try {
            const response = await listPublicCompanies(page, 10, {
                query: companyTitle,
                ...location,
                place: location.location,
                ...filters,
            });
            setCompanies(response.data);
            setTotalPages(response.totalPages);
            setTotalCompanies(response.total);
        } catch (error) {
            setCompanies([]);
            setTotalPages(1);
            setTotalCompanies(0);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (companyTitle || location.location || location.city || location.country) {
            fetchCompanies();
        }
    }, [page, companyTitle, location, filters.companyTypes, filters.industries]);

    const handleSearch = (title: string, loc: { location: string; city: string; country: string }) => {
        setCompanyTitle(title);
        setLocation(loc);
        setFilters({
            companyTypes: [],
            industries: [],
        });
        setPage(1);

        setSearchParams({ keyword: title, location: loc.location, city: loc.city, country: loc.country });
    };

    const handleCompanyFilterChange = (filter: ICompanyFilter) => {
        setFilters(filter);
        setPage(1);
    };

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        setSearchParams({ ...searchParams, page: value.toString() });
    };
    return (
        <SecondaryLightLayout header={
            <Box sx={{ width: "100%", maxWidth: "1000px", mx: "auto" }}>
                <SearchWithLocation onSearch={handleSearch} placeholder="Company Name" searching={loading} />
            </Box>
        }>
            <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
                {/* Filters */}
                <Box
                    sx={{
                        display: { xs: "flex", sm: "block" },
                        justifyContent: "end",
                        width: "100%",
                        maxWidth: { xs: "auto", sm: "250px" },
                    }}
                >
                    <CompanyFilters onApplyFilters={handleCompanyFilterChange} />
                </Box>

                {/* Companies List */}
                <Box flexGrow={1}>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                            Companies
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            Showing {totalCompanies} {totalCompanies === 1 ? "result" : "results"}
                        </Typography>
                    </Box>

                    {/* Show Skeleton Loading while Fetching Companies */}
                    {loading ? (
                        <Stack spacing={2}>
                            {[...Array(5)].map((_, index) => (
                                <Skeleton variant="rectangular" width="100%" height={120} key={index} />
                            ))}
                        </Stack>
                    ) : (
                        <Box sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            flexDirection: { xs: "column", sm: "row" },
                            alignItems: { xs: "center", sm: "normal" },
                            gap: 2,
                        }}>
                            {/* Show Companies if Available */}
                            {companies.length > 0 &&
                                companies.map((company) => (
                                    <Box mb={1} key={company.id} sx={{ maxWidth: 250 }}>
                                        <CompanyCard data={{
                                            name: company.name,
                                            image: company.image,
                                            location: company.location,
                                            industry: company.industry,
                                            type: company.companyType,
                                        }} 
                                        onClick={() => navigate(`/company-view/${company.companyId}`)}
                                        />
                                    </Box>
                                ))}
                        </Box>
                    )}

                    {/* Pagination */}
                    {companies.length > 0 && (
                        <Box display="flex" justifyContent="center" py={3}>
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={handlePageChange}
                                color="primary"
                                sx={{ mt: 3 }}
                            />
                        </Box>
                    )}
                </Box>
            </Box>
        </SecondaryLightLayout>
    );
}

export default FindCompanies;
