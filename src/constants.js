const DEV_SERVER_PORT = 8000;
export const SERVER_BASE_PATH =
  process.env.NODE_ENV === "production"
    ? ""
    : `http://localhost:${DEV_SERVER_PORT}`;
