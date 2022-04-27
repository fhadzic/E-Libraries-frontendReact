import React, { useEffect, useReducer, useRef, useState } from 'react';
import ExistingModal from '../UI/Alert/ExistingModal';
import UpdateModal from '../UI/Alert/UpdateModal';
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
    const [existingInput, setExistingInput] = useState();
    const [updateAuthors, setUpdateAuthors] = useState();

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

    const theFormIsValid = () => {
        let allBooks = props.books;

        for (const key in allBooks) {
            if (titleState.value.trim() === allBooks[key].title.trim()) {
                let authorsBook = allBooks[key].authors;
                let authorNames = "";
                for (const i in authorsBook) {
                    if (parseInt(authorsBook[i].id) === parseInt(authorIdState.value)) {
                        setExistingInput({
                            title: "Existing input",
                            message: "There is a book in this library called " + titleState.value + ", authored by " + authorsBook[i].firstName + " " + authorsBook[i].lastName + "!"
                        });
                        return;
                    }

                    if (parseInt(i) !== (authorsBook.length - 1)) {
                        authorNames += authorsBook[i].firstName + " " + authorsBook[i].lastName + ", ";
                    } else {
                        authorNames += authorsBook[i].firstName + " " + authorsBook[i].lastName + ".";
                    }
                }

                setUpdateAuthors({
                    title: 'Do you want to add a new author to the book?',
                    message: 'The book of the name ' + titleState.value + ', has authors: ' + authorNames,
                    book: allBooks[key]
                });
                return;
            }
        }

        saveBook();
    }

    function submitHandler(event) {
        event.preventDefault();

        if (titleState.value.trim().length === 0 && authorIdState.value === null) {
            props.onCancel();
            return;
        } else if (formIsValid) {
            theFormIsValid();
        } else if (!isAuthorValid) {
            dispatchAuthor({ type: "INPUT_BLUR" });
            authorIdRef.current.focus();
        } else {
            titleRef.current.focus();
        }
    }

    const existingHandler = () => {
        setExistingInput(null);
        props.onCancel();
    }

    const updateConfirmHandler = () => {
        props.onUpdateAuthorsBook(updateAuthors.book, authorIdState.value, true);
        setUpdateAuthors(null);
        props.onCancel();
    }

    const updateCancelHandler = () => {
        setUpdateAuthors(null);
    }

    return (
        <React.Fragment>
            {existingInput && <ExistingModal title={existingInput.title} message={existingInput.message} onConfirm={existingHandler}></ExistingModal>}
            {updateAuthors && <UpdateModal title={updateAuthors.title} message={updateAuthors.message} onConfirm={updateConfirmHandler} onCancel={updateCancelHandler}></UpdateModal>}
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
        </React.Fragment>
    );
}

export default NewBook;