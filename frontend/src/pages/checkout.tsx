import {
  Box,
  Button,
  ButtonGroup,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useCart } from "../context/Auth/cartContext";
import { purple } from "@mui/material/colors";
import { Navigate, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/baseurl";
import login from "./login";
import { useAuth } from "../context/Auth/AuthContext";

function Ckeckout() {
  const { token } = useAuth();
  const { CartItems, totalAmount, cleartItems } = useCart();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const addressRef = useRef<any>(null);

  const success = async () => {
    const address = addressRef.current?.value;

    if (!address) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/cart/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          address,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to login. Please check your credentials.");
      }
      if (!token) {
        throw new Error("Failed to retrieve token. Please try again.");
      }
      navigate("/success");
    } catch (error) {
      setError("somthing went wrong");
    }
  };
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
          Checkout
        </Typography>
        <TextField
          inputRef={addressRef}
          label="address"
          variant="outlined"
          type="email"
        />
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
            <Typography sx={{ marginBottom: 1, color: "purple" }}>
              {item.quantity} x {item.unitPrice} $
            </Typography>
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
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          animation: "fadeIn 1s ease-in-out",
        }}
      >
        <Typography variant="h4" sx={{ color: "purple" }}>
          Total Amount: {totalAmount} $
        </Typography>

        <Button variant="contained" onClick={success} sx={{ backgroundColor: "purple" }}>
          pay now
        </Button>
      </Box>
    </Container>
  );
}

export default Ckeckout;
