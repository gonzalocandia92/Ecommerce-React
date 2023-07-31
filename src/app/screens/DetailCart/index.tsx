import React from "react";
import { useCartContext } from "../../hooks/CartContext";
import styles from "./styles.module.css";
import Categories from "../Categories";
import { useNavigate } from "react-router-dom";

const DetailCart: React.FC = () => {
  const { cartItems, decreaseQuantity, addToCart, removeFromCart, clearCart } = useCartContext();
  const navigate = useNavigate();

  const handleFinishPurchase = () => {
    const totalPrice = getTotalPrice();
    navigate("/success", { state: { totalPrice } });
    clearCart(); 
  };

  const getTotalPrice = () => {
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    return totalPrice;
  };

  return (
    <>
      <div className={styles.container}>
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? ( 
          <>
            <p>Your cart is empty.</p>
            <Categories />
          </>
        ) : (
          <>
            <div className={styles.total}>
              <p>Total Price: $ {getTotalPrice()}</p>
            </div>
            <div className={styles.cardsContainer}>
              {cartItems.map((item) => (
                <div key={item.id} className={styles.card}>
                  <h3>{item.title}</h3>

                  <div className={styles.cardContent}>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: {item.price}</p>
                  </div>
                  <div className={styles.subtotal}>
                    Subtotal: ${item.price * item.quantity}
                  </div>
                  <div className={styles.buttonsContainer}>
                    <button onClick={() => addToCart({ ...item, quantity: item.quantity + 1 })}>+</button>
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.total}>
              <button onClick={handleFinishPurchase}>Finalizar compra</button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DetailCart;
