import express from "express"
import mongoose from "mongoose"
import userRoute from "./routes/userRoute"
import prodcutRoute from './routes/productRoute'
import { seedProduct } from "./services/productService"
import cartRoute from './routes/cartRoute'


const app = express()
const port = 3000

app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce").
then(()=>console.log("connected")).
catch((err)=>console.log("failed to connect",err))

app.use('/user',userRoute)
app.use('/product',prodcutRoute)
app.use('/cart',cartRoute)

seedProduct();
app.listen(port,()=>{
    console.log("server is running at :http://localhost:3000")
})