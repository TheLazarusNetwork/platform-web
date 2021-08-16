import React, { useEffect, useState } from "react";
import Topnav from "../Components/navbar/Topnav";
// import { Avatar } from "@material-ui/core";
import Avatar from "../Components/commanComponents/Avatar";
import SnackbarAlert from "../Components/commanComponents/snackbar";
import { useSelector } from "react-redux";

document.title = "Profile | Lazarus Network";

export default function Profile({ auth }) {
  const [username, setUsername] = useState("");
  const [useremail, setUseremail] = useState("");
  const [userdata, setuserdata] = useState({});
  const [loading, setLoading] = useState(false);

  const [alertopen, setAlertopen] = useState(false);
  const [alertmsg, setAlertmsg] = useState(" ");
  const [alerttype, setAlertype] = useState("error");

  const [avatar_url, setAvatarUrl] = useState();

const {userData} = useSelector((state) =>({
  userData : state.user.currentUserData,
}))


  async function getProfile() {
    try {
      setLoading(true);
      const user = auth.getAccount();
      setUseremail(user.email)

      let { data , error } = await auth.sdk.from("profiles")
                                            .select("username , avatar_url")
                                            .filter('id', 'eq', user.id)

      console.log(data[0].username ,data[0].avatar_url, error);

      if (error) {
        throw error;
      }

      setUsername(data[0].username);
      setAvatarUrl(data[0].avatar_url);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }
  async function updateProfile({ username, avatar_url }) {
    try {
      setLoading(true);
      const user = auth.getAccount();

      const updates = {
        id: user.id,
        username,
        avatar_url,
        updated_at: new Date(),
      };

      let { error } = await auth.sdk.from("profiles").upsert(updates, {
        returning: "minimal", // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProfile()
  }, [userData]);


  const handlesubmit = async (event) => {
    event.preventDefault();

    if (userdata.name == username) {
      setAlertmsg("name is same as before");
      setAlertopen(true);
    } else {
      const { user, error } = await auth.updateUserName(username);
      if (user) {
        setAlertmsg("Name Successfully changed");
        setAlertype("success");
        setAlertopen(true);
      } else {
        setAlertmsg("Name change failed");
        setAlertype("error");
        setAlertopen(true);
      }
    }
  };

  return (
    <>
      <SnackbarAlert
        message={alertmsg}
        alertopen={alertopen}
        setAlertopen={setAlertopen}
        type={alerttype} // type = error, success, info ,warning
      />
      <div className="main">
        <Topnav page="Profile" />
        <div className="profile-pic">
          <div className="pic-avatar">
            {/* <Avatar className={classes.large} src={avatar}></Avatar> */}
            <Avatar
              url={avatar_url}
              size={100}
              onUpload={(url) => {
                setAvatarUrl(url);
                updateProfile({ username, avatar_url: url });
              }}
            />
            <div className=" pic-description">
              <h4>{username}</h4>
              <p> {useremail}</p>
            </div>
          </div>
          {/* <input type="file" onChange={filechange}></input> */}
        </div>

        <div className="divider" />

        <div className="details-box shadow ">
          <div className="box-title">Personal details</div>
          <div className="inner-details">
            <form onSubmit={(e) =>{
              e.preventDefault();
              updateProfile({ username, avatar_url })
              }}>
              <div className="row">
                <input
                  className="textfield"
                  value={username || ""}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                <input
                  className="textfield"
                  label="email"
                  value={useremail}
                  disabled
                />
              </div>
              <button type="submit" className="save-btn">
                update
              </button>
            </form>
          </div>
        </div>

        <div className="details-box shadow">
          <div className="box-title">Other Details</div>
          <div className="inner-details">
            <div className="row">
              <input
                className="textfield"
                id="outlined-helperText"
                placeholder="address line"
                variant="outlined"
              />
              <input
                className="textfield"
                id="outlined-helperText"
                placeholder="landmark"
                variant="outlined"
              />
            </div>
            <div className="row">
              <input
                className="textfield"
                id="outlined-helperText"
                placeholder="city"
                variant="outlined"
              />
              <input
                className="textfield"
                id="outlined-helperText"
                placeholder="country"
                variant="outlined"
              />
            </div>
            <button className="save-btn">Save changes</button>
          </div>
        </div>
      </div>
    </>
  );
}
