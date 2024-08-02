import { FC, PropsWithChildren, useEffect, useState } from "react";
import { CartContext } from "./cartContext";
import { CarItem } from "../../types/CartItem";
import { BASE_URL } from "../../constants/baseurl";
import { useAuth } from "./AuthContext";

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const{token} = useAuth()
  const [CartItems, setCartItem] = useState<CarItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [error, setError] = useState("");


    useEffect(() => {
    if (!token) {
      return;
    }
    const fetchcart = async () => {
      const response = await fetch(`${BASE_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        setError("somehing went worng");
      }
      const cart = await response.json();
      const cartItemsMapped = cart.items.map(({ product, quantity,unitPrice }:any) => ({
        productId: product._id,
        title: product.title,
        image: product.image,
        quantity,
        unitPrice,
      }));
      setCartItem(cartItemsMapped);
      setTotalAmount(cart.totalAmount);
    };
    fetchcart();
  }, [token]);


  const addItemToCart = async (productId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/cart/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
        }),
      });
      if (!response.ok) {
        setError("oop... faild to add to the cart");
      }
      const cart = await response.json();
      if (!cart) {
        setError("data not found");
      }
      const cartItemsMapped = cart.items.map(({ product, quantity,unitPrice }:any) => ({
        productId: product._id,
        title: product.title,
        image: product.image,
        quantity,
        unitPrice,
      }));
      setCartItem([...cartItemsMapped]);
      setTotalAmount(cart.totalAmount);
    } catch (error) {
      console.log(error);
    }
  };


  const updataItems=async(productId: string,quantity:number)=>{
    try {
      const response = await fetch(`${BASE_URL}/cart/items`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`
        },
        body: JSON.stringify({
          productId,
          quantity,
        }),
      });
      if (!response.ok) {
        setError("oop... faild to update to the cart");
      }
      const cart = await response.json();
      if (!cart) {
        setError("data not found");
      }
      const cartItemsMapped = cart.items.map(({ product, quantity,unitPrice }:any) => ({
        productId: product._id,
        title: product.title,
        image: product.image,
        quantity,
        unitPrice,
      }));

      setCartItem([...cartItemsMapped]);
      setTotalAmount(cart.totalAmount);
    } catch (error) {
      console.log(error);
    }
  }

  const removeItems = async(productId:string)=>{
    try {
      const response = await fetch(`${BASE_URL}/cart/items/${productId}`, {
        method: "DELETE",
        headers: {
          "Authorization":`Bearer ${token}`
        },
      });
      if (!response.ok) {
        setError("oop... faild to update to the cart");
      }
      const cart = await response.json();
      if (!cart) {
        setError("data not found");
      }
      const cartItemsMapped = cart.items.map(({ product, quantity,unitPrice }:any) => ({
        productId: product._id,
        title: product.title,
        image: product.image,
        quantity,
        unitPrice,
      }));

      setCartItem([...cartItemsMapped]);
      setTotalAmount(cart.totalAmount);
    } catch (error) {
      console.log(error);
    }

  }
  const cleartItems = async()=>{
    try {
      const response = await fetch(`${BASE_URL}/cart/`, {
        method: "DELETE",
        headers: {
          "Authorization":`Bearer ${token}`
        },
      });
      if (!response.ok) {
        setError("oop... faild to empty to the cart");
      }
      const cart = await response.json();
      if (!cart) {
        setError("data not found");
      }
      const cartItemsMapped = cart.items.map(({ product, quantity,unitPrice }:any) => ({
        productId: product._id,
        title: product.title,
        image: product.image,
        quantity,
        unitPrice,
      }));

      setCartItem([...cartItemsMapped]);
      setTotalAmount(cart.totalAmount);
    } catch (error) {
      console.log(error);
    }

  }
  return (
    <CartContext.Provider value={{ CartItems, totalAmount, addItemToCart,updataItems, removeItems,cleartItems}}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
