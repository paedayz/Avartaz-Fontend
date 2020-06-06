import axios from "axios";
import {
  SET_REPORTS,
  LOADING_ADMIN_DATA,
  SET_HOSTS,
  SET_BAN_LIST,
} from "../types";

// Get all reports
export const getAllReports = () => (dispatch) => {
  dispatch({ type: LOADING_ADMIN_DATA });
  axios
    .get("/reports")
    .then((res) => {
      dispatch({ type: SET_REPORTS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SET_REPORTS, payload: [] });
    });
};

export const setHostStatus = (avatarName, status) => (dispatch) => {
  dispatch({ type: LOADING_ADMIN_DATA });
  axios
    .post(`/admin/setHost/${avatarName}`, status)
    .then((res) => {
      dispatch({ type: SET_HOSTS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SET_HOSTS, payload: [] });
    });
};

export const getAllHosts = () => (dispatch) => {
  dispatch({ type: LOADING_ADMIN_DATA });
  axios
    .get("/admin/hosts")
    .then((res) => {
      dispatch({ type: SET_HOSTS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SET_HOSTS, payload: [] });
    });
};

export const deleteHost = (status) => (dispatch) => {
  dispatch({ type: LOADING_ADMIN_DATA });
  axios
    .get(`/admin/delete/${status}`)
    .then((res) => {
      dispatch({ type: SET_HOSTS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SET_HOSTS, payload: [] });
    });
};

export const addRoom = (room) => (dispatch) => {
  axios.post("/room", room).then(() => {
    console.log("Add room complete");
  });
};

export const banUser = (avatarName, banData) => (dispatch) => {
  dispatch({ type: LOADING_ADMIN_DATA });
  axios
    .post(`/admin/ban/${avatarName}`, banData)
    .then((res) => {
      dispatch({ type: SET_BAN_LIST, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SET_BAN_LIST, payload: [] });
    });
};

export const getAllBanUser = () => (dispatch) => {
  axios
    .get("/admin/ban")
    .then((res) => {
      dispatch({ type: SET_BAN_LIST, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SET_BAN_LIST, payload: [] });
    });
};

export const releaseBanUser = (avatarName) => (dispatch) => {
  dispatch({ type: LOADING_ADMIN_DATA });
  axios
    .get(`/admin/release/${avatarName}`)
    .then((res) => {
      dispatch({ type: SET_BAN_LIST, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SET_BAN_LIST, payload: [] });
    });
};
