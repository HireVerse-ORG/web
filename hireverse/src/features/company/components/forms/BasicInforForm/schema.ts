import * as Yup from "yup";

export const BasicInfoFormSchema = Yup.object({
    companyName: Yup.string().required("Company Name is required"),
    companyType: Yup.string().required("Company Type is required"),
    industry: Yup.string().required("Industry/Category is required"),
    location: Yup.object().shape({
        city: Yup.string().required("City is required"),
        country: Yup.string().required("Country is required"),
    }),
});
