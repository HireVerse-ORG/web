import TableComponent, { TableColumn } from "@core/components/ui/TableComponent";
import { JobApplicationStatus } from "@core/types/job.application.interface";
import { dateFormatter } from "@core/utils/helper";
import { getJobApplicationStatusDetails } from "@core/utils/ui";
import { Button, Chip, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export interface CompanyJobApplicantTableData {
    applicationId: string;
    role: string;
    fullName: string;
    email: string;
    hiringStage: JobApplicationStatus;
    appliedDate: Date;
}

type ApplicantsTableProps = {
    data: CompanyJobApplicantTableData[];
    showRoleColumn?: boolean;
};

const ApplicantsTable = ({ data, showRoleColumn }: ApplicantsTableProps) => {
    const navigate = useNavigate();

    const columns: TableColumn[] = [
        ...(showRoleColumn
            ? [
                {
                    id: "role",
                    label: "Role",
                    minWidth: 150,
                },
            ]
            : []),
        {
            id: "fullName",
            label: "Full Name",
            minWidth: 150,
        },
        {
            id: "email",
            label: "Email",
            minWidth: 170,
        },
        {
            id: "hiringStage",
            label: "Hiring Stage",
            minWidth: 100,
            render: (row: CompanyJobApplicantTableData) => {
                const status = getJobApplicationStatusDetails(row.hiringStage);
                return (
                    <Chip
                        label={status.label}
                        color={status.color}
                        variant="outlined"
                    />
                );
            },
        },
        {
            id: "appliedDate",
            label: "Applied Date",
            minWidth: 100,
            render: (row: CompanyJobApplicantTableData) => (
                <>{dateFormatter(row.appliedDate)}</>
            ),
        },
        {
            id: "actions",
            label: "Actions",
            minWidth: 180,
            align: "center",
            render: (row: CompanyJobApplicantTableData) => {
                const handleViewApplication = () => {
                    navigate(`/company/applicant/${row.applicationId}`);
                };

                return (
                    <Button
                        variant="outlined"
                        onClick={handleViewApplication}
                        sx={{ whiteSpace: "nowrap" }}
                    >
                        See Application
                    </Button>
                );
            },
        },
    ]

    return (
        <Box>
            <TableComponent columns={columns} rows={data} />
        </Box>
    );
};

export default ApplicantsTable;
