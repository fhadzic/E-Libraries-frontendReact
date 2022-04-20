import React, { useState } from 'react';
import Button from '../UI/Button/Button';

import classes from './AddBook.module.css';

function AddBook(props) {

    const [titleState, setTiteleState] = useState("");
    const [authorState, setAuthorState] = useState(null);

    const titleInputChangeHandler = (event) => {
        setTiteleState(event.target.value);
    }

    const authorSelectChangeHandler = (event) => {
        setAuthorState(event.target.value);
    }

    const saveBook = () => {

        let authors = props.authors;
        let authorBook = null;

        for (const key in authors) {
            if (authors[key].id === parseInt(authorState)) {
                authorBook = authors[key];
            }
        }
        if (authorBook !== null) {
            const book = {
                id: Math.random().toString(),
                title: titleState,
                authors: [authorBook]
            };

            props.onAddBook(book, authorState);
        }

    }

    function submitHandler(event) {
        event.preventDefault();

        // could add validation here...

        if (titleState.trim().length === 0 || authorState === null) {
            props.onCancel();
            return;
        }

        let allBooks = props.books;

        for (const key in allBooks) {
            if (titleState.trim() === allBooks[key].title.trim()) {
                let authorsBook = allBooks[key].authors;
                for (const i in authorsBook) {
                    if (parseInt(authorsBook[i].id) === parseInt(authorState)) {
                        setTiteleState("Postoji knjiga sa zadanim autorom");
                        return;
                    }
                }

                props.onUpdateAuthorsBook(allBooks[key], authorState, true);
                setTiteleState("Dodan novi author");
                return;
            }
        }

        saveBook();
        setTiteleState("");

    }

    return (
        <form onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor='title'>Title Book</label>
                <input type='text' id='title' value={titleState} onChange={titleInputChangeHandler} />
            </div>
            <div className={classes.control}>
                <label htmlFor='title'>Author</label>
                <select value={authorState} onChange={authorSelectChangeHandler}>
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

export default AddBook;