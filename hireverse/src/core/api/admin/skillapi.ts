import axios from "@core/lib/axios"
import { handleApiError } from "@core/utils/helper";

export const listSkills = async (): Promise<void> => {
    try {
        return (await axios.get('/jobs/skills')).data;
    } catch (error: any) {
        throw handleApiError(error);
    }
}