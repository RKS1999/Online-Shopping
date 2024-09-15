import React from "react";
import Link from "next/link";
import {
  Box,
  Grid,
  Typography,
  InputBase,
  IconButton,
  Container,
} from "@mui/material";
import { IoLogoWhatsapp, IoEnter } from "react-icons/io5";
import { FaFacebook, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: "0px 0" }}>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography variant="h4">
            We are Expanding to serve you better!
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Typography variant="h6">
            Orders placed by 4pm PST will be shipped the next business day
          </Typography>
          <Typography variant="subtitle1">
            Same-day service is also available if ordered by 12pm PST
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <InputBase
              placeholder="Contact Now!"
              type="email"
              required
              sx={{
                width: "250px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "8px",
              }}
            />
            <IconButton
              sx={{
                color: "#0096FF",
                fontSize: "25px",
                ml: 1,
              }}
            >
              <IoEnter />
            </IconButton>
          </Box>
        </Box>
        <Grid
          container
          spacing={4}
          sx={{ textAlign: "center", margin: "10px 0", padding: "15px" }}
        >
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <img
                src="https://static.vecteezy.com/system/resources/previews/016/218/971/original/online-shop-logo-template-with-dark-blue-background-suitable-for-your-design-need-logo-illustration-animation-etc-free-vector.jpg"
                alt="Best Shop Logo"
                style={{ height: "200px", borderRadius: "50px" }}
              />
            </Box>
            <Box sx={{ margin: "10px", fontSize: "30px" }}>
              <Link href="https://www.linkedin.com/" passHref>
                <IconButton sx={{ color: "#0077B5", padding: "5px" }}>
                  <FaLinkedin />
                </IconButton>
              </Link>
              <Link href="https://wa.me/" passHref>
                <IconButton sx={{ color: "#25D366", padding: "5px" }}>
                  <IoLogoWhatsapp />
                </IconButton>
              </Link>
              <Link href="https://www.facebook.com/" passHref>
                <IconButton sx={{ color: "#0077B5", padding: "5px" }}>
                  <FaFacebook />
                </IconButton>
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h5" color="green" sx={{ textAlign: "left" }}>
              Menu
            </Typography>
            <br />
            <Box sx={{ textAlign: "left" }}>
              <Link href="/" passHref style={{ textDecoration: "none" }}>
                <Typography variant="subtitle1" sx={{ color: "#0096FF" }}>
                  Home
                </Typography>
              </Link>
              <Link
                href="/products"
                passHref
                style={{ textDecoration: "none" }}
              >
                <Typography variant="subtitle1" sx={{ color: "#0096FF" }}>
                  All Products
                </Typography>
              </Link>
              <Link href="/contact" passHref style={{ textDecoration: "none" }}>
                <Typography variant="subtitle1" sx={{ color: "#0096FF" }}>
                  Contact
                </Typography>
              </Link>
              <Link
                href="/products/cart"
                passHref
                style={{ textDecoration: "none" }}
              >
                <Typography variant="subtitle1" sx={{ color: "#0096FF" }}>
                  Cart
                </Typography>
              </Link>
              <Link href="/login" passHref style={{ textDecoration: "none" }}>
                <Typography variant="subtitle1" sx={{ color: "#0096FF" }}>
                  Login
                </Typography>
              </Link>
              <Link
                href="/register"
                passHref
                style={{ textDecoration: "none" }}
              >
                <Typography variant="subtitle1" sx={{ color: "#0096FF" }}>
                  Register
                </Typography>
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3} sx={{ textAlign: "left" }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <img
                  src="https://st4.depositphotos.com/4678277/40811/i/450/depositphotos_408110334-stock-photo-full-length-body-size-view.jpg"
                  alt="Shop Image 1"
                  style={{ padding: "2px", height: "150px", width: "150px" }}
                />
              </Grid>
              <Grid item xs={6}>
                <img
                  src="https://cdn.create.vista.com/api/media/small/464163046/stock-photo-cheerful-happy-teen-asian-woman-enjoying-shopping-she-carrying-shopping"
                  alt="Shop Image 2"
                  style={{ padding: "2px", height: "150px", width: "150px" }}
                />
              </Grid>
              <Grid item xs={6}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdIgKihpzJcI6htq6FlIzON-Sn35gfU3OPyVxjI4ydWFznzdlbacV59bHR2Vj1aJK2Osw&usqp=CAU"
                  alt="Shop Image 3"
                  style={{ padding: "2px", height: "150px", width: "150px" }}
                />
              </Grid>
              <Grid item xs={6}>
                <img
                  src="https://img.etimg.com/thumb/msid-54752786,width-480,height-360,imgsize-80020,resizemode-75/1-how-many-times-do-you-shop.jpg"
                  alt="Shop Image 4"
                  style={{ padding: "2px", height: "150px", width: "150px" }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h5" color="green">
              Get Connected!
            </Typography>
            <br />
            <Box>
              <Typography variant="subtitle1" sx={{ color: "#0096FF" }}>
                info@example.com
              </Typography>
              <Typography variant="subtitle1" sx={{ color: "#0096FF" }}>
                +123 456 7890
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <InputBase
                placeholder="Enter your email"
                type="email"
                required
                sx={{
                  width: "250px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  padding: "8px",
                }}
              />
              <IconButton
                sx={{
                  color: "#0096FF",
                  fontSize: "25px",
                  ml: 1,
                }}
              >
                <IoEnter />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Typography variant="subtitle2" sx={{ textAlign: "center", mt: 2 }}>
          ©2024 All Rights Reserved by{" "}
          <span style={{ color: "#0096FF", padding: "2px" }}>
            Online Shopping.
          </span>{" "}
          | Powered by{" "}
          <Typography
            variant="subtitle2"
            sx={{ textDecoration: "none", color: "#0096FF", padding: "2px" }}
            component="span"
          >
            Webskitters Accademy.
          </Typography>
        </Typography>
      </Box>
    </Container>
  );
};

export default Footer;
