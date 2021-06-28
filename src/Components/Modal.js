// import React, {useState} from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Modal from "@material-ui/core/Modal";

// function getModalStyle() {
//   const top = 50;
//   const left = 50;

//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`,
//   };
// }

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     position: "absolute",
//     backgroundColor: theme.palette.background.paper,
//     border: "1.5px solid #000",
//     boxShadow: theme.shadows[5],
//   },
// }));

// export default function Modalui( {show,children}) {
//   const [open, setOpen] = useState(show);
//   const [modalStyle] = useState(getModalStyle);

//   return (
    // <div>
    //   <Modal open={open} onClose={() => setOpen(false)}>
    //     <div style={modalStyle} className={classes.paper + " modal"}>
    //       <button>heelo</button>
    //     </div>
    //   </Modal>
    // </div>
//   );
// }
