import React, { useEffect } from "react";
import { useAuth } from "../context/Auth/AuthContext";
import { Box, Container, Typography } from "@mui/material";

function Order() {
  const { getordrs, orders } = useAuth();

  useEffect(() => {
    getordrs();
  }, [getordrs]);

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 4,
        padding: 2,
        backgroundColor: '#f4f4f4',
        borderRadius: 2,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        animation: 'fadeIn 1s ease-in-out',
    
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 'bold',
          color: '#333',
          marginBottom: 3,
          textAlign: 'center',
        }}
      >
        My Orders
      </Typography>
      {orders.length > 0 ? (
        orders.map(({  address, total, orderItems }: any) => (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: 2,
              marginBottom: 2,
              borderRadius: 1,
              backgroundColor: '#fff',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              width: '100%',
              maxWidth: 600,
              animation: 'fadeIn 1s ease-in-out',
            }}
          >
            <Typography sx={{ marginBottom: 1 }}>
              <strong>Address:</strong> {address}
            </Typography>
            <Typography sx={{ marginBottom: 1 }}>
              <strong>Items:</strong> {orderItems.length}
            </Typography>
            <Typography sx={{ marginBottom: 1, color: 'purple' }}>
              <strong>Total:</strong> {total} $
            </Typography>
          </Box>
        ))
      ) : (
        <Typography variant="h6" sx={{ color: '#666' }}>
          No orders found.
        </Typography>
      )}
    </Container>
  );
}

export default Order;
