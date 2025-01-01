import { useState, useEffect } from "react";
import { listUsers } from "@core/api/admin/userapi";
import { toast } from "sonner";
import { UserRoles } from "@core/types/user.interface";
import { dateFormatter } from "@core/utils/helper";

export default function useUser(role: UserRoles, currentPage: number, searchQuery: string) {
  const [rows, setRows] = useState<any[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSeekers = async () => {
      setLoading(true);
      try {
        const response = await listUsers(role, currentPage, 10, searchQuery);
        const { data, total, totalPages } = response;
        setTotalUsers(total);
        setTotalPages(totalPages);
        setRows(data.map((user: any) => ({
          id: user.id,
          profile: "N/A",
          name: user.fullname || "N/A",
          email: user.email,
          joined: dateFormatter(user.createAt),
          status: user.isBlocked ? "Blocked" : "Active",
        })));
      } catch (error: any) {
        toast.error(error.message || "Failed to fetch seekers");
      } finally {
        setLoading(false);
      }
    };
    fetchSeekers();
  }, [currentPage, searchQuery]);

  return { rows, setRows, totalUsers, totalPages, loading };
}
