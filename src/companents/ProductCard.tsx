import React from "react";
import { ProductType } from "../Types/Types";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: ProductType;
}

function ProductCard(props: ProductCardProps) {
  const navigate = useNavigate();
  const { id, title, price, description, category, image, rating } =
    props.product;

  return (
    <Card
      sx={{
        width: "300px",
        height: "550px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "60px 10px",
        boxShadow: "3px 4px 5px lightgray",
        cursor: "pointer",
      }}
    >
      <img src={image} width={220} height={250} />
      <CardContent sx={{ height: "200px" }}>
        <Typography gutterBottom variant="h6" component="div">
          {title.substring(0, 50)}...
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {description.substring(0, 150)}...
        </Typography>
      </CardContent>
      <div>{price} ₺</div>
      <CardActions>
        <Button
          onClick={() => navigate("/product-detail/"+id)}
          size="small"
          variant="contained"
          color="inherit"
        >
          Detay
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
