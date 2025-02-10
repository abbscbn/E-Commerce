import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductType, UserType } from "../Types/Types";
import { setCurrentUser, setLoading, setProducts } from "../redux/appSlice";
import productService from "../services/ProductService";
import { toast } from "react-toastify";
import { RootState } from "../redux/Store";
import ProductCard from "../companents/ProductCard";
import "../css/HomePage.css";
import Category from "../companents/Category";
import Container from "@mui/material/Container";

function HomePage() {
  const dispatch = useDispatch();
  const { product } = useSelector((state: RootState) => state.app);
  const getAllProducts = async () => {
    try {
      dispatch(setLoading(true));
      const response: ProductType[] = await productService.getAllProducts();

      if (response) {
        dispatch(setProducts(response));
      }
    } catch (error) {
      toast.error("Veriler Getirilirken Hata Oluştu");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    const result = localStorage.getItem("currentUser");
    if (result) {
      const currentUser: UserType = JSON.parse(result) as UserType;
      dispatch(setCurrentUser(currentUser));
    }
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
      
      }}
    >
      <Category />
      <Container maxWidth="lg">
        <div className="General-Card">
          {product &&
            product.map((product: ProductType, index: number) => (
              <ProductCard key={index} product={product} />
            ))}
        </div>
      </Container>
    </div>
  );
}

export default HomePage;
