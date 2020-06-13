import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getRoomData } from "../redux/actions/dataAction";
import PropTypes from "prop-types";

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
  }

  render() {
    const { room, loading } = this.props.data;
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

export default connect(mapStateToProps, { getRoomData })(home);
