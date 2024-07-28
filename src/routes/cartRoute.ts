import  express  from "express";
import {  addItemToCart, getActiveCartForUser, updateItemToCart } from "../services/cartService";
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

router.delete('/delete',validateJWT,async(req:extendReuest,res)=>{
   const userId = req?.user?._id;
   const {productId} = req.body
   
   
})

export default router