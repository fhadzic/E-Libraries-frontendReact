import React from "react";
import ReactDOM from "react-dom";
import Button from "../Button/Button";
import Card from "../Card/Card";

import classes from "./ExistingModal.module.css";

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onCancel} />;
}

const ModalOverlay = (props) => {
    return (
        <Card className={classes.modal}>
            <header className={classes.header}>
                <h2>{props.title}</h2>
            </header>
            <div className={classes.content}>
                <p>{props.message}</p>
            </div>
            <footer className={classes.actions}>
                <Button onClick={props.onConfirm}>Yes</Button>
                <Button onClick={props.onCancel}>No</Button>
            </footer>
        </Card>
    );
}

const UpdateModal = (props) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop onCancel={props.onCancel} />, document.getElementById('backdrop-root'))}
            {ReactDOM.createPortal(
                <ModalOverlay
                    title={props.title}
                    message={props.message}
                    onConfirm={props.onConfirm}
                    onCancel={props.onCancel}
                />,
                document.getElementById('overlay-root'))}
        </React.Fragment>
    );
}

export default UpdateModal;