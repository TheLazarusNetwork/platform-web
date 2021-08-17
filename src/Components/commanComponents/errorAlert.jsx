import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import { MdCancel } from "react-icons/md";

export default function ErrorAlert({ message, alertopen }){
    const [open, setOpen] = React.useState(alertopen);
  return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        autoHideDuration={3000}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setOpen(false)}
            >
              <MdCancel fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      >
        <Alert onClose={()=>setOpen(false)} severity={"error"}>{message}</Alert>
      </Snackbar>
    </React.Fragment>
  );
};
