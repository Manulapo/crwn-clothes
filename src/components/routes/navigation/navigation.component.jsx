import { Outlet } from "react-router-dom";
import { Fragment, useContext } from "react";
import CartIcon from "../../cart-icon/cart-icon.component";
import CartDropdown from "../../cart-dropdown/cart-dropdown.component";
import { useSelector } from 'react-redux'

import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from "./navigation.styles";

import { ReactComponent as CrownLogo } from "../../../assets/crown.svg";
import { CartContext } from "../../contexts/cart.context";

import { signOutUser } from "../../../utils/firebase/firebase.utils";
import { selectCurrentUser } from "../../../store/user/user.selector";

function Navigation() {
  const currentUser = useSelector(selectCurrentUser)

  // useContext Hook
  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrownLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">
            SHOP
          </NavLink>
          {currentUser ? (
            <Fragment>
              <NavLink>
                CIAO{" "}
                {currentUser.displayName &&
                  currentUser.displayName.split(' ')[0].toUpperCase()}
              </NavLink>
              <NavLink
              
                className="nav-link"
                onClick={signOutUser}
                style={{ color: "red" }}
              >
                SIGN OUT
              </NavLink>
            </Fragment>
          ) : (
            <NavLink to="/auth">
              SIGN IN
            </NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
}

export default Navigation;
