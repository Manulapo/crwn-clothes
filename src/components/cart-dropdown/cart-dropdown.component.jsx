import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


import CartItem from "../cart-item/cart-item.component";
import Button from "../button/button.component";
import { selectCartItems } from "../../store/cart/cart.selector";

import {
  CartDropDownContainer,
  CartItems,
  EmptyMessage,
} from "./cart-dropdown.styles";

function CartDropdown() {
  const cartItems = useSelector(selectCartItems)
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
