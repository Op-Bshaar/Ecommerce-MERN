import { cartModel } from "../models/cartModel";
import prodcutModel from "../models/productModel";

interface CreateCartForUser{
  userId:string
}

const createCartForUser = async({userId}:CreateCartForUser)=>{
    const cart = await cartModel.create({userId,totalAmount:0})
    await cart.save()
    return cart
}

interface getActiveCartForUser{
    userId:string
}

export const getActiveCartForUser = async({userId}:getActiveCartForUser)=>{
  let cart = await cartModel.findOne({userId,status:"active"})

  if(!cart){
    cart = await createCartForUser({userId})
  }
  return cart  
}

interface addItemToCart{
  userId:string,
  productId:any,
  quantity:number
}

export const addItemToCart = async({userId,productId,quantity}:addItemToCart)=>{

   const cart = await getActiveCartForUser({userId});
   const existCart = cart.items.find ((p)=>p.product.toString() === productId)

   if(existCart){
    return {data:"item already exis in cart",statuscode:400}
   }

   const product = await prodcutModel.findById(productId)
   
   if(!product){
    return {data:"not found",statusCode:400}
   }
    
   if(product.stock<quantity){
    return{data:"Low stock for item",statusCode:400}
   }

   cart.items.push({product:productId,unitPrice:product.price,quantity})

   cart.totalAmount+=product.price*quantity

   const updatedCart = await cart.save();

   return {data:updatedCart,statuscode:201}
}
interface updateItemToCart{
  userId:string,
  productId:any,
  quantity:number
}
export const updateItemToCart = async ({userId,productId,quantity}:updateItemToCart)=>{
  const cart = await getActiveCartForUser({userId});
  const existCart = cart.items.find ((p)=>p.product.toString() === productId)

  if(!existCart){
    return{data:"item doesnot exist in cart", statscode:400}
  }

  const product = await prodcutModel.findById(productId)
    
  if(!product){
    return {data:"not found",statusCode:400}
   }
    

  if(product.stock<quantity){
    return{data:"Low stock for item",statusCode:400}
   }


  const otherCartItems = cart.items.filter(
    (p) => p.product.toString() !== productId
  );

  let total = otherCartItems.reduce((sum,product)=>{
    sum += product.quantity * product.unitPrice
    return sum
  },0)

  existCart.quantity = quantity;
 
  total += existCart.quantity * existCart.unitPrice;

  cart.totalAmount = total

  
  const updatedCart = await cart.save();

  return {
    data: updatedCart,
    statusCode: 200,
  };


}