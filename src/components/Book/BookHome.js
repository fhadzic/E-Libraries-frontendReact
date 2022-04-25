import React, { useCallback, useContext, useEffect, useState } from 'react';
import NewAuthor from '../New/NewAuthor';
import Button from '../UI/Button/Button';

import Card from '../UI/Card/Card';
import BookList from './BooksList';
import classes from './BookHome.module.css';
import AuthContext from '../../store/auth-context';
import NewBook from '../New/NewBook';

const BookHome = (props) => {
  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);

  const [isEditingAuthor, setIsEditingAuthor] = useState(false);
  const [isEditingBook, setIsEditingBook] = useState(false);

  const ctx = useContext(AuthContext);

  const fatchAuthorsHandler = useCallback(async () => {

    try {
      const response = await fetch('http://localhost:8080/author/all');
      if (!response.ok) {
        throw new Error("Somthing went wrong!");
      }

      const data = await response.json();

      const loadedAuthors = [];
      for (const key in data) {
        loadedAuthors.push({
          id: data[key].id,
          firstName: data[key].firstName,
          lastName: data[key].lastName,
          address: data[key].address,
          email: data[key].email,
        });
      }

      setAuthors(loadedAuthors);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    fatchAuthorsHandler();
  }, [fatchAuthorsHandler]);

  const fatchBooksHandler = useCallback(async () => {

    try {
      const response = await fetch('http://localhost:8080/book/library?id=' + ctx.clickedLibrary.id);
      if (!response.ok) {
        throw new Error("Somthing went wrong!");
      }

      const data = await response.json();

      const loadedBooks = [];
      for (const key in data) {
        loadedBooks.push({
          id: data[key].id,
          title: data[key].title,
          authors: data[key].authors
        });
      }

      setBooks(loadedBooks);
    } catch (error) {
      console.log(error.message);
    }
  }, [ctx.clickedLibrary]);

  useEffect(() => {
    fatchBooksHandler();
  }, [fatchBooksHandler]);


  function updateAuthorId(author, id) {
    setAuthors((prevAuthors) => {
      return [{ ...author, id }, ...prevAuthors];
    });
  }

  function saveAuthorHandler(author) {

    fetch("http://localhost:8080/author/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(author),
    }).then(res => res.json())
      .then(result => updateAuthorId(author, result.id));

    setIsEditingAuthor(false);
  }

  function updateBookId(book, author_id) {
    setBooks((prevBooks) => {
      return [book, ...prevBooks];
    });

    updateAuthorsBookHandler(book, author_id, false);
  }

  function saveBookHandler(book, author_id) {
    fetch("http://localhost:8080/book/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    }).then(res => res.json()).then(response => {
      book.id = response.id;
      updateBookId(book, author_id)
    });
    setIsEditingBook(false);
  }

  const updateAuthorsBookHandler = (book, author_id, justUpdate) => {
    fetch("http://localhost:8080/book/" + book.id + "/author/" + author_id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });

    if (justUpdate) {
      for (const i in books) {
        if (books[i].id === book.id) {
          for (const key in authors) {
            if (parseInt(authors[key].id) === parseInt(author_id)) {
              let updateBooks = [...books];
              updateBooks[i].authors.push(authors[key]);
              setBooks(updateBooks);
              return;
            }
          }
        }
      }
    } else {
      fetch("http://localhost:8080/book/" + book.id + "/library/" + ctx.clickedLibrary.id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  const startIsEditingAuthor = () => {
    setIsEditingAuthor(true);
  }

  const stopIsEditingAuthor = () => {
    setIsEditingAuthor(false);
  }

  const startIsEditingBook = () => {
    setIsEditingBook(true);
  }

  const stopIsEditingBook = () => {
    setIsEditingBook(false);
  }

  return (
    <Card className={classes.library}>
      <h1>{ctx.clickedLibrary.name}</h1>
      <h3>{ctx.clickedLibrary.address}</h3>
      <Card className={classes.section}>
        {!isEditingAuthor && (<Button className={classes.addNewButton} type="button" onClick={startIsEditingAuthor}>Add New Author</Button>)}
        {isEditingAuthor && (<NewAuthor onCancel={stopIsEditingAuthor} onAddAuthor={saveAuthorHandler} />)}
      </Card>
      <Card className={classes.section}>
        {!isEditingBook && (<Button className={classes.addNewButton} type="button" onClick={startIsEditingBook}>Add New Book</Button>)}
        {isEditingBook && (<NewBook authors={authors} books={books} onCancel={stopIsEditingBook} onAddBook={saveBookHandler} onUpdateAuthorsBook={updateAuthorsBookHandler} />)}
      </Card>
      <Card className={classes.section}>
        <BookList books={books} />
      </Card>
    </Card>
  );
};

export default BookHome;
