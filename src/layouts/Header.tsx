"use client";
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
import { logout } from "@/api/functions/authApi"; // Import the logout function
import { useRouter } from "next/navigation"; // Import useRouter for navigation

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = [
  { label: "Home", href: "/" },
  { label: "All Products", href: "/products" },
  { label: "Contact", href: "/contact" },
];

function Header(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [cartItemCount, setCartItemCount] = useState(0);
  const open = Boolean(anchorEl);
  const router = useRouter(); // Initialize useRouter

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout(); // Clear the cookie
    router.push("/login"); // Redirect to login page
  };

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const count = cartItems.reduce((total: number, item: any) => {
      return total + item.quantity;
    }, 0);
    setCartItemCount(count);
  }, []);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Online Shopping
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.href} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <Link
                href={item.href}
                passHref
                style={{ textDecoration: "none" }}
              >
                <ListItemText primary={item.label} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Container maxWidth="lg" sx={{ display: "flex", marginBlockEnd: "64px" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { xs: "block", sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <img
              src="https://static.vecteezy.com/system/resources/previews/016/218/971/original/online-shop-logo-template-with-dark-blue-background-suitable-for-your-design-need-logo-illustration-animation-etc-free-vector.jpg"
              alt="Best Shop Logo"
              width={50}
              height={50}
              style={{
                borderRadius: "10px",
                marginRight: "20px",
              }}
            />
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "flex" },
                justifyContent: "center",
              }}
            >
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} passHref>
                  <Button sx={{ color: "#fff", mx: 2 }}>{item.label}</Button>
                </Link>
              ))}
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton
              color="inherit"
              aria-label="cart"
              sx={{ display: { xs: "block", sm: "block" } }}
            >
              <Link href="/products/cart" passHref>
                <Badge badgeContent={cartItemCount} color="error">
                  <ShoppingCartIcon sx={{ color: "white" }} />
                </Badge>
              </Link>
            </IconButton>

            <IconButton
              color="inherit"
              aria-label="account"
              onClick={handleMenuClick}
            >
              <AccountCircleIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 10px rgba(0, 0, 0, 0.2))",
                  mt: 1.5,
                  "& .MuiMenuItem-root": {
                    py: 1,
                    px: 2,
                  },
                },
              }}
            >
              <MenuItem onClick={handleMenuClose}>
                <Link href="/login" passHref style={{ textDecoration: "none" }}>
                  Login
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link
                  href="/register"
                  passHref
                  style={{ textDecoration: "none" }}
                >
                  Register
                </Link>
              </MenuItem>
              <MenuItem onClick={handleLogout}> {/* Logout Menu Item */}
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
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
      </nav>
    </Container>
  );
}

export default Header;