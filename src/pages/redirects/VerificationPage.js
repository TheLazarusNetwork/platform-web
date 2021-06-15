import React, { useState } from "react";

export default function VerificationPage(props) {
  const [auth, setAuth] = useState(props.auth);

  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("userId");
  const secret = urlParams.get("secret");
  auth.updateVerification(userId, secret);             // user email verification 

  return <div>verification page</div>;
}
