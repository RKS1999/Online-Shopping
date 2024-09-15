"use client";

import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Button,
  Box,
  Pagination,
} from "@mui/material";
import { useGetProducts } from "@/hooks/react-query/useGetProducts";
import { Product } from "@/typescript/types/product.types";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentIcon from "@mui/icons-material/Payment";
import { useRouter } from "next/navigation";
import Loader from "@/ui/loader/loader";
import { useAppDispatch } from "@/hooks/redux/page";
import { addProduct } from "@/redux-toolkit/slice/cartSlice";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const truncateDescription = (description: string, wordLimit: number) => {
  const words = description.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return description;
};

const Products = () => {
  const { data, isLoading, isError } = useGetProducts();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [items, setItems] = useState<Product[]>([]);
  const [filterItem, setFilterItem] = useState<Product[]>([]);
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    if (data) {
      setItems(data);
      setFilterItem(data);
    }
  }, [data]);

  useEffect(() => {
    if (category === "All") {
      setFilterItem(items);
    } else {
      const filteredProducts = items.filter(
        (item) => item.category === category
      );
      setFilterItem(filteredProducts);
    }
    setPage(1);
  }, [category, items]);

  const handleProductClick = (productId: number) => {
    router.push(`/products/${productId}`);
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addProduct(product));
    toast.success("Product added to cart!");
    // router.push("/product/cart");
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const currentProducts = filterItem.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (isLoading) return <Loader />;
  if (isError) return <div>Error fetching products</div>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        All Products
      </Typography>
      <Grid container justifyContent="center" spacing={2} sx={{ mb: 4 }}>
        <Grid item>
          <Button variant="contained" onClick={() => setCategory("All")}>
            All Products
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => setCategory("men's clothing")}
          >
            Men
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => setCategory("women's clothing")}
          >
            Women
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => setCategory("jewelery")}>
            Jewelry
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => setCategory("electronics")}
          >
            Electronics
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {currentProducts.map((product: Product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.title}
                sx={{ objectFit: "contain", p: 2, cursor: "pointer" }}
                onClick={() => handleProductClick(product.id)}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  noWrap
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleProductClick(product.id)}
                >
                  {product.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    fontSize: "0.8rem",
                    height: "3em",
                    overflow: "hidden",
                  }}
                >
                  {truncateDescription(product.description, 10)}
                </Typography>
                <Typography
                  variant="h6"
                  color="primary"
                  sx={{ fontWeight: "bold" }}
                >
                  ${product.price.toFixed(2)}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 2,
                }}
              >
                <Button
                  variant="contained"
                  startIcon={<ShoppingCartIcon />}
                  size="small"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<PaymentIcon />}
                  size="small"
                >
                  Buy Now
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={Math.ceil(filterItem.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default Products;
