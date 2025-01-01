import * as Yup from "yup";

export const SkillSchema = Yup.object().shape({
    name: Yup.string()
        .required("Skill name is required")
        .matches(/^[a-zA-Z0-9\s]*$/, "Skill name can only contain letters, numbers, and spaces"), 
    isActive: Yup.boolean(),
});
