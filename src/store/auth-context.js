import React, { useState, useEffect, useReducer } from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    isClickedLibrary: false,
    clickedLibrary: null,
    onLogout: () => { },
    onLogin: (email, password) => { },
    onClicked: (library) => { },
    onClickOut: () => {},
});

const libraryItemReducer = (state, action) => {

    if(action.type === "CLICKED_ITEM"){
      return { value: action.val, isClick: true };
    }
  
    if(action.type === "CLICKED_OUT"){
        return { value: null, isClick: false };
    }
  
    return { value: null, isClick: false };
  }

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [libraryItemState, dispatchLibrary] = useReducer(libraryItemReducer, {value: null, isClick: false});

    useEffect(() => {
        const storedUserLog = localStorage.getItem('isLoggedIn');

        if (storedUserLog === "1") {
            setIsLoggedIn(true);
        }

    }, []);


    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    }

    const loginHandler = (email, password) => {
        // I should of course check email and password
        // But it's just a dummy/ demo anyways
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
    }

    const clickedItemHandler = (library) => {
        dispatchLibrary({type: "CLICKED_ITEM", val: library});
    }

    const clickOutItemHandler = () => {
        dispatchLibrary({type: "CLICKED_OUT"});
    }

    return (
        <AuthContext.Provider 
            value={{
                isLoggedIn:isLoggedIn,
                isClickedLibrary: libraryItemState.isClick,
                clickedLibrary: libraryItemState.value,
                onLogout: logoutHandler,
                onLogin: loginHandler,
                onClicked: clickedItemHandler,
                onClickOut: clickOutItemHandler,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;