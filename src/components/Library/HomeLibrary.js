import React, { useCallback, useEffect, useState } from 'react';
import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import LibraryList from './LibraryList';

import classes from './HomeLibrary.module.css';
import NewLibrary from '../AddNew/NewLibrary';

const HomeLibrary = (props) => {
  const [libraries, setLibraries] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const fatchLibrariesHandler = useCallback(async () => {

    try {
      const response = await fetch('http://localhost:8080/library/all');
      if (!response.ok) {
        throw new Error("Somthing went wrong!");
      }

      const data = await response.json();

      const loadedLibraries = [];
      for (const key in data) {
        loadedLibraries.push({
          id: data[key].id,
          name: data[key].name,
          address: data[key].address,
          openingDate: data[key].openingDate,
        });
      }

      setLibraries(loadedLibraries);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    fatchLibrariesHandler();
  }, [fatchLibrariesHandler]);

  function updateLibraryId(library, id) {
    const newLibrary = {
      ...library,
      id: id,
    };

    setLibraries((prevLibraries) => {
      return [newLibrary, ...prevLibraries];
    });
  }

  function saveLibraryHandler(library) {
    fetch("http://localhost:8080/library/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(library),
    }).then(res => res.json())
      .then(result => updateLibraryId(library, result.id));

    setIsEditing(false);
  }

  const startIsEditing = () => {
    setIsEditing(true);
  }

  const stopIsEditing = () => {
    setIsEditing(false);
  }

  return (
    <Card className={classes.library}>
      <Card className={classes.section}>
        {!isEditing && (<Button type="button" onClick={startIsEditing}>Add New Library</Button>)}
        {isEditing && (<NewLibrary onCancel={stopIsEditing} onAddLibrary={saveLibraryHandler} />)}
      </Card>
      <Card className={classes.section}>
        <LibraryList libraries={libraries} />
      </Card>
    </Card>
  );
};

export default HomeLibrary;
