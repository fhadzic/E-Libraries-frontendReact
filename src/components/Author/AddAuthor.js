import React, { useRef } from 'react';
import Button from '../UI/Button/Button';

import classes from './AddAuthor.module.css';

function AddAuthor(props) {
    const firstNameRef = useRef('');
    const lastNameRef = useRef('');
    const addressRef = useRef('');
    const emailRef = useRef('');



    function submitHandler(event) {
        event.preventDefault();

        // could add validation here...

        const author = {
            id: Math.random().toString(),
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            address: addressRef.current.value,
            email: emailRef.current.value,
        };


        if (author.firstName.trim().length === 0 || author.lastName.trim().length === 0 || author.address.trim().length === 0 || author.email.trim().length === 0) {
            props.onCancel();
            return;
        }

        props.onAddAuthor(author);
        
    }

    return (
        <form onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor='title'>First Name</label>
                <input type='text' id='title' ref={firstNameRef} />
            </div>
            <div className={classes.control}>
                <label htmlFor='title'>Last Name</label>
                <input type='text' id='title' ref={lastNameRef} />
            </div>
            <div className={classes.control}>
                <label htmlFor='opening-text'>Address</label>
                <input id='opening-text' ref={addressRef}></input>
            </div>
            <div className={classes.control}>
                <label htmlFor='date'>Email</label>
                <input type='text' id='date' ref={emailRef} />
            </div>
            <Button type="submit">Add Author</Button>
        </form>
    );
}

export default AddAuthor;