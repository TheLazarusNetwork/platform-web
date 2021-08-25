import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import get_browser_info from "./../../functions/DeviceInfo";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
    backgroundColor: theme.palette.background.paper,
  },
}));

export function createActivity(ActivityName) {
  let browser = get_browser_info();
  const tableData = localStorage.getItem("activity");
  const rows = JSON.parse(tableData) ? [...JSON.parse(tableData)] : [];

  let current = new Date();
  let cDate =
    current.getFullYear() +
    "-" +
    (current.getMonth() + 1) +
    "-" +
    current.getDate();
  let cTime =
    current.getHours() +
    ":" +
    current.getMinutes() +
    ":" +
    current.getSeconds();
  let dateTime = cDate + " " + cTime;

  let ipinfo = JSON.parse( localStorage.getItem('ipinfo'))
  let ipdata = ipinfo !== null ? ipinfo : { ip: " ",region:" ",}

console.log('activity page ' ,ipinfo)
  const newRow = {
    activity: ActivityName,
    time: dateTime,
    device: browser.name + " " + browser.version + " ," + browser.os,
    ip: ipdata.ip,
    region : ipdata.region,
  };

  //keeping the table length 10
  if(rows.length >10 )
  rows.pop();

  rows.unshift(newRow);
  localStorage.setItem("activity", JSON.stringify(rows));
}

let rowData = JSON.parse(localStorage.getItem("activity"));

export default function ActivityTable() {
  const [rows, setRows] = useState(rowData);
  const classes = useStyles();

  useEffect(() => {
    //update activity from localstorage
    rowData = JSON.parse(localStorage.getItem("activity"));
    if (rowData !== null || rowData !== "undefined") {
      setRows(rowData);
    }
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Action</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Device</TableCell>
            <TableCell align='right'>Ip Address</TableCell>
            <TableCell align='right'>Region</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows ? (
            rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {row.activity}
                </TableCell>
                <TableCell align="right">{row.time}</TableCell>
                <TableCell align="right">{row.device}</TableCell>
                <TableCell align="right">{row.ip}</TableCell>
                <TableCell align= 'right'>{row.region}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <h5 className="center details-box "> No recent activity</h5>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
