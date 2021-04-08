import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const NoTestUserRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();

  const NotTestUserAndIsLoggedIn = () => {
    if (currentUser === null) {
      return <Redirect to="/login" />;
    }

    if (currentUser.email === "teszt@tesztfiok.com") {
      return <p className="text-danger text-center">A művelet nem lehetséges teszt profilban!</p>;
    }
    return (
      <Route
        {...rest}
        render={(props) => {
          return <Component {...props} />;
        }}
      ></Route>
    );
  };

  return (
    <>
      <NotTestUserAndIsLoggedIn />
    </>
  );
};

export default NoTestUserRoute;
