"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { createCheckout, updateCheckout } from "@/lib/shopify";
import type { CartItemType } from "@/types/shopify";

type CartContextType = {
  cart: CartItemType[];
  cartOpen: boolean;
  setCartOpen: (value: boolean) => void;
  addToCart: (newItem: CartItemType) => void;
  checkoutUrl: string;
  removeCartItem: (itemToRemove: string) => void;
};

const CartContext = createContext<CartContextType>({
  cart: [],
  cartOpen: false,
  setCartOpen: () => {},
  addToCart: () => {},
  checkoutUrl: "",
  removeCartItem: () => {},
});

export default function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutId, setCheckoutId] = useState("");
  const [checkoutUrl, setCheckoutUrl] = useState("");

  useEffect(() => {
    if (localStorage.checkout_id) {
      const cartObject = JSON.parse(localStorage.checkout_id);

      if (cartObject[0].id) {
        setCart([cartObject[0]]);
      } else if (cartObject[0].length > 0) {
        const firstCartObj = [...cartObject[0]];
        setCart(firstCartObj);
      }

      setCheckoutId(cartObject[1].id);
      setCheckoutUrl(cartObject[1].webUrl);
    }
  }, []);

  async function addToCart(newItem: CartItemType) {
    setCartOpen(true);

    if (cart.length === 0) {
      setCart([newItem]);

      const checkout = await createCheckout(
        newItem.id,
        newItem.variantQuantity
      );
      setCheckoutId(checkout.id);
      setCheckoutUrl(checkout.webUrl);

      localStorage.setItem("checkout_id", JSON.stringify([newItem, checkout]));
    } else {
      let newCart: CartItemType[] = [];
      let added = false;

      cart.map((item: CartItemType) => {
        if (item.id === newItem.id) {
          item.variantQuantity++;
          newCart = [...cart];
          added = true;
        }
      });

      if (!added) {
        newCart = [...cart, newItem];
      }

      setCart(newCart);
      const newCheckout = await updateCheckout(checkoutId, newCart);
      localStorage.setItem(
        "checkout_id",
        JSON.stringify([newCart, newCheckout])
      );
    }
  }

  async function removeCartItem(itemToRemove: string) {
    const updatedCart = cart.filter(
      (item: CartItemType) => item.id !== itemToRemove
    );

    setCart(updatedCart);

    const newCheckout = await updateCheckout(checkoutId, updatedCart);
    localStorage.setItem(
      "checkout_id",
      JSON.stringify([updatedCart, newCheckout])
    );

    if (updatedCart.length === 0) {
      setCartOpen(false);
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        cartOpen,
        setCartOpen,
        addToCart,
        checkoutUrl,
        removeCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

const ShopConsumer = CartContext.Consumer;

export { ShopConsumer, CartContext };
