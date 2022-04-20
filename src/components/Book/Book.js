import React from "react";

import classes from "./Book.module.css";
const Book = (props) => {

  return (
    <li className={classes.library}>
      <h2>{props.title}</h2>
      <p>{props.id}</p>
      <div>
        {props.authors.map((author) => (
          <h3>{`${author.firstName} ${author.lastName}`}</h3>
        ))}
      </div>
    </li>
  );
}

export default Book;