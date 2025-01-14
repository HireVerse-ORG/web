import * as Yup from "yup";

export const contactUpdateSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    linkedin: Yup.string().url("Invalid URL").notRequired(),
    twitter: Yup.string().url("Invalid URL").notRequired(),
    facebook: Yup.string().url("Invalid URL").notRequired(),
    instagram: Yup.string().url("Invalid URL").notRequired(),
    phone: Yup.string()
        .matches(
            /^(\+?\d{1,4}[\s-])?(\(?\d{1,3}\)?[\s-]?)?[\d\s-]{7,}$/, 
            "Invalid phone number format"
        )
        .required("Phone number is required"),
});
