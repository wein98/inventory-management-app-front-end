import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from 'js-cookie';

function PrivateRoute({ children, ...rest }) {
    // isLoggenIn doesn't works, so im using cookies
    let { isLoggedIn } = useSelector(state => state.auth);
    console.log(isLoggedIn)
    console.log(Cookies.get('token'));
    return (
      <Route
        {...rest}
        render={({ location }) =>
        Cookies.get('token') ? (
            children
          ) : (
            <Redirect to='/auth'/>
          )
        }
      />
    );
  }

export default PrivateRoute;