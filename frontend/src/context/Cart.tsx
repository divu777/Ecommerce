import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext<
  [any, React.Dispatch<React.SetStateAction<any>>]
>([{}, () => {}]);

interface Prop {
  children: React.ReactNode;
}

export const CartProvider = ({ children }: Prop) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Read from localStorage only once when the component mounts
    let existingItem = localStorage.getItem("cart");
    if (existingItem) setCart(JSON.parse(existingItem));
  }, []); // <-- Specify an empty dependency array

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
