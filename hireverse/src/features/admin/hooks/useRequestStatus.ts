import { acceptCompany, rejectCompany } from "@core/api/admin/companyApi";
import { useState } from "react";
import { toast } from "sonner";

export default function useRequestStatus() {
    const [disabledRows, setDisabledRows] = useState<string[]>([]);

    const handleRequest = async (
        id: string,
        action: "accept" | "reject",
        updateRow: Function
    ) => {
        setDisabledRows((prev) => [...prev, id]);
        try {
            if (action === "accept") {
                await acceptCompany(id);
                toast.success("Company accepted successfully");
            } else {
                await rejectCompany(id);
                toast.success("Company rejected successfully");
            }
            updateRow(id, action);
        } catch (error: any) {
            console.log(error);
            toast.error(error.message || `Failed to ${action} company`);
        } finally {
            setDisabledRows((prev) => prev.filter((rowId) => rowId !== id));
        }
    };

    return { disabledRows, handleRequest };
}
