import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AuthRoute = ({
  component: Component,
  authenticated,
  status,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true
          ? (console.log("From: PrivateRoute1"), (<Component {...props} />))
          : (console.log("From: PrivateRoute2"), (<Redirect to="/" />))
      }
    />
  );
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  status: state.user.credentials.status,
});

AuthRoute.propTypes = {
  user: PropTypes.object,
};

export default connect(mapStateToProps)(AuthRoute);
