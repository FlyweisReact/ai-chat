/** @format */

import axios from "axios";
import { Store } from "react-notifications-component";

const Baseurl = process.env.React_App_Baseurl;

const errorMessage =
  "We encountered an issue. Please refresh the page or try again later.";

export const showMsg = (title, message, type) => {
  Store.addNotification({
    title,
    message,
    type,
    insert: "top",
    container: "top-center",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 3000,
      onScreen: true,
    },
  });
};

const handleError = (error, customErrorMsg, errorMsgTitle) => {
  let msg = errorMessage;
  if (customErrorMsg) {
    msg = customErrorMsg;
  } else if (error?.response?.data?.message) {
    msg = error.response.data.message;
  }

  showMsg(errorMsgTitle, msg, "danger");
};

const getHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const apiRequest = async (method, url, payload = null, options = {}) => {
  const {
    setResponse,
    setLoading,
    additionalFunctions = [],
    successMsg,
    errorMsg,
    successMsgTitle = "",
    errorMsgTitle = "",
    hideErr = false,
  } = options;
  if (setLoading) setLoading(true);
  try {
    let response;
    if (method === "get" || method === "delete") {
      response = await axios[method](`${Baseurl}${url}`, getHeaders());
    } else {
      response = await axios[method](`${Baseurl}${url}`, payload, getHeaders());
    }
    if (setResponse) setResponse(response.data);
    if (successMsg) showMsg(successMsgTitle, successMsg, "success");
    additionalFunctions.forEach(
      (func) => func && typeof func === "function" && func(response?.data)
    );
  } catch (error) {
    if (hideErr) handleError(error, errorMsg, errorMsgTitle);
    if (setResponse) setResponse({});
  } finally {
    if (setLoading) setLoading(false);
  }
};

const apiRequest_with_redux = (method, url, payload = null, options = {}) => {
  const {
    setResponse,
    setLoading,
    additionalFunctions = [],
    successMsg,
    errorMsg,
    dispatchFunc = [],
  } = options;
  return async (dispatch) => {
    if (setLoading) setLoading(true);
    try {
      let response;
      if (method === "get" || method === "delete") {
        response = await axios[method](`${Baseurl}${url}`, getHeaders());
      } else {
        response = await axios[method](
          `${Baseurl}${url}`,
          payload,
          getHeaders()
        );
      }
      if (setResponse) setResponse(response.data);
      if (successMsg) showMsg("", successMsg, "success");
      dispatchFunc.forEach(
        (func) =>
          func && typeof func === "function" && dispatch(func(response?.data))
      );
      additionalFunctions.forEach(
        (func) => func && typeof func === "function" && func(response?.data)
      );
    } catch (error) {
      handleError(error, errorMsg);
    } finally {
      if (setLoading) setLoading(false);
    }
  };
};

// default api request --
export const getApi = (url, options) => apiRequest("get", url, null, options);
export const postApi = (url, payload, options) =>
  apiRequest("post", url, payload, options);
export const putApi = (url, payload, options) =>
  apiRequest("put", url, payload, options);
export const deleteApi = (url, options) =>
  apiRequest("delete", url, null, options);

// redux api --
export const postApiWithRedux = (url, payload, options) =>
  apiRequest_with_redux("post", url, payload, options);
