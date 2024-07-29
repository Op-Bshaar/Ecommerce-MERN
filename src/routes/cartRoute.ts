import  express  from "express";
import {  addItemToCart, ckeckout, clearCart, deleteItemToCart, getActiveCartForUser, updateItemToCart } from "../services/cartService";
import validateJWT, { extendReuest } from "../middlewares/ValidateJWT";


const router = express.Router();

router.get('/',validateJWT,async(req:extendReuest,res)=>{
   const userId = req?.user?._id;
   const cart = await getActiveCartForUser({userId})
   res.status(200).send(cart)
})

router.post('/items',validateJWT,async(req:extendReuest,res)=>{
   const userId = req?.user?._id;
   const {productId,quantity} = req.body
   const response = await addItemToCart({userId,productId,quantity})
   res.status(res.statusCode).send(response.data)  
})


router.put('/items',validateJWT,async(req:extendReuest,res)=>{
   const userId = req?.user?._id;
   const {productId,quantity} = req.body
   const response = await updateItemToCart({userId,productId,quantity})
   res.status(res.statusCode).send(response.data)  
})

router.delete('/items/:productId',validateJWT,async(req:extendReuest,res)=>{
   const userId = req?.user?._id;
   const {productId} = req.params
   const response = await deleteItemToCart({userId,productId})
   res.status(res.statusCode).send(response.data)  
})

router.delete('/',validateJWT,async(req:extendReuest,res)=>{
   const userId = req?.user?._id;
   const response = await clearCart({userId})
   res.status(res.statusCode).send(response.data)  
})

router.post('/checkout',validateJWT,async(req:extendReuest,res)=>{
   const userId = req?.user?._id;
   const{address} = req.body;
   const response = await ckeckout({userId,address})
   res.status(res.statusCode).send(response.data) 
})


export default router