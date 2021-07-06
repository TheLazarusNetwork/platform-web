import React, { useEffect, useState } from "react";
import SHA1 from "../functions/SHA1";

export default function Passwordbreach(props) {
  var { password } = props;
  const [pass, setpass] = useState(password);
  var requestTimeout;

  useEffect(() => {
    const id = setTimeout(() => {
      passwordKeyPress()
    }, 2000);
    return () => clearTimeout(id);
  }, [password]);

  const passwordKeyPress = () => {
    document.getElementById("iscompromised").innerHTML =
      "<span >&nbsp;We are checking if your password has ever been compromised...</span>";

    clearTimeout(requestTimeout);
    requestTimeout = setTimeout(passwordmodified, 1000);
  };
  var passwordInput = password;
  var passwordplain = "";
  var xhttp;

  function passwordmodified() {
    console.log("mp");
    var modifiedpassword = passwordInput;
    if (modifiedpassword !== passwordplain) {
      passwordplain = modifiedpassword;

      if (passwordplain !== "") {
        var sha1pass = SHA1(passwordplain);
        sha1pass = sha1pass.toUpperCase();
        var subsha1pass = sha1pass.substring(5);
        if (xhttp) {
          xhttp.abort();
        }
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            var xhttpresponse = this.responseText;
            if (xhttpresponse.indexOf(subsha1pass) !== -1) {
              var passlist = xhttpresponse.split("\n");
              var pwnedcount = 0;
              var timespell = "times";
              for (var i = 0; i < passlist.length; i++) {
                if (subsha1pass == passlist[i].split(":")[0]) {
                  pwnedcount = passlist[i].split(":")[1];
                  if (passlist[i].split(":")[1] == 1) {
                    timespell = "time";
                  }
                }
              }

              document.getElementById("iscompromised").innerHTML =
                '<span style="color: #ff0000;">Oh no! This password was found <b>' +
                pwnedcount +
                "</b> " +
                timespell +
                " in compromised passwords databases! </span>";
            } else {
              document.getElementById("iscompromised").innerHTML =
                '<span style="color: #339966;">Good news, this password has never been breached!</span>';
            }
          }
        };

        xhttp.open(
          "GET",
          "https://api.pwnedpasswords.com/range/" + sha1pass.substring(0, 5)
        );
        xhttp.send();
        console.log("req");
      }
    }
  }

  return (
    <div>
      <ul className="hsimp-checks">
        <p id="iscompromised">
          <span>
            This password was not compromised in any database breach!!
          </span>
        </p>
      </ul>
      <ul id="password-checks" className="hsimp-checks"></ul>
    </div>
  );
}
