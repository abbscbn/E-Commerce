import React, { useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { calculateBalance, setDrawer } from "../redux/appSlice";
import { ProductType } from "../Types/Types";
import { Button } from "@mui/material";
import {
  calculateBasket,
  removeProductFromBasket,
  setBasket,
} from "../redux/BasketSlice";
import { toast } from "react-toastify";

function BasketDetails() {
  const dispatch = useDispatch();
  const { basket, totalAmout } = useSelector(
    (state: RootState) => state.basket
  );
  const { drawer, currentUser } = useSelector((state: RootState) => state.app);
  const removeProduct = (productId: number) => {
    dispatch(removeProductFromBasket(productId));
  };
  const buy = () => {
    if (currentUser?.balance && currentUser?.balance < totalAmout) {
      toast.warning("Yeterli bakiye yok");
      return;
    }

    if (currentUser?.balance) {
      let balance: number = currentUser?.balance - totalAmout;

      dispatch(calculateBalance(balance));
    }

    dispatch(setBasket([]));
    localStorage.removeItem("basket");
    toast.success("Ürünler Satın alınmıştır");
  };
  const closeDrawer = () => {
    dispatch(setDrawer(false));
  };

  useEffect(() => {
    dispatch(calculateBasket());
  }, [basket]);

  return (
    <Drawer open={drawer} anchor="right" onClose={closeDrawer}>
      {basket &&
        basket.map((product: ProductType) => (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              padding: "10px 20px",
            }}
          >
            <div style={{ width: "100px" }}>
              <img src={product.image} width={60} height={60} />
            </div>
            <div
              style={{
                width: "250px",
                fontFamily: "arial",
                fontWeight: "bold",
              }}
            >
              {product.title.substring(0, 30)}...
            </div>
            <div
              style={{ marginLeft: "20px", marginRight: "20px", width: "50px" }}
            >
              {product.count} Adet
            </div>
            <div style={{ width: "70px" }}>{product.price} ₺</div>
            <div>
              <Button
                onClick={() => removeProduct(product.id)}
                variant="outlined"
                size="small"
                color="info"
              >
                Çıkar
              </Button>
            </div>
          </div>
        ))}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontFamily: "arial",
        }}
      >
        <span style={{ marginRight: "5px" }}>Toplam Tutar: </span>
        <span> {totalAmout.toFixed(2)} ₺ </span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",

          fontFamily: "arial",
        }}
      >
        <Button onClick={buy} variant="contained" size="small">
          Satın Al
        </Button>
      </div>
    </Drawer>
  );
}

export default BasketDetails;
