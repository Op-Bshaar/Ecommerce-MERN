import  dotenv  from "dotenv"
import express from "express"
import mongoose from "mongoose"
import userRoute from "./routes/userRoute"
import prodcutRoute from './routes/productRoute'
import { seedProduct } from "./services/productService"
import cartRoute from './routes/cartRoute'
import cors from "cors"

dotenv.config()
const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.DATABASE_URL || '').
then(()=>console.log("connected")).
catch((err)=>console.log("failed to connect",err))

app.use('/user',userRoute)
app.use('/product',prodcutRoute)
app.use('/cart',cartRoute)

seedProduct();
app.listen(port,()=>{
    console.log("server is running at :http://localhost:3000")
})