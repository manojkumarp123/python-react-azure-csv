import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function CustomizedInputBase({ onSearch, count }) {
  const classes = useStyles();

  return (
    <Paper
      component="form"
      className={classes.root}
      onSubmit={(e) => {
        e.preventDefault();
        const searchVal = e.target.search.value;
        onSearch(searchVal.toLowerCase());
        console.log({ searchVal });
      }}
    >
      <InputBase
        name="search"
        className={classes.input}
        placeholder="Search Office Access"
        inputProps={{ "aria-label": "search office access" }}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>

      <>
        <Divider className={classes.divider} orientation="vertical" />
        <h6>{count} offices found</h6>
      </>
    </Paper>
  );
}
