"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { logout } from "@/api/functions/authApi"; // Ensure the path is correct
import { toast } from "react-toastify";

// Define User interface
interface User {
  email: string;
  name: string;
  // Add more properties if needed
}

const Container = styled(Box)(({ theme }) => ({
  maxWidth: "600px",
  margin: "auto",
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null); // Specify user type

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // Redirect to login if user data is not found
      router.push("/login");
    }
  }, [router]);

  const handleLogout = async () => {
    try {
      await logout(); // Call logout function
      localStorage.removeItem("user"); // Remove user data from local storage
      toast.success("Logged out successfully!");
      router.push("/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  // Add a loading state to handle async operations gracefully
  if (user === null) {
    return <Typography align="center">Loading...</Typography>; // Show loading text while checking for user data
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center">
        Profile
      </Typography>
      <Typography variant="h6">User Details:</Typography>
      <Typography variant="body1">Email: {user.email}</Typography>
      <Typography variant="body1">Name: {user.name || "N/A"}</Typography>
      <Box mt={4}>
        <Button variant="contained" color="primary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default Profile;
