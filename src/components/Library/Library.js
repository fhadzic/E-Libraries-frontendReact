import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";

import classes from "./Library.module.css";
const Library = (props) => {

  const ctx = useContext(AuthContext);

  const clickItemHandler = () => {
    const library = {
      id: props.id,
      name: props.name,
      openingDate: props.openingDate,
      address: props.address
    }
    ctx.onClicked(library);
  }


  return (
    <li className={classes.library} onClick={clickItemHandler}>
      <h2>{props.name}</h2>
      <h3>{props.openingDate}</h3>
      <p>{props.address}</p>
    </li>
  );
}

export default Library;