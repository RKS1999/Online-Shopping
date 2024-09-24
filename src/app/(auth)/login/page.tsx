"use client";
import { useState } from "react";
import { login } from "@/api/functions/authApi"; // Ensure this path is correct
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from 'react-toastify'; // Import toast

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/'; // Default to home if no redirect

  const handleSubmit = async (e: React.FormEvent) => { // Specify the event type
    e.preventDefault();
    setError(null);
    try {
      await login({ email, password });
      toast.success("Login successful!"); // Show success toast
      router.push(redirectPath); // Redirect to the original page after successful login
    } catch (err) {
      toast.error("Login failed. Please check your credentials."); // Show error toast
    }
  };

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
        <h5>Don't have an account? <Link href="/register">Register</Link></h5>
      </form>
    </Box>
  );
}