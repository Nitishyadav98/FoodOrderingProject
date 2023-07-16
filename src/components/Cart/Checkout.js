import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const Checkout = (props) => {
    const [formInputValidity, setFormInputValidity] = useState({
        name : true,
        street : true,
        postalCode : true,
        city : true, 
    })

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    const isEmpty = value => value.trim() === '';
    const isSixChar = value => value.trim().length !== 6;

    const submitHandler = (event) =>{
        event.preventDefault();

        const enteredName = nameInputRef.current.value
        const enteredStreet = streetInputRef.current.value
        const enteredPostalCode = postalCodeInputRef.current.value
        const enteredCity = cityInputRef.current.value

        const enteredNameValid = !isEmpty(enteredName);
        const enteredStreetValid = !isEmpty(enteredStreet)
        const enteredPostalValid = !isEmpty(enteredPostalCode)
        const enteredCityValid = isSixChar(enteredCity)

        setFormInputValidity({
            name : enteredNameValid,
            street : enteredStreetValid,
            postalCode : enteredPostalValid,
            city : enteredCityValid,
        })

        const formIsValid = enteredNameValid && enteredStreetValid && enteredPostalValid && enteredCityValid

        if(formIsValid){
            return;
        }

        props.onConfirm({
            name : enteredName,
            street : enteredStreet,
            postalCode : enteredPostalCode,
            city : enteredCity,
        })

    }

    const nameClassesControl = `${classes.control} ${formInputValidity.name ? '' : classes.invalid}`
    const streetClassesControl = `${classes.control} ${formInputValidity.street ? '' : classes.invalid}`
    const postalCodeClassesControl = `${classes.control} ${formInputValidity.postalCode ? '' : classes.invalid}`
    const cityClassesControl = `${classes.control} ${formInputValidity.city ? '' : classes.invalid}`

    return <form className={classes.form} onSubmit={submitHandler}>
        <div className={nameClassesControl}>
            <label htmlFor='name'>your Name</label>
            <input type='text' id='name' ref={nameInputRef}/>
            {!formInputValidity.name && <p>Entered Name is not valid</p>}
        </div> 
        <div className={streetClassesControl}>
            <label htmlFor='street'>Street</label>
            <input type='text' id='street' ref={streetInputRef}/>
            {!formInputValidity.street && <p>Entered street is not valid</p>}
        </div>
        <div className={postalCodeClassesControl}>
            <label htmlFor='postal'>Postal Code</label>
            <input type='text' id='postal' ref={postalCodeInputRef}/>
            {!formInputValidity.postalCode && <p>Entered postal code is not valid</p>}
        </div>
        <div className={cityClassesControl}>
            <label htmlFor='city'>City</label>
            <input type='text' id='city' ref={cityInputRef}/>
            {!formInputValidity.city && <p>Entered city is not valid</p>}
        </div>
        <div className={classes.actions}>
        <button type='button'onClick={props.onCancel}>Cancel</button>
        <button className={classes.submit}>Confirm</button>
        </div>
    </form>
}

export default Checkout;