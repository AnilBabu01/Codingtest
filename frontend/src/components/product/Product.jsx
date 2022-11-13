import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
const Product = ({ product }) => {
  return (
    <>
      <Card sx={{ maxWidth: 310, margin: 1 }}>
        <CardMedia
          component="img"
          height="140"
          image={product.images[0].url}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ₹ {product.price}
          </Typography>
        </CardContent>
        <CardActions>
          <Link
            to={`/product/${product._id}`}
            id="view_btn"
            className="btn btn-block"
          >
            View Details
          </Link>
        </CardActions>
      </Card>
    </>
  );
};

export default Product;
