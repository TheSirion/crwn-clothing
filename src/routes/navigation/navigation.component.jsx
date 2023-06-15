import { useContext } from 'react';
import { Link, Outlet } from "react-router-dom";

import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import CartIcon from '../../components/cart-icon/cart-icon.component';

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { CartContext } from '../../contexts/cart.context';
import { UserContext } from '../../contexts/user.context';

import { signOutUser } from '../../utils/firebase/firebase.utils';

import { LogoContainer, NavLink, NavLinksContainer, NavigationContainer } from "./navigation.styles.jsx";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinksContainer>
          <Link className="nav-link" to="/shop">SHOP</Link>
          {
            currentUser ? (
              <NavLink as="span" onClick={signOutUser}>SIGN OUT</NavLink>
            ) : (
              <NavLink to="/auth">SIGN IN</NavLink>
            )
          }
          <CartIcon />
          {
            isCartOpen && <CartDropdown />
          }
        </NavLinksContainer>
      </NavigationContainer>
      <Outlet />
    </>
  );
};

export default Navigation;