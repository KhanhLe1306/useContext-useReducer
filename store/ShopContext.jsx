import { createContext, useReducer, useContext } from "react";
import { initialState, shopReducer } from "./ShopReducer";

const ShopContext = createContext(initialState);

export const ShopProvider = ({ children }) => {
  const [state, dispatch] = useReducer(shopReducer, initialState);

  const addToCart = (product) => {
    const updatedCart = state.products.concat(product);
    updatePrice(updatedCart);
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        products: updatedCart
      }
    });
  };

  const removeFromCart = (product) => {
    const updatedCart = state.products.filter((x) => x.name !== product.name);
    updatePrice(updatedCart);
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: {
        products: updatedCart
      }
    });
  };

  const updatePrice = (cart) => {
    let total = 0;
    cart.forEach((p) => (total += p.price));

    dispatch({
      type: "UPDATE_PRICE",
      payload: {
        total
      }
    });
  };

  const value = {
    total: state.total,
    products: state.products,
    addToCart,
    removeFromCart
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

const useShop = () => {
  const shopCtx = useContext(ShopContext);
  if (shopCtx === undefined) {
    throw new Error("useShop must be used within ShopContext");
  }
  return shopCtx;
};

export default useShop;
