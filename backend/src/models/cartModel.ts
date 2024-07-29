import mongoose,{Document,model,ObjectId,Schema} from "mongoose";
import { Iproduct } from "./productModel";

export interface IcartItem {
    product:Iproduct,
    unitPrice:number,
    quantity:number
}

const CartStatusenum = ["active","completed"] ;

export interface Icart extends Document {
  userId:ObjectId|string,
  items:IcartItem[],
  totalAmount:number,
  status:"active"|"completed"
}

const cartItemSchema = new Schema<IcartItem>({
    product:{type:Schema.Types.ObjectId,ref :"Product",required:true},
    quantity:{type:Number,required:true,default:1},
    unitPrice:{type:Number,required:true}
})

const cartSchema = new Schema<Icart>({
    userId:{type:Schema.Types.ObjectId,ref :"User",required:true},
    items:[cartItemSchema],
    totalAmount:{type:Number,required:true},
    status:{type:String,enum:CartStatusenum,default:"active"}
})

export const cartModel = mongoose.model<Icart>("Cart",cartSchema)