import prodcutModel from "../models/productModel";

export const getAllproduct = async()=>{
  return await prodcutModel.find();
}


export const seedProduct = async()=>{
  try{
    const products = [
        {title:"first", image:"https://www.apple.com/newsroom/images/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/tile/Apple-iPhone-15-Pro-lineup-hero-230912.jpg.news_app_ed.jpg",price:1000,stock:40}
    ]

    const existingProduct = await getAllproduct()

    if(existingProduct.length === 0){
    await prodcutModel.insertMany(products)
    }
  }
  catch(err){
    console.error("cannot connect to the database",err)
  }
}