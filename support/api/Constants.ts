export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export const ENDPOINTS = {
  POST_LOGIN_RRHH: {
    endpoint: "/api/auth/login",
  },
  GET_EMPLEADOS_RRHH: {
    endpoint: "/api/empleados",
  },
};

export const HEADERS = {
  ACCEPT_LANGUAGE: process.env.LANGUAGE,
};

export const WAITS = {
  TINY: 50,
  SHORT: 10,
  NORMAL: 30,
  MEDIUM: 45,
  LONG: 60,
};
