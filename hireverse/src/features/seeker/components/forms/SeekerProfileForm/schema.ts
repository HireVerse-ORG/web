import * as Yup from "yup";

export const SeekerProfileSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    currentTitle: Yup.string().required("Current position is required"),
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
    profileImage: Yup.mixed().required("Profile image is required"),
});
