import { useState, useEffect } from "react";
import { toast } from "sonner";
import { dateFormatter } from "@core/utils/helper";
import { IJobCategory } from "@core/types/jobCategory.interface";
import { listJobCategory } from "@core/api/admin/jobCategoryApi";

const useJobCategory = (page: number, limit: number, searchQuery: string) => {
    const [jobCategories, setJobCategories] = useState<IJobCategory[]>([]);
    const [totalJobCategory, setTotalJobCategory] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    const fetchJobCategory = async () => {
        setLoading(true);
        try {
            const data = await listJobCategory(page, limit, searchQuery);
            setJobCategories(data.data.map(skill => ({ ...skill, createdAt: dateFormatter(new Date(skill.createdAt)) })));
            setTotalJobCategory(data.total);
            setTotalPages(data.totalPages);
        } catch (err: any) {
            toast.error(err || "Failed to fetch Job Categories");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobCategory();
    }, [page, limit, searchQuery]);

    return { jobCategories, setJobCategories, totalJobCategory, totalPages, loading, refetch: fetchJobCategory };
};

export default useJobCategory;
