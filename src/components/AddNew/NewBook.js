import React, { useEffect, useReducer, useRef, useState } from 'react';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

import classes from "../UI/Input/Input.module.css"

const titleReducer = (state, action) => {
    if (action.type === "USER_INPUT") {
        return { value: action.val, isValid: action.val.trim().length > 2 };
    } else if (action.type === "INPUT_BLUR") {
        return { value: state.value, isValid: state.value.trim().length > 2 };
    }

    return { value: '', isValid: false };
}

const authorReducer = (state, action) => {
    if (action.type === "USER_INPUT") {
        return { value: action.val, isValid: action.val !== null };
    } else if (action.type === "INPUT_BLUR") {
        return { value: state.value, isValid: state.value !== null };
    }

    return { value: null, isValid: false };
}

function NewBook(props) {

    const [formIsValid, setFormIsValid] = useState(false);

    const [titleState, dispatchTitle] = useReducer(titleReducer, { value: '', isValid: null });
    const [authorIdState, dispatchAuthor] = useReducer(authorReducer, { value: null, isValid: null });

    const titleRef = useRef();
    const authorIdRef = useRef();

    const { isValid: isTitleValid } = titleState;
    const { isValid: isAuthorValid } = authorIdState;


    useEffect(() => {
        const identifier = setTimeout(() => {
            setFormIsValid(
                isTitleValid && isAuthorValid
            );
        }, 500)

        return (() => {
            clearTimeout(identifier);
        })
    }, [isTitleValid, isAuthorValid]);


    const titleChangeHandler = (event) => {
        dispatchTitle({ type: "USER_INPUT", val: event.target.value });
    }

    const validateTitleHandler = () => {
        dispatchTitle({ type: "INPUT_BLUR" });
    }

    const authorChangeHandler = (event) => {
        dispatchAuthor({ type: "USER_INPUT", val: event.target.value });
    }

    const validateAuthorHandler = () => {
        dispatchAuthor({ type: "INPUT_BLUR" });
    }
    /*
        const authorSelectChangeHandler = (event) => {
            setAuthorState(event.target.value);
        }
    */
    const saveBook = () => {

        let authors = props.authors;
        let authorBook = null;

        for (const key in authors) {
            if (authors[key].id === parseInt(authorIdState.value)) {
                authorBook = authors[key];
            }
        }
        if (authorBook !== null) {
            const book = {
                id: Math.random().toString(),
                title: titleState.value,
                authors: [authorBook]
            };

            props.onAddBook(book, authorIdState.value);
        }

    }

    function submitHandler(event) {
        event.preventDefault();

        // could add validation here...


        if (titleState.value.trim().length === 0 && authorIdState.value === null) {
            props.onCancel();
            return;
        } else if (formIsValid){

            let allBooks = props.books;

            for (const key in allBooks) {
                if (titleState.value.trim() === allBooks[key].title.trim()) {
                    let authorsBook = allBooks[key].authors;
                    for (const i in authorsBook) {
                        if (parseInt(authorsBook[i].id) === parseInt(authorIdState.value)) {
                            //setTiteleState("Postoji knjiga sa zadanim autorom");
                            return;
                        }
                    }

                    props.onUpdateAuthorsBook(allBooks[key], authorIdState.value, true);
                    //setTiteleState("Dodan novi author");
                    return;
                }
            }

            saveBook();

        }else if (!isAuthorValid) {
            dispatchAuthor({ type: "INPUT_BLUR" });
            authorIdRef.current.focus();
        }else{
            titleRef.current.focus();
        }

    }

    return (
        <form onSubmit={submitHandler}>
            <Input
                ref={titleRef}
                id={'title'}
                label={'Title Book'}
                type={'text'}
                isValid={isTitleValid}
                value={titleState.value}
                onChange={titleChangeHandler}
                onBlur={validateTitleHandler}
            />
            <div className={`${classes.control} ${isAuthorValid === false ? classes.invalid : ''}`}>
                <label htmlFor='author'>Author</label>
                <select ref={authorIdRef} value={authorIdState.value} onChange={authorChangeHandler} onBlur={validateAuthorHandler}>
                    <option disabled selected value> -- select an option -- </option>
                    {props.authors.map((author) => (
                        <option value={author.id}>{`${author.firstName} ${author.lastName}`}</option>
                    ))}
                </select>
            </div>
            <Button type="submit">Add Book</Button>
        </form>
    );
}

export default NewBook;