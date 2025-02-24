import TableComponent, { TableColumn } from "@core/components/ui/TableComponent";
import { useCompanySubscription } from "@core/contexts/CompanySubscriptionContext";
import { JobApplicationStatus } from "@core/types/job.application.interface";
import { dateFormatter } from "@core/utils/helper";
import { getJobApplicationStatusDetails } from "@core/utils/ui";
import { Button, Chip, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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
    const {usage, applicationViewLimitExceeded} = useCompanySubscription();
    const navigate = useNavigate();

    const handleViewApplication = (applicationId: string, isDeclined: boolean) => {
        if (!isDeclined && applicationViewLimitExceeded && usage && !(usage.applicationIdsAccessed ?? []).includes(applicationId)) {
            toast.warning("You have exceeded the application view limit.");
            return;
        }
        navigate(`/company/applicant/${applicationId}`);
    };    

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
                return (
                    <Button
                        variant="outlined"
                        onClick={() => handleViewApplication(row.applicationId, row.hiringStage === "declined")}
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
