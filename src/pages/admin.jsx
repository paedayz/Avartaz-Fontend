import React, { Component, Fragment } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { CURRENT_ROOM } from "../redux/types";

// Redux
import {
  getAllReports,
  getAllHosts,
  getAllBanUser,
} from "../redux/actions/adminAction";
import { connect } from "react-redux";
import store from "../redux/store";

// Component
import Report from "../components/admin/Report";
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
      this.props.getAllReports();
      this.props.getAllHosts();
      this.props.getAllBanUser();
    } else {
      setTimeout(() => {
        this.props.history.push("/home");
      }, 5000);
    }
  }
  render() {
    const { reports, loading, host_list, ban_list } = this.props.admin;
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

    let recentReportMarkup = loading ? (
      <CircularProgress />
    ) : (
      reports.map((report) => {
        return <Report key={report.reportId} report={report} />;
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
              <Head>Report</Head>
              <div>{recentReportMarkup}</div>
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
  getAllReports,
  getAllHosts,
  getAllBanUser,
};

export default connect(mapStateToProps, mapActionsToProps)(admin);
