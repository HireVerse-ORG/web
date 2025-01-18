import { useState, useEffect } from "react";
import { toast } from "sonner";
import { dateFormatter } from "@core/utils/helper";
import { listCompanies, listCompanyProfile } from "@core/api/admin/companyApi";
import { CompanyProfileStatus } from "@core/types/company.interface";

export default function useCompany(currentPage: number, searchQuery: string, status?: string) {
  const [rows, setRows] = useState<any[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSeekers = async () => {
      setLoading(true);
      try {
        const response = status === "all" ? await listCompanies(currentPage, 10, searchQuery) : await listCompanyProfile(currentPage, 10, status as CompanyProfileStatus);
        const { data, total, totalPages } = response;
        setTotalUsers(total);
        setTotalPages(totalPages);
        if(status === "all"){
          setRows(data.map((user: any) => ({
            id: user.id,
            profile: user.profile?.name || "N/A",
            name: user.fullname || "N/A",
            email: user.email,
            joined: dateFormatter(user.createAt),
            status: user.isBlocked ? "Blocked" : "Active",
            profileData: user.profile || null
          })));
        } else {
          setRows(data.map((profile: any) => ({
            id: profile.id,
            profile: profile?.name || "N/A",
            name: profile?.name || "N/A",
            email: profile.email || "N/A",
            joined: dateFormatter(profile.createdAt),
            status: profile.isBlocked ? "Blocked" : "Active",
            profileData: profile || null
          })));
        }
      } catch (error: any) {
        setRows([])
        toast.error(error.message || "Failed to fetch companies");
      } finally {
        setLoading(false);
      }
    };
    fetchSeekers();
  }, [currentPage, searchQuery, status]);

  return { rows, setRows, totalUsers, totalPages, loading };
}
