import { useContext } from "react";
import { CartIconContainer, ShoppingIcon, ItemCount } from "./cart-icon.styles";
import { CartContext } from "../contexts/cart.context";

function CartIcon() {
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);
  const { cartCount } = useContext(CartContext);

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
}

export default CartIcon;
