"use client";
import { useState } from "react";
import { signup } from "@/api/functions/authApi"; // Ensure this path is correct
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "next/link";
import { toast } from "react-toastify"; // Import toast

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    // Specify the event type
    e.preventDefault();
    setError(null);
    try {
      await signup({ email, password });
      toast.success("Registration successful!"); // Show success toast
      router.push("/login"); // Redirect to login on successful signup
    } catch (err) {
      toast.error("Signup failed. Please try again."); // Show error toast
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" gutterBottom align="center">
        Register
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
          Register
        </Button>
        <h5>
          Already have an account? <Link href="/login">Login</Link>
        </h5>
      </form>
    </Box>
  );
}
