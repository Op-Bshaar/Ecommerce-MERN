
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useCart } from '../context/Auth/cartContext';


interface productitem{
    title:string,
    price:number,
    image:string,
    id:string
}

export default function CartItem({id,title,price,image}:productitem) {
  const {addItemToCart} = useCart()
  return (
    <Card>
      <CardMedia
        sx={{ height: 300 }}
        image={image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
         {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {price}$
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant='contained' sx={{backgroundColor:"#FFDC2E"}} onClick={()=>addItemToCart(id)}>Add to cart</Button>
      </CardActions>
    </Card>
  );
}
