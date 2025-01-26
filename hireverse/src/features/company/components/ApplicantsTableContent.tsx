import { FilterList } from "@mui/icons-material";
import { Box, Button, Menu, MenuItem, Typography, CircularProgress, Pagination } from "@mui/material";
import { useState } from "react";
import SearchBox from "@core/components/ui/SearchBox";
import ApplicantsTable from "../components/ApplicantsTable";
import { JobApplicationStatus } from "@core/types/job.application.interface";
import { CompanyJobApplicantTableData } from "../components/ApplicantsTable";

type ApplicantsTableContentProps = {
  applicants: CompanyJobApplicantTableData[];
  applicantsLoading: boolean;
  totalApplicants: number;
  totalApplicantsPage: number;
  applicantCurrentPage: number;
  handleApplicantSearch: (query: string) => void;
  handlePageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
  onFilterChange: (status: JobApplicationStatus | "all") => void;
  showRoleColumn?: boolean;
};

const ApplicantsTableContent = ({
  applicants,
  applicantsLoading,
  totalApplicants,
  totalApplicantsPage,
  applicantCurrentPage,
  handleApplicantSearch,
  handlePageChange,
  onFilterChange,
  showRoleColumn
}: ApplicantsTableContentProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  const open = Boolean(anchorEl);

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleFilterSelect = (status: { label: string; value: JobApplicationStatus | "all" }) => {
    setSelectedStatus(status.label);
    onFilterChange(status.value);
    handleFilterClose();
  };

  const MenuStatus: { label: string; value: JobApplicationStatus | "all" }[] = [
    { label: "All", value: "all" },
    { label: "Applied", value: "applied" },
    { label: "In Review", value: "in-review" },
    { label: "Shortlisted", value: "shortlisted" },
    { label: "Interviewing", value: "interview" },
    { label: "Hired", value: "hired" },
    { label: "Declined", value: "declined" },
  ];

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        flexWrap={{ xs: "wrap-reverse", sm: "nowrap" }}
        alignItems={{ xs: "start", sm: "center" }}
        gap={2}
        sx={{ paddingBlock: 2, mb: 2, backgroundColor: "white", position: "sticky", top: 0, zIndex: 1 }}
      >
        <Typography variant="h6" fontWeight="bold">
          Total Applications: {totalApplicants}
        </Typography>

        <Box display="flex" alignItems="center" gap={2}>
          <SearchBox placeholder="Search applicants" onSearch={handleApplicantSearch} />

          <Box>
            <Button size="small" variant="text" startIcon={<FilterList />} onClick={handleFilterClick}>
              {selectedStatus}
            </Button>

            <Menu anchorEl={anchorEl} open={open} onClose={handleFilterClose}>
              {MenuStatus.map((status) => (
                <MenuItem
                  key={status.value}
                  onClick={() => handleFilterSelect(status)}
                  selected={status.label === selectedStatus}
                  sx={{textWrap: "nowrap"}}
                >
                  {status.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Box>
      </Box>

      {applicantsLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="300px">
          <CircularProgress />
        </Box>
      ) : applicants.length === 0 ? (
        <Typography variant="h6" fontWeight="bold" sx={{ textAlign: "center", color: "gray", fontSize: "1.2rem", mt: 4, p: 2 }}>
          No applicants found
        </Typography>
      ) : (
        <>
          <ApplicantsTable data={applicants} showRoleColumn={showRoleColumn} />
          {totalApplicantsPage > 1 && (
            <Box display="flex" justifyContent="center" py={3}>
              <Pagination count={totalApplicantsPage} page={applicantCurrentPage} onChange={handlePageChange} color="primary" />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default ApplicantsTableContent;
