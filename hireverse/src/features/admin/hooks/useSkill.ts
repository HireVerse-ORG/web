import { useState, useEffect } from "react";
import { listSkills } from "@core/api/admin/skillapi";
import { ISkill } from "@core/types/skill.interface";
import { toast } from "sonner";
import { dateFormatter } from "@core/utils/helper";

const useSkills = (page: number, limit: number, searchQuery: string) => {
    const [skills, setSkills] = useState<ISkill[]>([]);
    const [totalSkills, setTotalSkills] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    const fetchSkills = async () => {
        setLoading(true);
        try {
            const data = await listSkills(page, limit, searchQuery);
            setSkills(data.data.map(skill => ({ ...skill, createdAt: dateFormatter(new Date(skill.createdAt)) })));
            setTotalSkills(data.total);
            setTotalPages(data.totalPages);
        } catch (err: any) {
            toast.error(err || "Failed to fetch skills");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSkills();
    }, [page, limit, searchQuery]);

    return { skills, setSkills, totalSkills, totalPages, loading, refetch: fetchSkills };
};

export default useSkills;
