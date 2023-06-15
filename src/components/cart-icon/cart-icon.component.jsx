import { useContext } from 'react';
// import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { CartContext } from '../../contexts/cart.context';

import { CartIconContainer, ItemCount, ShoppingIcon } from './cart-icon.styles.jsx';

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  const toggleDropdown = () => setIsCartOpen(!isCartOpen)

  return (
    <CartIconContainer>
      <ShoppingIcon onClick={toggleDropdown} />
      <ItemCount>
        {cartCount}
      </ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon;