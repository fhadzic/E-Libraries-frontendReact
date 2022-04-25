import React, { useImperativeHandle, useRef } from "react";

import classes from "./InputLogin.module.css";

const InputLogin = React.forwardRef((props, ref) => {

    const inputRef = useRef();

    const activate = () => {
        inputRef.current.focus();
    }

    useImperativeHandle(ref, () => {
        return {
            focus: activate
        };
    });

    return (
        <div className={`${classes.control} ${props.isValid === false ? classes.invalid : ''}`} >
            <label htmlFor={props.id}>{props.label}</label>

            <input
                ref={inputRef}
                type={props.type}
                id={props.id}
                isValid={props.isValid}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
            />
        </div>
    );
});

export default InputLogin;