// import Cookies from "js-cookie";

import { toast } from "react-hot-toast";
export const authHeader = () => {
  let sessionObj = getSession();
  if (sessionObj && sessionObj.access_token) {
    return {
      "x-auth-token": sessionObj.access_token,
      "Content-Security-Policy": "default-src 'self',frame-src 'self'",
      "Access-Control-Allow-Origin": "*",
      "X-Content-Type-Options": "nosniff",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
      "Content-Type": "application/json",
      "X-Frame-Options": "SAMEORIGIN",
      "ngrok-skip-browser-warning": true,
    };
  } else {
    return {
      "Content-Security-Policy": "default-src 'self',frame-src 'self'",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
      "Content-Type": "application/json",
      "X-Frame-Options": "SAMEORIGIN",
      "X-Content-Type-Options": "nosniff",
      "ngrok-skip-browser-warning": true,
    };
  }
};

export const authHeaderSignup = (data) => {
  const email = data.email;
  const role = "user";
  let token = `${email}:${role}`;
  for (let i = 0; i < 10; i++) token = btoa(token);
  if (data && data.email) {
    return {
      "x-auth-token": token,
      "Content-Security-Policy": "default-src 'self',frame-src 'self'",
      "Access-Control-Allow-Origin": "*",
      "X-Content-Type-Options": "nosniff",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
      "Content-Type": "application/json",
      "X-Frame-Options": "SAMEORIGIN",
      "ngrok-skip-browser-warning": true,
    };
  } else {
    return {
      "Content-Security-Policy": "default-src 'self',frame-src 'self'",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
      "Content-Type": "application/json",
      "X-Frame-Options": "SAMEORIGIN",
      "X-Content-Type-Options": "nosniff",
      "ngrok-skip-browser-warning": true,
    };
  }
};

export const customAuthHeader = (data) => {
  if (data) {
    return {
      "x-auth-token": data,
      "Content-Security-Policy": "default-src 'self',frame-src 'self'",
      "Access-Control-Allow-Origin": "*",
      "X-Content-Type-Options": "nosniff",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
      "Content-Type": "application/json",
      "X-Frame-Options": "SAMEORIGIN",
      "ngrok-skip-browser-warning": true,
    };
  } else {
    return {
      "Content-Security-Policy": "default-src 'self',frame-src 'self'",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
      "Content-Type": "application/json",
      "X-Frame-Options": "SAMEORIGIN",
      "X-Content-Type-Options": "nosniff",
      "ngrok-skip-browser-warning": true,
    };
  }
};

export const authHeaderForm = () => {
  let sessionObj = getSession();
  if (sessionObj && sessionObj.access_token) {
    return {
      Authorization: sessionObj.access_token,
      "Content-Security-Policy": "default-src 'self',frame-src 'self'",
      "Access-Control-Allow-Origin": "*",
      "X-Content-Type-Options": "nosniff",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
      "Content-Type": "multipart/form-data",
      "X-Frame-Options": "SAMEORIGIN",
    };
  } else {
    return {
      "Content-Security-Policy": "default-src 'self',frame-src 'self'",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
      "Content-Type": "multipart/form-data",
      "X-Frame-Options": "SAMEORIGIN",
      "X-Content-Type-Options": "nosniff",
    };
  }
};

export const setSession = (sessionObj, rememberMe) => {
  if (sessionObj.userInfo && sessionObj.access_token) {
    // Cookies.set("authUser", JSON.stringify(sessionObj), { expires: 1 });
    localStorage.setItem("authUser", JSON.stringify(sessionObj));
  }
};

export const getSession = () => {
  // const cookieVal = Cookies.get("authUser") || null;
  return JSON.parse(localStorage.getItem("authUser"));
};

export const deleteSession = () => {
  localStorage.removeItem("authUser");
  // Cookies.remove("authUser");
};

export const deleteCookie = () => {
  // Cookies.remove("authUser");
};

export const logout = () => {
  localStorage.removeItem("authUser");
  toast("Logged out successfully");
  // Cookies.remove("authUser");
};
