import React, { Component, Fragment } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { CURRENT_ROOM } from "../redux/types";

// Redux
import {
  getAllScreamReports,
  getAllHosts,
  getAllBanUser,
  getAllUserReports,
} from "../redux/actions/adminAction";
import { connect } from "react-redux";
import store from "../redux/store";

// Component
import ScreamReport from "../components/admin/ScreamReport";
import UserReport from "../components/admin/UserReport";
import FunctionButton from "../components/admin/FunctionBtn";
import Host from "../components/admin/HostsList";
import BanFunction from "../components/admin/BanFuncBtn";
import Ban from "../components/admin/BanList";

// MUI stuff
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";

export class admin extends Component {
  state = {
    adminName: null,
  };

  componentDidMount() {
    if (this.props.status === "admin") {
      const name = this.props.match.params.adminName;
      this.setState({ adminName: name });
      store.dispatch({ type: CURRENT_ROOM, payload: "ADMIN" });
      this.props.getAllScreamReports();
      this.props.getAllHosts();
      this.props.getAllBanUser();
      this.props.getAllUserReports();
    } else {
      setTimeout(() => {
        this.props.history.push("/home");
      }, 5000);
    }
  }
  render() {
    const {
      scream_reports,
      loading,
      host_list,
      ban_list,
      user_reports,
    } = this.props.admin;
    const { status } = this.props;

    let recentHostsMarkup = loading ? (
      <CircularProgress />
    ) : (
      host_list.map((host) => {
        return <Host key={host.hostId} host={host} />;
      })
    );

    let recentBanListMarkup = loading ? (
      <CircularProgress />
    ) : (
      ban_list.map((ban) => {
        return <Ban key={ban.createdAt} ban={ban} />;
      })
    );

    let recentScreamReportMarkup = loading ? (
      <CircularProgress />
    ) : (
      scream_reports.map((report) => {
        return <ScreamReport key={report.reportId} report={report} />;
      })
    );

    let recentUserReportMarkup = loading ? (
      <CircularProgress />
    ) : (
      user_reports.map((report) => {
        return <UserReport key={report.reportId} report={report} />;
      })
    );

    let adminCheck =
      status === "admin" ? (
        <Fragment>
          <Grid container direction="row" justify="center" alignItems="stretch">
            <Grid item sm={4} xs={12}>
              <Head>Ban List</Head>
              <BanFunction />
              <BetweenBtn>
                <Paper
                  elevation={8}
                  style={{
                    width: "70%",
                    position: "relative",
                    left: "15%",
                    marginBottom: "10%",
                  }}
                >
                  <br />
                  <Title>Ban List</Title>
                  <br />
                  <br />
                  <div>{recentBanListMarkup}</div>
                  <br />
                  <br />
                </Paper>
              </BetweenBtn>
            </Grid>
            <Grid item sm={4} xs={12}>
              <Grid container spacing={4} direction="column">
                <Grid item sm="12" xm="12">
                  <Head>Scream Reports</Head>
                  <div>{recentScreamReportMarkup}</div>
                </Grid>
                <Grid item sm="12" xm="12">
                  <Head>User Reports</Head>
                  <div>{recentUserReportMarkup}</div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={4} xs={12}>
              <Head>Hosts & Functions</Head>
              <FunctionButton />
              <BetweenBtn>
                <Paper
                  elevation={8}
                  style={{
                    width: "70%",
                    position: "relative",
                    left: "15%",
                    marginBottom: "10%",
                  }}
                >
                  <br />
                  <Title>Host List</Title>
                  <br />
                  {recentHostsMarkup}
                  <br />
                  <br />
                </Paper>
              </BetweenBtn>
            </Grid>
          </Grid>
        </Fragment>
      ) : (
        <Fragment>
          This is for admin
          <br />
          <br />
          Please go to bed and have some dream that you are Avartaz ADMIN
          <br />
          <br />
          Good bye
        </Fragment>
      );

    return adminCheck;
  }
}

const BetweenBtn = styled.div`
  margin-top: 20px;
`;

const Title = styled.span`
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
`;

const Head = styled.div`
  margin-bottom: 40px;
  font-size: 30px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
`;

admin.propTypes = {
  reports: PropTypes.object,
  getAllReports: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  admin: state.admin,
  status: state.user.status,
});

const mapActionsToProps = {
  getAllScreamReports,
  getAllHosts,
  getAllBanUser,
  getAllUserReports,
};

export default connect(mapStateToProps, mapActionsToProps)(admin);
