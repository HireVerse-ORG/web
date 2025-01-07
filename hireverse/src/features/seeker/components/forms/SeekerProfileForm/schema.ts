import * as Yup from "yup";

export const SeekerProfileSchema = Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    currentTitle: Yup.string().required("Current position is required"),
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
});
