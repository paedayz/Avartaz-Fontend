import React, { Component, Fragment } from "react";
import styled from "styled-components";
import dayjs from "dayjs";

// Redux
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataAction";

// MUI stuff
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import CardMedia from "@material-ui/core/CardMedia";
import Paper from "@material-ui/core/Paper";
import VisibilityIcon from "@material-ui/icons/Visibility";

class ProfileDialog extends Component {
  state = {
    open: false,
    avatarName: this.props.avatarName,
  };

  handleClickClose = () => {
    this.setState({ open: false });
  };

  render() {
    const showProfile = () => {
      this.setState({ open: true });
      this.props.getUserData(this.state.avatarName);
    };
    const {
      status,
      avatarImage,
      createdAt,
      bio,
      website,
      location,
      avatarName,
    } = this.props.userData;
    return (
      <Fragment>
        <ProfilePic
          image={this.props.avatarImage}
          title="Profile image"
          onClick={() => showProfile()}
        />
        <Dialog open={this.state.open} onClose={this.handleClickClose}>
          <Box elevation={10}>
            <br />
            <ImageBox>
              {status === "ban" ? (
                <BanImage src={avatarImage} />
              ) : (
                <Image src={avatarImage}></Image>
              )}

              <input
                type="file"
                id="imageInput"
                hidden="hidden"
                onChange={this.handleImageChange}
              />
            </ImageBox>

            <p>
              <b>Welcome</b> {avatarName}
            </p>
            <p>
              <b>Joined</b> {dayjs(createdAt).format("MMM YYYY")}
            </p>
            {bio ? (
              <div>
                <p>
                  <b>Bio</b> {bio}
                </p>
                <p>
                  <b>website</b> {website}
                </p>
                <p>
                  <b>location</b> {location}
                </p>
              </div>
            ) : (
              ""
            )}
            {status !== "ban" && status !== "admin" && status !== "user" && (
              <div>
                <b>Host : </b>
                {status}
              </div>
            )}
          </Box>
        </Dialog>
      </Fragment>
    );
  }
}

const ImageBox = styled.div`
  margin-left: 50px;
`;

const Box = styled(Paper)`
  width: 450px;
  height: 600px;
  font-family: Arial, Helvetica, sans-serif;
`;

const BanImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  position: relative;
  left: -7%;
  border: solid red 5px;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  position: relative;
  left: -7%;
  border: solid darkturquoise 5px;
`;

const ProfilePic = styled(CardMedia)`
  min-width: 200px;
  min-height: 200px;
  cursor: pointer;
`;

const mapStateToProps = (state) => ({
  userData: state.data.userData,
});

export default connect(mapStateToProps, { getUserData })(ProfileDialog);
