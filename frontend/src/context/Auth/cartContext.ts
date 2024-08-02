import { createContext, useContext } from "react";
import { CarItem } from "../../types/CartItem";

interface ICart {
  CartItems: CarItem[];
  totalAmount: number;
  addItemToCart: (productId:string) => void;
  updataItems:(productId:string,quantity:number)=>void
  removeItems:(productId:string)=>void
  cleartItems:()=>void
}

export const CartContext = createContext<ICart>({
  CartItems: [],
  totalAmount: 0,
  addItemToCart: () => {},
  updataItems:()=>{},
  removeItems:()=>{},
  cleartItems:()=>{}
});

export const useCart = () => useContext(CartContext);
