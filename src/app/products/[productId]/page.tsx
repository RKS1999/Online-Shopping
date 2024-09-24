"use client";
import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  Chip,
  Rating,
  Container,
} from "@mui/material";
import { useGetProductDetails } from "@/hooks/react-query/useGetProductDetails";
import { useAppDispatch } from "@/hooks/redux/page";
import { addProduct } from "@/redux-toolkit/slice/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export default function Page({ params }: { params: { productId: string } }) {
  const { productId } = params;
  const { data, isLoading, isError } = useGetProductDetails(productId);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching product details...</div>;

  const handleAddToCart = () => {
    if (data) {
      const productToAdd = {
        id: data.id,
        title: data.title,
        price: data.price,
        image: data.image,
        qty: quantity,
      };
      dispatch(addProduct(productToAdd));
      toast.success("Item added to cart!");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Product Details
      </Typography>
      <Box sx={{ textAlign: "right" }}>
        <Link href="./products" style={{ textDecoration: "none" }}>
          ← Back
        </Link>
      </Box>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                height: "500px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Card sx={{ height: "100%", width: "100%" }}>
                <CardMedia
                  component="img"
                  sx={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                  image={data?.image}
                  alt={data?.title}
                />
              </Card>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                height: "500px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Chip label="NEW" color="primary" size="small" sx={{ mb: 1 }} />
                <Chip
                  label="IN STOCK"
                  color="success"
                  size="small"
                  sx={{ ml: 1, mb: 1 }}
                />
                <Typography variant="h4" gutterBottom>
                  {data?.title}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Rating value={4} readOnly />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    (9.12k reviews)
                  </Typography>
                </Box>
                <Typography variant="h5" color="primary" gutterBottom>
                  ${data?.price}
                </Typography>
                <Typography variant="body2" paragraph>
                  {data?.description}
                </Typography>
              </Box>
              <Box>
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    sx={{ mr: 2, width: "45%" }}
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ width: "45%" }}
                  >
                    Buy Now
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <ToastContainer />
    </Container>
  );
}
