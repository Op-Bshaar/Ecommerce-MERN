import  express  from "express";
import { getAllproduct } from "../services/productService";


const router = express.Router();

router.get('/',async(req,res)=>{
  const result = await getAllproduct()  
  res.status(200).send(result);
})


export default router
