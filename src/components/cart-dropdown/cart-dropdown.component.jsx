import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/cart.context";

import CartItem from "../cart-item/cart-item.component";
import Button from "../button/button.component";

import {
  CartDropDownContainer,
  CartItems,
  EmptyMessage,
} from "./cart-dropdown.styles";

function CartDropdown() {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };

  return (
    <CartDropDownContainer>
      {cartItems.length === 0 ? (
        <EmptyMessage>Your Cart is Empty</EmptyMessage>
      ) : (
        <CartItems>
          {cartItems.map((item) => (
            <CartItem key={item.id} cartItem={item} />
          ))}
        </CartItems>
      )}
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </CartDropDownContainer>
  );
}

export default CartDropdown;
