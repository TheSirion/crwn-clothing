

import { useNavigate } from "react-router-dom";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import { useDispatch, useSelector } from "react-redux";
import { setIsCartOpen } from "../../store/cart/cart.action";
import { selectCartItems, selectIsCartOpen } from "../../store/cart/cart.selector";
import { CartDropdownContainer, CartItems, EmptyMessage } from "./cart-dropdown.styles.jsx";

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const isCartOpen = useSelector(selectIsCartOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useNavigate() permite que naveguemos a uma rota usando um componente 
  // que não seja <Link>, como o <Button>
  const goToCheckoutHandler = () => {
    dispatch(setIsCartOpen(!isCartOpen));
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