import React from "react";

import Library from "./Library";
import classes from "./LibraryList.module.css";

const LibraryList = (props) => {
    return (
        <ul className={classes['movies-list']}>
            {props.libraries.map((library) => (
                <Library
                    key={library.id}
                    id={library.id}
                    name={library.name}
                    openingDate={library.openingDate}
                    address={library.address}
                />
            ))}
        </ul>
    );
}

export default LibraryList;