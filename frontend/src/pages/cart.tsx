import { Box, Button, ButtonGroup, Container, Typography } from "@mui/material";
import React from "react";
import { useCart } from "../context/Auth/cartContext";
import { purple } from "@mui/material/colors";
import { Navigate, useNavigate } from "react-router-dom";

function Cart() {
  const { CartItems, totalAmount, updataItems, removeItems ,cleartItems} = useCart();
  const navigate = useNavigate()

  const handleClick = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      return;
    }
    updataItems(productId, quantity);
  };

  const handelremove = (productId: string) => {
    removeItems(productId);
  };

  const clearitem = ()=>{
    cleartItems()
  }

  const Checkout = ()=>{
    navigate("/checkout")
  }
  return (
    <Container
      sx={{
        marginTop: 3,
        padding: 2,
        backgroundColor: "#f4f4f4",
        borderRadius: 2,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        animation: "fadeIn 1s ease-in-out",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          mb: 3,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            color: "#333",
          }}
        >
          My Cart
        </Typography>
        <Button sx={{color:"purple"}} onClick={clearitem}>Clear</Button>
      </Box>

      {CartItems.map((item, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            marginBottom: 3,
            padding: 2,
            borderRadius: 1,
            backgroundColor: "#fff",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.02)",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          <img
            src={item.image}
            width={150}
            style={{
              borderRadius: 8,
              transition: "transform 0.3s ease-in-out",
            }}
          />
          <Box sx={{ flexGrow: 1, marginLeft: 2 }}>
            <Typography variant="h6" sx={{ marginBottom: 1 }}>
              {item.title}
            </Typography>
            <Typography sx={{ marginBottom: 1 }}>
              {item.quantity} x {item.unitPrice} $
            </Typography>
            <ButtonGroup
              variant="contained"
              aria-label="Basic button group"
              sx={{ marginRight: 1 }}
            >
              <Button
                sx={{ backgroundColor: "#FFDC2E" }}
                onClick={() => handleClick(item.productId, item.quantity + 1)}
              >
                +
              </Button>
              <Button
                sx={{ backgroundColor: "#FFDC2E" }}
                onClick={() => handleClick(item.productId, item.quantity - 1)}
              >
                -
              </Button>
            </ButtonGroup>
            <Button
              sx={{ backgroundColor: "#FFDC2E" }}
              onClick={() => handelremove(item.productId)}
            >
              remove
            </Button>
          </Box>
        </Box>
      ))}
      <Box
        sx={{
          marginTop: 4,
          padding: 2,
          borderRadius: 1,
          backgroundColor: "#fff",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          display:"flex",
          flexDirection:"row",
          justifyContent:"space-between",
          animation: "fadeIn 1s ease-in-out",
        }}
      >
        <Typography variant="h4" sx={{ color: "purple" }}>
          Total Amount: {totalAmount} $
        </Typography>
         
        <Button onClick={Checkout}>
            Checkout
        </Button>
      </Box>
      
    </Container>
  );
}

export default Cart;
