import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import { useNavigate } from "react-router-dom";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  // permite que naveguemos a uma rota usando um componente que não seja <Link>,
  // como o <Button>
  const goToCheckoutHandler = () => {
    navigate('/checkout');
  }

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map(item => <CartItem cartItem={item} />)}
      </div>

      <Button onClick={goToCheckoutHandler}>
        GO TO CHECKOUT
      </Button>

    </div>
  )
}

export default CartDropdown;