import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getRoomData, getAcceptAdvertise } from "../redux/actions/dataAction";
import PropTypes from "prop-types";
import { Zoom } from "react-slideshow-image";

// Component
import Room from "../components/Room";
import Profile from "../components/Profile";
import ADSButton from "../components/AdvertiseButton";

// MUI stuff
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

class home extends Component {
  componentDidMount() {
    this.props.getRoomData();
    this.props.getAcceptAdvertise();
  }

  render() {
    const { room, loading, accept_advertise } = this.props.data;

    const zoomOutProperties = {
      duration: 5000,
      transitionDuration: 500,
      infinite: true,
      indicators: true,
      scale: 0.4,
      arrows: true,
    };

    let recentRoomMarkup = !loading ? (
      room.map((room) => <Room key={room.roomId} room={room} />)
    ) : (
      <CircularProgress />
    );

    return (
      <Grid container spacing={5} justify="center">
        <Grid item sm={3} xs={12}>
          <Header>Select your room</Header>
          {recentRoomMarkup}
        </Grid>

        <Grid item sm={3} xs={12}>
          {/* <Typography variant="h4">Welcome</Typography> */}
          <Profile />
        </Grid>

        <Grid item sm={2} xs={12}>
          <Zoom {...zoomOutProperties}>
            {accept_advertise.map((each, index) => (
              <img
                key={index}
                style={{ width: "100%" }}
                src={each.advertiseImage}
              />
            ))}
          </Zoom>
          <ADSButton />
        </Grid>
      </Grid>
    );
  }
}

const Header = styled.h1`
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  color: darkblue;
  font-size: 40px;
`;

home.propTypes = {
  getRoomData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getRoomData, getAcceptAdvertise })(
  home
);
