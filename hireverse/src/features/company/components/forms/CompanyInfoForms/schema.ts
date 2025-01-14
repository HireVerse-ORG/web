import * as Yup from "yup";


export const CompanyInfoFormSchema = Yup.object().shape({
    name: Yup.string().required("Company name is required"),
    website: Yup.string().url("Please enter a valid URL").required("Website is required"),
    founded: Yup.date().nullable().notRequired(),  
    employeeCount: Yup.number().required("Employee count is required").min(1, "Employee count should be greater than 0"),
    location: Yup.object().shape({
        country: Yup.string().required("Country is required"),
        city: Yup.string().required("City is required"),
    }),
    industry: Yup.string().required("Industry is required"),
});
