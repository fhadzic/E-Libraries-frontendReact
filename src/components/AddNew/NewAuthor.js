import React, { useEffect, useReducer, useRef, useState } from 'react';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';



const firstNameReducer = (state, action) => {

    if (action.type === "USER_INPUT") {
        return { value: action.val, isValid: action.val.trim().length > 2 };
    }

    if (action.type === "INPUT_BLUR") {
        return { value: state.value, isValid: state.value.trim().length > 2 };
    }

    return { value: '', isValid: false };
}

const lastNameReducer = (state, action) => {

    if (action.type === "USER_INPUT") {
        return { value: action.val, isValid: action.val.trim().length > 2 };
    }

    if (action.type === "INPUT_BLUR") {
        return { value: state.value, isValid: state.value.trim().length > 2 };
    }

    return { value: '', isValid: false };
}

const addressReducer = (state, action) => {

    if (action.type === "USER_INPUT") {
        return { value: action.val, isValid: action.val.trim().length > 2 };
    }

    if (action.type === "INPUT_BLUR") {
        return { value: state.value, isValid: state.value.trim().length > 2 };
    }

    return { value: '', isValid: false };
}

const emailReducer = (state, action) => {

    if (action.type === "USER_INPUT") {
        return { value: action.val, isValid: action.val.includes('@') };
    }

    if (action.type === "INPUT_BLUR") {
        return { value: state.value, isValid: state.value.includes('@') };
    }

    return { value: '', isValid: false };
}

function NewAuthor(props) {

    const [formIsValid, setFormIsValid] = useState(false);

    const [firstNameState, dispatchFirstName] = useReducer(firstNameReducer, { value: '', isValid: null });
    const [lastNameState, dispatchLastName] = useReducer(lastNameReducer, { value: '', isValid: null });
    const [addressState, dispatchAddress] = useReducer(addressReducer, { value: '', isValid: null });
    const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: null });

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const addressRef = useRef();
    const emailRef = useRef();

    const { isValid: firstNameIsValid } = firstNameState;
    const { isValid: lastNameIsValid } = lastNameState;
    const { isValid: addressIsValid } = addressState;
    const { isValid: emailIsValid } = emailState;

    useEffect(() => {
        const identifier = setTimeout(() => {
            setFormIsValid(
                firstNameIsValid && lastNameIsValid && addressIsValid && emailIsValid
            );
        }, 500)

        return (() => {
            clearTimeout(identifier);
        })
    }, [firstNameIsValid, lastNameIsValid, addressIsValid, emailIsValid]);




    const firstNameChangeHandler = (event) => {
        dispatchFirstName({ type: "USER_INPUT", val: event.target.value });
    };

    const lastNameChangeHandler = (event) => {
        dispatchLastName({ type: "USER_INPUT", val: event.target.value });
    };

    const addressChangeHandler = (event) => {
        dispatchAddress({ type: "USER_INPUT", val: event.target.value });
    };

    const emailChangeHandler = (event) => {
        dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
    };




    const validateFirstNameHandler = () => {
        dispatchFirstName({ type: "INPUT_BLUR" });
    };

    const validateLastNameHandler = () => {
        dispatchLastName({ type: "INPUT_BLUR" });
    };

    const validateAddressHandler = () => {
        dispatchAddress({ type: "INPUT_BLUR" });
    };

    const validateEmailHandler = () => {
        dispatchEmail({ type: "INPUT_BLUR" });
    };



    const focusInput = () => {
        if (!firstNameIsValid) {
            firstNameRef.current.focus();
        } else if (!lastNameIsValid){
            lastNameRef.current.focus();
        } else if (!addressIsValid){
            addressRef.current.focus();
        } else {
            emailRef.current.focus();
        }
    }

    function submitHandler(event) {
        event.preventDefault();

        const author = {
            id: Math.random().toString(),
            firstName: firstNameState.value,
            lastName: lastNameState.value,
            address: addressState.value,
            email: emailState.value,
        };

        if (author.firstName.trim().length === 0 && author.lastName.trim().length === 0 && author.address.trim().length === 0 && author.email.trim().length === 0) {
            props.onCancel();
            return;
        } else if (formIsValid){
            props.onAddAuthor(author);
        } else {
            focusInput();
        }
    }

    return (
        <form onSubmit={submitHandler}>
            <Input
                ref={firstNameRef}
                id={'firstName'}
                label={'First Name'}
                type={'text'}
                isValid={firstNameIsValid}
                value={firstNameState.value}
                onChange={firstNameChangeHandler}
                onBlur={validateFirstNameHandler}
            />
            <Input
                ref={lastNameRef}
                id={'lastName'}
                label={'Last Name'}
                type={'text'}
                isValid={lastNameIsValid}
                value={lastNameState.value}
                onChange={lastNameChangeHandler}
                onBlur={validateLastNameHandler}
            />
            <Input
                ref={addressRef}
                id={'address'}
                label={'Address'}
                type={'text'}
                isValid={addressIsValid}
                value={addressState.value}
                onChange={addressChangeHandler}
                onBlur={validateAddressHandler}
            />
            <Input
                ref={emailRef}
                id={'email'}
                label={'E-Mail'}
                type={'text'}
                isValid={emailIsValid}
                value={emailState.value}
                onChange={emailChangeHandler}
                onBlur={validateEmailHandler}
            />

            <Button type="submit">Add Author</Button>
        </form>
    );
}

export default NewAuthor;