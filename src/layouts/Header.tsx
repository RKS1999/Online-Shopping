"use client"; // Ensure this file is recognized as a client component
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "@mui/material";
import { logout } from "../api/functions/authApi"; // Ensure correct path to your authApi
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = [
  { label: "Home", href: "/" },
  { label: "All Products", href: "/products" },
  { label: "Contact", href: "/contact" },
];

const Header = (props: Props) => {
  const { window } = props;
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const open = Boolean(anchorEl);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      handleMenuClose();
      router.push("/login"); // Redirect to login after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const count = cartItems.reduce((total: number, item: any) => {
      return total + item.quantity;
    }, 0);
    setCartItemCount(count);

    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Online Shopping
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <Link href={item.href} passHref>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box style={{ display: "flex", marginBlockEnd: "70px"  }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: "white", color: "black" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Link href="/" passHref>
            <img
              src="https://static.vecteezy.com/system/resources/previews/016/218/971/original/online-shop-logo-template-with-dark-blue-background-suitable-for-your-design-need-logo-illustration-animation-etc-free-vector.jpg"
              alt="Online Shopping"
              width={40}
              height={40}
              style={{ borderRadius: "50px" }}
            />
          </Link>
          <Container
            sx={{
              display: { xs: "none", sm: "flex" },
              justifyContent: "center",
              flexGrow: 1,
            }}
          >
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} passHref>
                <Button variant="text" color="inherit">
                  {item.label}
                </Button>
              </Link>
            ))}
          </Container>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton color="inherit">
              <Badge badgeContent={cartItemCount} color="error">
                <Link href="/products/cart" passHref>
                  <ShoppingCartIcon />
                </Link>
              </Badge>
            </IconButton>
            {isLoggedIn ? (
              <Box>
                <IconButton color="inherit" onClick={handleMenuClick}>
                  <AccountCircleIcon />
                </IconButton>
                <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                  <MenuItem onClick={handleMenuClose}>
                    <Link href="/profile" passHref>
                      Profile
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Box>
            ) : (
              <Box>
                <Link href="/login" passHref>
                  <Button color="inherit">Login</Button>
                </Link>
                <Link href="/register" passHref>
                  <Button color="inherit">Register</Button>
                </Link>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={
            window !== undefined ? () => window().document.body : undefined
          }
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Header;
