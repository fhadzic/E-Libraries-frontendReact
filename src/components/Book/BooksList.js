import React from "react";

import Book from "./Book";
import classes from "./BooksList.module.css";

const BooksList = (props) => {
    return (
        <ul className={classes['movies-list']}>
            {props.books.map((book) => (
                <Book
                    key={book.id}
                    title={book.title}
                    id={book.id}
                    authors={book.authors}
                />
            ))}
        </ul>
    );
}

export default BooksList;