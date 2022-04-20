import React, { useRef } from 'react';
import Button from '../UI/Button/Button';

import classes from './AddLibrary.module.css';

function AddLibrary(props) {
    const nameRef = useRef('');
    const openingDateRef = useRef('');
    const addressRef = useRef('');

    function submitHandler(event) {
        event.preventDefault();

        const library = {
            id: Math.random().toString(),
            name: nameRef.current.value,
            openingDate: openingDateRef.current.value,
            address: addressRef.current.value,
        };

        // could add validation here...

        if (library.name.trim().length === 0 || library.openingDate.trim().length === 0 || library.address.trim().length === 0) {
            props.onCancel();
            return;
        }


        props.onAddLibrary(library);

        fetch("http://localhost:8080/library/add", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(library),
        })

    }

    return (
        <form onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor='title'>Library Name</label>
                <input type='text' id='title' ref={nameRef} />
            </div>
            <div className={classes.control}>
                <label htmlFor='date'>Opening Date</label>
                <input type='text' id='date' ref={openingDateRef} />
            </div>
            <div className={classes.control}>
                <label htmlFor='opening-text'>Address</label>
                <input id='opening-text' ref={addressRef}></input>
            </div>
            <Button type="submit">Add Library</Button>
        </form>
    );
}

export default AddLibrary;