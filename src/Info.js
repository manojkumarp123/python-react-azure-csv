import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 750,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Information</h2>
      <ol>
        {[
          "The data grid is a temporary snapshot of the cloud file.",
          "The changes made will be temporary.",
          "Click on Save (to cloud) to persist changes.",
          "Click on Refresh (download from cloud) to reset changes on data grid.",
          "Click the Trash-can icon to delete office from data grid (temporary).",
          // "Click on Add New Office to add empty row to data grid at the end (temporary).",
          "Double click on data grid cell to edit and press enter to finish making changes (temporary).",
        ].map((info, idx) => (
          <li key={idx}>
            <p>{info}</p>
          </li>
        ))}
      </ol>
    </div>
  );

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Help
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
}
