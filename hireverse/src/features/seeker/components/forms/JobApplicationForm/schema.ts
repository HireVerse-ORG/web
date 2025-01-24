import * as Yup from "yup";

export const JobApplicationFormSchema = Yup.object().shape({
    fullName: Yup.string()
        .min(3, "Full Name must be at least 3 characters")
        .required("Full Name is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    phoneNo: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
        .required("Phone number is required"),
    coverLetter: Yup.string()
        .min(20, "Cover Letter must be at least 20 characters")
        .notRequired(),
});