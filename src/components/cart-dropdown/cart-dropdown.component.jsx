import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import { useNavigate } from "react-router-dom";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import { CartDropdownContainer, CartItems, EmptyMessage } from "./cart-dropdown.styles.jsx";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  // permite que naveguemos a uma rota usando um componente que não seja <Link>,
  // como o <Button>
  const goToCheckoutHandler = () => {
    navigate('/checkout');
  }

  return (
    <CartDropdownContainer>
      {
        cartItems ? (
          <>
            <CartItems>
              {cartItems.map(item => <CartItem cartItem={item} key={item.id} />)}
            </CartItems>

            <Button onClick={goToCheckoutHandler}>
              GO TO CHECKOUT
            </Button>
          </>

        ) : <EmptyMessage>The cart is empty</EmptyMessage>
      }


    </CartDropdownContainer>
  )
}

export default CartDropdown;