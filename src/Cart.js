import styled from "styled-components";
import useShop from "../store/ShopContext";

const Cart = () => {
  const cart = useShop();
  return <Title>`Your cart total is ${cart.total}$`</Title>;
};

export default Cart;

const Title = styled.p`
  font-weight: bold;
  font-size: 20px;
  margin-top: 20px;
`;
