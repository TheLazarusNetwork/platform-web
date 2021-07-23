import React, { useState } from "react";
import Topnav from "../Components/Navbar/Topnav";
import "./../styles/Organisation/organisation.css";
import { BiRightTopArrowCircle } from "react-icons/bi";
import { GoKebabVertical } from "react-icons/go";
import Dialogform from '../Components/OrgForm'


export default function Organisations() {
  const [openform, setOpenform] = useState(false);


  return (
    <>
      {/* <SnackbarAlert
        message={alertmsg}
        alertopen={alertopen}
        setAlertopen={setAlertopen}
        type={alerttype} // type = error, success, info ,warning
      /> */}
      <div className="main">
        <Topnav page="Profile" />
        <div>
          <div className="top-div">
            <div className="main-title">All Organisations</div>
            <div>
              <button
                className="grey-btn"
                onClick={() => {
                  setOpenform(!openform);
                }}
              >
                Create new Organisation
              </button>
            </div>
          </div>
          <div className="divider"></div>
          <div className="table">
            <div className="org-box">
              <div className="name">Organisation name</div>
              <div className="role">Admin</div>
              <div>
                <icon className="btn">
                  <BiRightTopArrowCircle />
                </icon>
                <icon className="btn">
                  <GoKebabVertical />
                </icon>
              </div>
            </div>
            <div className="org-box">
              <div className="name">Organisation name</div>
              <div className="role">Member</div>
              <div>
                <icon className="btn">
                  <BiRightTopArrowCircle />
                </icon>
                <icon className="btn">
                  <GoKebabVertical />
                </icon>
              </div>
            </div>
            <div className="org-box">
              <div className="name">Organisation name</div>
              <div className="role">Admin</div>
              <div>
                <icon className="btn">
                  <BiRightTopArrowCircle />
                </icon>
                <icon className="btn">
                  <GoKebabVertical />
                </icon>
              </div>
            </div>
          </div>
        </div>
        {openform && (
          <Dialogform
            open={openform}
            setOpen={setOpenform}
          />
        )}
      </div>
    </>
  );
}

// function Dialogform({ open, setOpen }) {
//   const [step, setStep] = useState(1);
//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   if (step == 1) {
//     return (
//       <div>
//         <Dialog
//           open={open}
//           onClose={handleClose}
//           aria-labelledby="form-dialog-title"
//         >
//           <DialogTitle id="form-dialog-title">
//             Create New Organisation
//           </DialogTitle>
//           <DialogContent>
//             {/* <DialogContentText>
//               To subscribe to this website, please enter your email address here. We will send updates
//               occasionally.
//             </DialogContentText> */}
//             <div className="divider"></div>
//             <input placeholder="Organisation name"></input>
//             <input placeholder="address"></input>
//             <input placeholder="city"></input>
//             <input placeholder="country"></input>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleClose} color="primary">
//               Cancel
//             </Button>
//             <Button onClick={() => setStep(step + 1)} color="primary">
//               Next
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </div>
//     );
//   }

//   if (step == 2) {
//     return (
//       <div>
//         <Dialog
//           open={open}
//           onClose={handleClose}
//           aria-labelledby="form-dialog-title"
//         >
//           <DialogTitle id="form-dialog-title">
//             Add new Members
//           </DialogTitle>
//           <DialogContent>
           
//             <div className="divider"></div>
//             <input type='email' placeholder='email to invite'></input>
//             <input placeholder='role'></input>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={()=>{setStep(step-1)}} color="primary">
//               prev
//             </Button>
//             <Button onClick={handleClose} color="primary">
//               Submit
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </div>
//     );
//   }
// }
