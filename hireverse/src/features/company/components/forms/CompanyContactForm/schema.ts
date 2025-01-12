import * as Yup from "yup";

export const ContactFormSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    phoneNumber: Yup.string()
        .matches(
            /^(\+?\d{1,4}|\d{1,4})?\s?\(?\d{1,4}\)?[\s.-]?\d{1,4}[\s.-]?\d{1,4}$/,
            "Phone number is not valid"
        )
        .required("Phone number is required"),
    website: Yup.string().url("Invalid website URL").notRequired(),
    socialMedia: Yup.object().shape({
        linkedIn: Yup.string().url("Invalid URL").notRequired(),
        twitter: Yup.string().url("Invalid URL").notRequired(),
        facebook: Yup.string().url("Invalid URL").notRequired(),
        instagram: Yup.string().url("Invalid URL").notRequired(),
    }),
});
