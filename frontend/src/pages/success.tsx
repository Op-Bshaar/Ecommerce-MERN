import { CheckCircleOutline } from '@mui/icons-material';
import { Container, Typography, Box, Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Success() {
    const navigate=useNavigate()
    const Homepage = ()=>{
      navigate('/')
    }
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: 2,
        backgroundColor: '#f4f4f4',
        borderRadius: 2,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        animation: 'fadeIn 1s ease-in-out',
        marginTop:3
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          padding: 4,
          borderRadius: 2,
          backgroundColor: '#fff',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          animation: 'fadeIn 1s ease-in-out',
        }}
      >
        <CheckCircleOutline sx={{ color: 'green', fontSize: 100, mb: 2 }} />
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: '#333',
            mb: 2,
          }}
        >
          Thanks for your order!
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: '#555',
            mb: 2,
          }}
        >
          Your order has been successfully processed. We will notify you once it's on its way.
        </Typography>
        <Button
            variant="contained"
            color="primary"
            onClick={Homepage}
            sx={{ marginTop: 2, backgroundColor: "#FFDC2E"  }}
          >
            Go to the HomePage
        </Button>
      </Box>
    </Container>
  );
}

export default Success;
