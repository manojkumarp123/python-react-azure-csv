import React from "react";
import { CircularProgress } from "@material-ui/core";

export default () => (
  <div style={classess.center}>
    <CircularProgress />
  </div>
);

const classess = {
  center: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    height: "100%",
  },
};
