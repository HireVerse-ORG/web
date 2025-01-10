import axios from "@core/lib/axios";
import { ISkill } from "@core/types/skill.interface";
import { apiWrapper } from "@core/utils/helper";

export const searchSkills = async (query: string): Promise<ISkill[]> => {
    const url = `/jobs/skills/search?query=${query}`;
    return (await apiWrapper(axios.get<ISkill[]>(url))).data;
};