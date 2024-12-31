import { blockUser } from "@core/api/admin/userapi";
import { useState } from "react";
import { toast } from "sonner";

export default function useBlockStatus() {
    const [disabledRows, setDisabledRows] = useState<string[]>([]);

    const toggleBlockStatus = async (id: string, isBlocked: boolean, updateRow: Function) => {
        setDisabledRows([...disabledRows, id]);
        try {
            await blockUser({ userId: id, isBlocked: !isBlocked });
            toast.success(`User ${!isBlocked ? "blocked" : "unblocked"} successfully`);
            updateRow(id, isBlocked);
        } catch (error: any) {
            toast.error(error.message || "Failed to update user status");
        } finally {
            setDisabledRows(prev => prev.filter(rowid => rowid !== id));
        }
    };

    return { disabledRows, toggleBlockStatus };
}
