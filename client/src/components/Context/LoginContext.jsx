import React, { createContext, useEffect, useReducer, useState } from "react";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: JSON.parse(localStorage.getItem("token")) || null,
  refreshToken: JSON.parse(localStorage.getItem("refreshToken")) || null,
  loading: false,
  error: null,
};

export const LoginContext = createContext(INITIAL_STATE);

const UserReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        token: null,
        refreshToken: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload.user,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        token: null,
        refreshToken: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        token: null,
        refreshToken: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

// eslint-disable-next-line react/prop-types
export const LoginContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("token", JSON.stringify(state.token));
    if (state.refreshToken)
      localStorage.setItem("refreshToken", JSON.stringify(state.refreshToken));
  }, [state.token]);

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <LoginContext.Provider
      value={{
        user: state.user,
        token: state.token,
        loading: state.loading,
        error: state.error,
        setUserName,
        userName,
        dispatch,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
