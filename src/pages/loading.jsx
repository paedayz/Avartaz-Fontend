import React, { Component, Fragment } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

class home extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.history.push("/home");
    }, 5000);
  }

  render() {
    return (
      <Fragment>
        <CircularProgress />
      </Fragment>
    );
  }
}

export default home;
