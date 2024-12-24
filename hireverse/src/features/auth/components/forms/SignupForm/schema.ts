import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
    fullName: Yup.string()
        .min(2, "Too short!")
        .max(50, "Too long!")
        .required("Full name is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
});

export default SignupSchema