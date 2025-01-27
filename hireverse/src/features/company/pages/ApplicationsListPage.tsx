import { useEffect, useState } from "react";
import ApplicantsTableContent from "../components/ApplicantsTableContent";
import { CompanyJobApplicantTableData } from "../components/applicants/ApplicantsTable";
import { IJobApplication, JobApplicationStatus } from "@core/types/job.application.interface";
import { debounce } from "@mui/material";
import useGet from "@core/hooks/useGet";
import { listCompanyApplicants } from "@core/api/company/jobApplicationApi";
import { IPaginationResponse } from "@core/types/pagination.interface";
import { useCompanyContext } from "@core/contexts/CompanyContext";

const ApplicationsListPage = () => {
    const {companyProfile} = useCompanyContext();
    const [applicants, setApplicants] = useState<CompanyJobApplicantTableData[]>([]);
    const [totalApplicants, setTotalApplicants] = useState<number>(0);
    const [totalApplicantsPage, setTotalApplicantsPage] = useState<number>(0);
    const [applicantSearchQuery, setApplicantSearchQuery] = useState("");
    const [applicantCurrentPage, setApplicantCurrentPage] = useState(1);
    const [applicantStatus, setApplicantStatus] = useState<JobApplicationStatus | "all">('all');

    const { data, loading, refetch } = useGet<IPaginationResponse<IJobApplication>>(() => listCompanyApplicants({
        companyProfileId: companyProfile?.id,
        page: applicantCurrentPage,
        limit: 10,
        query: applicantSearchQuery,
        status: applicantStatus !== "all" ? applicantStatus : undefined
    }));

    useEffect(() => {
        if(data){
            refetch();
        }
    }, [applicantCurrentPage, applicantSearchQuery, applicantStatus])

    useEffect(() => {
        if(data){
            const mappedApplicants: CompanyJobApplicantTableData[] = data.data.map(dt => ({
                applicationId: dt.id,
                role: dt.jobRole,
                email: dt.email,
                fullName: dt.fullName,
                hiringStage: dt.status,
                appliedDate: dt.createdAt,
            }));

            setApplicants(mappedApplicants);
            setTotalApplicants(data.total);
            setTotalApplicantsPage(data.totalPages);
        }   
    }, [data])


    const handleApplicantSearch = debounce((value: string) => {
        setApplicantSearchQuery(value);
        setApplicantCurrentPage(1);
    }, 500);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        setApplicantCurrentPage(page);
    };

    const handleFilterChange = (value: JobApplicationStatus | "all") => {
        setApplicantStatus(value);
        setApplicantCurrentPage(1);
    }

    return (
        <ApplicantsTableContent
            applicants={applicants}
            applicantsLoading={loading}
            totalApplicants={totalApplicants}
            totalApplicantsPage={totalApplicantsPage}
            applicantCurrentPage={applicantCurrentPage}
            handleApplicantSearch={handleApplicantSearch}
            handlePageChange={handlePageChange}
            onFilterChange={handleFilterChange}
            showRoleColumn
        />
    );
}

export default ApplicationsListPage;
