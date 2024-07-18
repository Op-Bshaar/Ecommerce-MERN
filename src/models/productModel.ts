import { Schema ,Document, model} from "mongoose";
import mongoose from "mongoose";


export interface Iproduct extends Document{
    title:string,
    image:string,
    price:number,
    stock:number
}

const productSchema = new Schema<Iproduct>({
    title: {type:String, required:true},
    image: {type:String, required:true},
    price: {type:Number, required:true},
    stock: {type:Number, required:true}
})

const prodcutModel =  mongoose.model<Iproduct>("Product",productSchema)

export default prodcutModel