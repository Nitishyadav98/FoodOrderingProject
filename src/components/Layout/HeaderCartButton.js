import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../store/cart-context";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = props => {
    const [highlighted, setHighlighted] = useState(false);

    const cartCtx = useContext(CartContext);
    const { items } = cartCtx;
    
    const numberOfCartItems = cartCtx.items.reduce((curNumber, item)=>{
        return curNumber+item.amount;
    }, 0)


    const btnClasses = `${classes.button} ${highlighted ? classes.bump : ''}`

    useEffect(()=>{
        if(items.length===0){
            return;
        }
        setHighlighted(true);
        const timer = setTimeout(()=>{
            setHighlighted(false);
        }, 300);

        return ()=>{
            clearTimeout(timer);
        }
    },[items])

    return ( <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
        <CartIcon />
        </span>
        <span>your Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
    );
}

export default HeaderCartButton;