import {
    Box,
    Button,
    CircularProgress,
    TextField,
    Typography,
  } from "@mui/material";
  import { Link } from "react-router-dom";
  import { Formik, Form, Field } from "formik";
import SignupSchema from "./schema";
  
  const SignupForm = () => {
    const handleSubmit = async (values: {
      fullName: string;
      email: string;
      password: string;
      confirmPassword: string;
    }) => {
      console.log("Signup form values:", values);
      // Perform signup API call here
    };
  
    return (
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            {/* Full Name */}
            <Box mb={3}>
              <Typography variant="body1" fontWeight={500} textAlign="left" mb={1}>
                Full Name
              </Typography>
              <Field
                as={TextField}
                fullWidth
                name="fullName"
                type="text"
                variant="outlined"
                placeholder="Enter your full name"
                error={touched.fullName && !!errors.fullName}
                helperText={touched.fullName && errors.fullName}
              />
            </Box>
  
            {/* Email Address */}
            <Box mb={3}>
              <Typography variant="body1" fontWeight={500} textAlign="left" mb={1}>
                Email Address
              </Typography>
              <Field
                as={TextField}
                fullWidth
                name="email"
                type="email"
                variant="outlined"
                placeholder="Enter your email"
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />
            </Box>
  
            {/* Password */}
            <Box mb={3}>
              <Typography variant="body1" fontWeight={500} textAlign="left" mb={1}>
                Password
              </Typography>
              <Field
                as={TextField}
                fullWidth
                name="password"
                type="password"
                variant="outlined"
                placeholder="Enter your password"
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
              />
            </Box>
  
            {/* Confirm Password */}
            <Box mb={3}>
              <Typography variant="body1" fontWeight={500} textAlign="left" mb={1}>
                Confirm Password
              </Typography>
              <Field
                as={TextField}
                fullWidth
                name="confirmPassword"
                type="password"
                variant="outlined"
                placeholder="Confirm your password"
                error={touched.confirmPassword && !!errors.confirmPassword}
                helperText={touched.confirmPassword && errors.confirmPassword}
              />
            </Box>
  
            {/* Signup Button */}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress size={20} /> : "Continue"}
            </Button>
  
            {/* Login Link */}
            <Box mt={2} textAlign="left">
              <Typography variant="body2" color="text.disabled">
                Already have an account?{" "}
                <Link
                  to="/auth/?page=login"
                  style={{ textDecoration: "none", color: "primary.main", fontWeight: 500 }}
                >
                  Login
                </Link>
              </Typography>
            </Box>
          </Form>
        )}
      </Formik>
    );
  };
  
  export default SignupForm;
  