import * as Yup from "yup";

export const JobCategorySchema = Yup.object().shape({
    name: Yup.string()
        .required("Category name is required")
        .matches(/^[a-zA-Z0-9\s]*$/, "Category name can only contain letters, numbers, and spaces"), 
    isActive: Yup.boolean(),
});
