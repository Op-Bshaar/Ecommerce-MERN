import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { BASE_URL } from "../constants/baseurl";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const firstnameRef = useRef<any>(null);
  const lastnameRef = useRef<any>(null);
  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const [error, setError] = useState("");

  const { login } = useAuth();

  const submit = async () => {
    const firstName = firstnameRef.current?.value;
    const lastName = lastnameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!firstName || !lastName || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to register. Please try again.");
      }

      const token = await response.json();
      if (!token) {
        throw new Error("Failed to retrieve token. Please try again.");
      }

      login(email, token);
      navigate("/");
    } catch (error) {
      setError("sorry something wen wrong");
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        marginTop: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 3,
          borderRadius: 2,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          backgroundColor: "#fff",
          width: "100%",
          maxWidth: 400,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            marginBottom: 3,
            fontWeight: "bold",
            textAlign: "center",
            color: "#333",
          }}
        >
          Register New Account
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
          }}
        >
          <TextField
            inputRef={firstnameRef}
            label="First Name"
            variant="outlined"
            fullWidth
          />
          <TextField
            inputRef={lastnameRef}
            label="Last Name"
            variant="outlined"
            fullWidth
          />
          <TextField
            inputRef={emailRef}
            label="Email"
            variant="outlined"
            type="email"
            fullWidth
          />
          <TextField
            inputRef={passwordRef}
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={submit}
            sx={{ marginTop: 2, backgroundColor: "#FFDC2E" }}
          >
            Register
          </Button>
          {error && (
            <Typography
              sx={{
                color: "red",
                fontSize: 14,
                marginTop: 2,
                textAlign: "center",
              }}
            >
              {error}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default Register;
