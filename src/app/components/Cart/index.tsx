import React from 'react';
import { useCartContext } from '../../hooks/CartContext';
import styles from './styles.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const { cartItems } = useCartContext();

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Link to ="cart/detail"> 
      <div className={styles.cart}>
        <div className={styles.cartIcon}>
          <span className={styles.cartItemsCount}>{totalItems}</span>
          <i className="fas fa-shopping-cart"></i>
        </div>
        <div className={styles.cartTotal}>
          $ {totalAmount}
        </div>
      </div>
    </Link>

  );
};

export default Cart;
