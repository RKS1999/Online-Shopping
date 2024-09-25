"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify"; // Import toast
import { login } from "@/api/functions/authApi"; // Ensure the path is correct

const Container = styled(Box)(({ theme }) => ({
  maxWidth: "600px",
  margin: "auto",
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

const FormField = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  width: "400px",
  padding: theme.spacing(2),
  fontSize: "1rem",
}));

const ErrorMessage = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  textAlign: "center",
  marginTop: theme.spacing(1),
}));

const BackButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  textDecoration: "underline",
}));

const schema = yup.object({
  email: yup.string().email("Must be a valid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function Login() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      console.log("Attempting to log in with data:", data);
      const userData = await login(data); // Use the login function here
      console.log("User data received:", userData); // Log user data

      if (userData) {
        localStorage.setItem("user", JSON.stringify(userData)); // Save user data in local storage
        toast.success("Login successful!"); // Show success toast
        router.push("/products"); // Redirect to products page
        reset();
        setSubmitError(null);
      } else {
        toast.error("Login failed. No user data received."); // Handle unexpected case
        setSubmitError("An error occurred while logging in. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error); // Log the error
      toast.error("Login failed. Please check your credentials."); // Show error toast
      setSubmitError("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        height: "85vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
      }}
    >
      <Container>
        <Typography variant="h5" gutterBottom align="center">
          Login
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Link href={"/"} passHref>
            <BackButton variant="text">Close X</BackButton>
          </Link>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              fullWidth
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </FormField>
          <FormField>
            <TextField
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </FormField>
          {submitError && <ErrorMessage>{submitError}</ErrorMessage>}
          <SubmitButton type="submit" variant="contained" color="primary">
            Log In
          </SubmitButton>
        </form>
        <Link href={"/register"} passHref>
          <Typography variant="body2" align="center">
            Don&apos;t have an account? Register
          </Typography>
        </Link>
      </Container>
    </Box>
  );
}
