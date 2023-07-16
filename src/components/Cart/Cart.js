import React, { useContext, useState } from "react";
import CartContext from "../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css"
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = props => {

    const [isCheckout, setIsCheckout] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [didSubmit, setDidSubmit] = useState(false)

    const cartCtx = useContext(CartContext)
    const hasItem = cartCtx.items.length  > 0;

    const cartItemAddHandler = (item) =>{
        cartCtx.addItem(item)
    };

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id)
    }

    const checkoutHandler = () =>{
        setIsCheckout(true)
    }

    const confirmOrderHandler = async (userdata) => {
        setIsSubmitting(true)
        await fetch('https://food-project-88f76-default-rtdb.firebaseio.com/orders.json', {
            method : 'POST',
            body : JSON.stringify({
                user : userdata,
                OrderedItems : cartCtx.items,
            })
        })

        setIsSubmitting(false)
        setDidSubmit(true)
        cartCtx.clearCart();
    }

    const cartItems = <ul className={classes['cart-items']}>
        {cartCtx.items.map((item) => (
            <CartItem 
            key={item.id} 
            name={item.name} 
            amount={item.amount} 
            price={item.price} 
            onAdd={cartItemAddHandler.bind(null, item)} 
            onRemove={cartItemRemoveHandler.bind(null, item.id)}/>
        ))}</ul>

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    const checkoutActions = <div className={classes.actions}>
    <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
    {hasItem && <button className={classes.button} onClick={checkoutHandler}>Order</button>}
    </div>;

    const modalCartView = <React.Fragment>{cartItems}
    <div className={classes.total}>
    <span>Total</span>
    <span>{totalAmount}</span>
    </div>
    {isCheckout && <Checkout onConfirm={confirmOrderHandler} onCancel={props.onClose}/>}
    {!isCheckout && checkoutActions}
    </React.Fragment>

    


    return (
        <Modal>
            {isSubmitting && <p>Data is being submitting.....</p>}
            {didSubmit && <p>Data is submitted successfully</p>}
            {!isSubmitting && !didSubmit && modalCartView}
        </Modal>
    )
}

export default Cart;