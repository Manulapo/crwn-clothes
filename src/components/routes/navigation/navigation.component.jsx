import { Outlet } from "react-router-dom";
import { Fragment, useContext } from "react";
import CartIcon from "../../cart-icon/cart-icon.component";
import CartDropdown from "../../cart-dropdown/cart-dropdown.component";

import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from "./navigation.styles";

import { ReactComponent as CrownLogo } from "../../../assets/crown.svg";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import { signOutUser } from "../../../utils/firebase/firebase.utils";

function Navigation() {
  // useContext Hook
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  console.log(currentUser);

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
                  currentUser.displayName.toUpperCase()}
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
