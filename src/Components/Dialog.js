import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog({diopen , setDiopen, setPassword, setUpdate}) {

    const handleClose =()=>{
        setDiopen(false);
    }

  return (
    <div>
      <Dialog open={diopen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Change email</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your password to confirm changes
          </DialogContentText>
      <input onChange={(e)=>{setPassword(e.target.value)}} type="password" label= "password"></input>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=> setDiopen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>{setUpdate(true);setDiopen(false);}}color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
