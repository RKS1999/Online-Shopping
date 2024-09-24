"use client";
import { useState, useEffect } from "react"; // Import useEffect
import { login } from "@/api/functions/authApi"; // Ensure this path is correct
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify"; // Import toast

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state variable
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/"; // Default to home if no redirect

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login({ email, password });
      setIsLoggedIn(true); // Set logged in state to true
      toast.success("Login successful!"); // Show success toast
      router.push(redirectPath); // Redirect to the original page after successful login
    } catch (err) {
      toast.error("Login failed. Please check your credentials."); // Show error toast
    }
  };

  // Effect to check if user is already logged in
  useEffect(() => {
    const userCookie = document.cookie.split('; ').find(row => row.startsWith('user='));
    if (userCookie) {
      setIsLoggedIn(true); // User is already logged in
      router.push(redirectPath); // Redirect to the original page
    }
  }, [router, redirectPath]);

  // If the user is logged in, do not show the login form
  if (isLoggedIn) {
    return null; // Or you can return a loading spinner or redirect
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" gutterBottom align="center">
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" fullWidth>
          Login
        </Button>
        <h5>
          Create New Account? <Link href="/register">Register</Link>
        </h5>
      </form>
    </Box>
  );
}