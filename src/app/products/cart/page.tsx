"use client";
import React from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useAppDispatch, useAppSelector } from "@/hooks/redux/page";
import {
  removeFromCart,
  updateQuantity,
} from "@/redux-toolkit/slice/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const Cart = () => {
  const dispatch = useAppDispatch();
  const state: any = useAppSelector((state) => state.cart);
  const cartData = state.cartData;

  const totalQuantity = cartData.reduce(
    (total: number, item: any) => total + item.qty,
    0
  );
  const totalAmount = cartData.reduce(
    (total: number, item: any) => total + item.price * item.qty,
    0
  );

  const handleUpdateQuantity = (id: number, qty: number) => {
    if (qty < 1) qty = 1;
    dispatch(updateQuantity({ id, qty }));
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
    toast.error("Item removed from cart", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <ToastContainer />
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Your Cart
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {cartData.length > 0 ? (
            cartData.map((item: any) => (
              <Card key={item.id} sx={{ display: "flex", marginBottom: 2 }}>
                <CardMedia
                  component="img"
                  sx={{ width: 151, objectFit: "contain" }}
                  image={item.image || "/path/to/placeholder-image.jpg"} // Fallback image
                  alt={item.title}
                />
                <CardContent
                  sx={{
                    flex: "1 0 auto",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography component="div" variant="h6">
                    {item.title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    ${item.price}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.qty - 1)
                      }
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography>{item.qty}</Typography>
                    <IconButton
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.qty + 1)
                      }
                    >
                      <AddIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleRemoveItem(item.id)}
                      color="error"
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="h6">Your cart is empty</Typography>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography>Total Quantity:</Typography>
              <Typography>{totalQuantity}</Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography>Total Amount:</Typography>
              <Typography>${totalAmount.toFixed(2)}</Typography>
            </Box>
            <Button variant="contained" color="primary" fullWidth>
              Proceed to Checkout
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Cart;
