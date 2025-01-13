import { useState, useEffect } from "react";
import { toast } from "sonner";
import { dateFormatter } from "@core/utils/helper";
import { listCompanies } from "@core/api/admin/companyApi";

export default function useCompany(currentPage: number, searchQuery: string, status="all") {
  const [rows, setRows] = useState<any[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSeekers = async () => {
      setLoading(true);
      try {
        const response = await listCompanies(currentPage, 10, searchQuery, status);
        const { data, total, totalPages } = response;
        setTotalUsers(total);
        setTotalPages(totalPages);
        setRows(data.map((user: any) => ({
          id: user.id,
          profile: user.profile.name || "N/A",
          name: user.fullname || "N/A",
          email: user.email,
          joined: dateFormatter(user.createAt),
          status: user.isBlocked ? "Blocked" : "Active",
          profileData: user.profile || null
        })));
      } catch (error: any) {
        toast.error(error.message || "Failed to fetch companies");
      } finally {
        setLoading(false);
      }
    };
    fetchSeekers();
  }, [currentPage, searchQuery, status]);

  return { rows, setRows, totalUsers, totalPages, loading };
}
