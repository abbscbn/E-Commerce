import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import ProductService from "../services/ProductService";
import { toast } from "react-toastify";
import { setCurrentUser, setLoading } from "../redux/appSlice";
import { ProductType, UserType } from "../Types/Types";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { Button } from "@mui/material";
import { addProductToBakset } from "../redux/BasketSlice";
import { RootState } from "../redux/Store";

function ProductDetails() {
  const { productId } = useParams();
  const [count, setcount] = useState<number>(0);
  const [product, setproduct] = useState<ProductType | null>();
  const dispatch = useDispatch();


  const addBasket = () => {
    if (product) {
      const payload: ProductType = {
        ...product,
        count: count,
      };
      dispatch(addProductToBakset(payload));
      toast.success("ürün sepete eklendi")
    }
  };

  const getProductById = async (productId: number) => {
    try {
      dispatch(setLoading(true));
      const product = await ProductService.getProductById(productId);
      setproduct(product);
    } catch (error) {
      toast.error("Ürün getirilirken hata...");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getProductById(Number(productId));
  }, []);
  return (
    <div>
      <Container maxWidth="lg">
        {product && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              marginTop: "50px",
            }}
          >
            <img
              src={product.image}
              style={{ width: "400px", height: "400px", marginRight: "50px" }}
            />
            <div>
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <p
                style={{
                  fontFamily: "arial",
                  fontSize: "28px",
                  fontWeight: "bold",
                }}
              >
                {product.price} ₺
              </p>

              <div
                style={{
                  marginTop: "50px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <IoIosAddCircleOutline
                  onClick={() => setcount(count + 1)}
                  style={{
                    fontSize: "32px",
                    marginRight: "20px",
                    cursor: "pointer",
                  }}
                />
                <span style={{ fontSize: "32px" }}>{count}</span>
                <IoIosRemoveCircleOutline
                  onClick={() => setcount(count - 1)}
                  style={{
                    fontSize: "32px",
                    marginLeft: "20px",
                    cursor: "pointer",
                  }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  onClick={addBasket}
                  color="primary"
                  variant="contained"
                  sx={{ marginTop: "50px" }}
                >
                  Sepete Ekle
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

export default ProductDetails;
