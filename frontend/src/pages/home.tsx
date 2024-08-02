import { Box, Container, Grid } from "@mui/material";

import CartItem from "../components/CartItem";
import { useEffect, useState } from "react";
import { Proudct } from "../types/product";
import { BASE_URL } from "../constants/baseurl";
import { Margin } from "@mui/icons-material";

function Home() {
  const [proudct, setProduct] = useState<Proudct[]>([]);

  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      fetch(`${BASE_URL}/product`).then(async (response) => {
        const data = await response.json();
        setProduct(data);
      });
    } catch {
      setError(true);
    }
  }, []);

  if (error) {
    return <Box>sorry somthing went wrong</Box>;
  }
  return (
    <>
      <Container sx={{ marginTop: 7 }}>
        <Grid container spacing={10}>
          {proudct.map(({ _id, title, image, price }) => (
            <Grid item md={4}>
              <CartItem id={_id} title={title} image={image} price={price} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Home;
