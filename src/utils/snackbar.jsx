import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import { MdCancel } from "react-icons/md";

export default function SnackbarAlert({ message, alertopen, setAlertopen, type }){
  return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={alertopen}
        autoHideDuration={3000}
        onClose={() => setAlertopen(false)}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setAlertopen(false)}
            >
              <MdCancel fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      >
        <Alert severity={type}>{message}</Alert>
      </Snackbar>
    </React.Fragment>
  );
};
