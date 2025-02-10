import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Icon from "../images/icon.webp";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  filterProducts,
  setCurrentUser,
  setDrawer,
  setProducts,
} from "../redux/appSlice";
import { toast } from "react-toastify";
import ProductService from "../services/ProductService";
import { ProductType } from "../Types/Types";
import { SlBasket } from "react-icons/sl";
import Badge from "@mui/material/Badge";
import { RootState } from "../redux/Store";
function Navbar() {
  const { basket } = useSelector((state: RootState) => state.basket);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openDraw = () => {
    dispatch(setDrawer(true));
  };

  const handleFilter = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.value) {
        const products: ProductType[] = await ProductService.getAllProducts();
        dispatch(setProducts(products));

        dispatch(filterProducts(e.target.value));
      } else {
        const products: ProductType[] = await ProductService.getAllProducts();
        dispatch(setProducts(products));
      }
    } catch (error) {
      toast.error("Filitreleme yapılırken hata oluştu");
    }
  };

  const logout = () => {
    toast.success("Çıkış Yapılıyor");
    dispatch(setCurrentUser(null));
    dispatch(setProducts(null));
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: "#cfc9b6" }}>
        <Toolbar>
          <IconButton
            onClick={() => navigate("/")}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <img src={Icon} style={{ width: "50px", height: "40px" }} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Abbas A.Ş
          </Typography>

          <TextField
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFilter(e)
            }
            sx={{ marginRight: "10px" }}
            placeholder="Birşeyler ara..."
            variant="standard"
          />

          <Badge
            onClick={openDraw}
            badgeContent={basket.length}
            color="success"
            style={{
              fontSize: "22px",
              marginRight: "15px",
              marginLeft: "10px",
              cursor: "pointer",
            }}
          >
            <SlBasket />
          </Badge>

          <Button onClick={() => logout()} color="inherit">
            Çıkış Yap
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
