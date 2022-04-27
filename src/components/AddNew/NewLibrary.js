import React, { useEffect, useReducer, useRef, useState } from 'react';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';


const nameReducer = (state, action) => {

    if (action.type === "USER_INPUT") {
        return { value: action.val, isValid: action.val.trim().length > 2 };
    }

    if (action.type === "INPUT_BLUR") {
        return { value: state.value, isValid: state.value.trim().length > 2 };
    }

    return { value: '', isValid: false };
}

const openingDateReducer = (state, action) => {

    if (action.type === "USER_INPUT") {
        console.log(action.val);
        return { value: action.val, isValid: action.val.trim().length !== 0 };
    }

    if (action.type === "INPUT_BLUR") {
        return { value: state.value, isValid: state.value.trim().length !== 0 };
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


function NewLibrary(props) {

    const [formIsValid, setFormIsValid] = useState(false);

    const [nameState, dispatchName] = useReducer(nameReducer, { value: '', isValid: null });
    const [openingDateState, dispatchOpeningDate] = useReducer(openingDateReducer, { value: '', isValid: null });
    const [addressState, dispatchAddress] = useReducer(addressReducer, { value: '', isValid: null });

    const nameRef = useRef('');
    const openingDateRef = useRef('');
    const addressRef = useRef('');

    const { isValid: nameIsValid } = nameState;
    const { isValid: openingDateIsValid } = openingDateState;
    const { isValid: addressIsValid } = addressState;

    useEffect(() => {
        const identifier = setTimeout(() => {
            setFormIsValid(
                nameIsValid && openingDateIsValid && addressIsValid
            );
        }, 500)

        return (() => {
            clearTimeout(identifier);
        })
    }, [nameIsValid, openingDateIsValid, addressIsValid]);




    const nameChangeHandler = (event) => {
        dispatchName({ type: "USER_INPUT", val: event.target.value });
    };

    const openingDateChangeHandler = (event) => {
        dispatchOpeningDate({ type: "USER_INPUT", val: event.target.value });
    };

    const addressChangeHandler = (event) => {
        dispatchAddress({ type: "USER_INPUT", val: event.target.value });
    };




    const validateNameHandler = () => {
        dispatchName({ type: "INPUT_BLUR" });
    };

    const validateOpeningDateHandler = () => {
        dispatchOpeningDate({ type: "INPUT_BLUR" });
    };

    const validateAddressHandler = () => {
        dispatchAddress({ type: "INPUT_BLUR" });
    };



    const focusInput = () => {
        if (!nameIsValid) {
            nameRef.current.focus();
        } else if (!openingDateIsValid) {
            openingDateRef.current.focus();
        } else {
            addressRef.current.focus();
        }
    }


    function submitHandler(event) {
        event.preventDefault();

        const library = {
            id: Math.random().toString(),
            name: nameState.value,
            openingDate: openingDateState.value,
            address: addressState.value,
        };


        if (library.name.trim().length === 0 && library.openingDate.trim().length === 0 && library.address.trim().length === 0) {
            props.onCancel();
            return;
        } else if (formIsValid) {
            props.onAddLibrary(library);
        } else {
            focusInput();
        }

    }

    return (
        <form onSubmit={submitHandler}>
            <Input
                ref={nameRef}
                id={'name'}
                label={'Library Name'}
                type={'text'}
                isValid={nameIsValid}
                value={nameState.value}
                onChange={nameChangeHandler}
                onBlur={validateNameHandler}
            />
            <Input
                ref={openingDateRef}
                id={'date'}
                label={'Opening Date'}
                type={'date'}
                isValid={openingDateIsValid}
                value={openingDateState.value}
                onChange={openingDateChangeHandler}
                onBlur={validateOpeningDateHandler}
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
            <Button type="submit">Add Library</Button>
        </form>
    );
}

export default NewLibrary;


/*
<form onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor='title'>Library Name</label>
                <input type='text' id='title' ref={nameRef} />
            </div>
            <div className={classes.control}>
                <label htmlFor='date'>Opening Date</label>
                <input type='datenp' id='date' ref={openingDateRef} />
            </div>
            <div className={classes.control}>
                <label htmlFor='opening-text'>Address</label>
                <input id='opening-text' ref={addressRef}></input>
            </div>
            <Button type="submit">Add Library</Button>
        </form>
*/