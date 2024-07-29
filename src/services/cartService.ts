import { cartModel } from "../models/cartModel";
import { IOrderItem, orderModel } from "../models/orderModel";
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
interface UpdateItemToCart{
  userId:string,
  productId:any,
  quantity:number
}
export const updateItemToCart = async ({userId,productId,quantity}:UpdateItemToCart)=>{
  const cart = await getActiveCartForUser({userId});
  const existCart = cart.items.find ((p)=>p.product.toString() === productId)

  if(!existCart){
    return{data:"item does not exist in cart", statscode:400}
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

interface DeleteItemToCart{
  userId:string,
  productId:any,
}


export const deleteItemToCart = async({userId,productId}:DeleteItemToCart)=>{

  const cart = await getActiveCartForUser({userId});
  const existCart = cart.items.find ((p)=>p.product.toString() === productId)

  if(!existCart){
    return{data:"item doesnot exist in cart", statscode:400}
  }
   
   const otherCartItems = cart.items.filter(
    (p) => p.product.toString() !== productId
  );


  let total = otherCartItems.reduce((sum,product)=>{
    sum += product.quantity * product.unitPrice
    return sum
  },0)

  cart.items = otherCartItems

  cart.totalAmount = total

  const deleteCart = await cart.save();

  return {
    data: deleteCart,
    statusCode: 200,
  };
}

interface ClearCart{
  userId:string,

}


export const clearCart = async({userId}:ClearCart)=>{

  const cart = await getActiveCartForUser({userId});
  
  cart.items = []

  cart.totalAmount = 0
  const updatedCart = await cart.save();
  return {data:updatedCart,statuscode:200}

 
}


interface Ckeckout{
  userId:string
  address:string
}

export const ckeckout = async({userId,address}:Ckeckout)=>{
  if(!address){
    return{data:"please add address", statusCode:400}
  }
  const cart = await getActiveCartForUser({userId}); 

  const orderItems:IOrderItem[]=[]

  for(const item of cart.items){

      const product = await prodcutModel.findById(item.product)
      if(!product){
        return {data:"not found", statusCode:400}
      }
      const orderItem:IOrderItem = {
        productTitle:product.title,
        productImage:product?.image,
        unitPrice:item.unitPrice,
        quantity:item.quantity
      } 
    orderItems.push(orderItem)
  }

  const order = await orderModel.create({
    orderItems,
    total:cart.totalAmount,
    address,
    userId,
  })
  await order.save();

  cart.status = "completed";

  await order.save();

  return{data:order,statsCode:200}
}