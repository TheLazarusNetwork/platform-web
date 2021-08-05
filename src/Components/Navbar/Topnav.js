import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { MdSwapHoriz } from "react-icons/md";
import { BsMoon, BsSun } from "react-icons/bs";
import OrgsModal from "../organisationsPage/OrgsModal";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import { SET_DARK_THEME, SET_LIGHT_THEME } from "../../redux/CONSTANTS";
import { Link } from "react-router-dom";
import Auth from "../../api/Auth";

export default function Topnav({ page }) {

  const [show, setShow] = useState(false);
  const [avatar, setAvatar] = useState();
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const auth = new Auth()

  useEffect( async()=>{
    let {data} = await auth.sdk.from("profiles").select("avatar_url")
    if(data[0].avatar_url)
    downloadImage(data[0].avatar_url)
  })

  async function downloadImage(path) {
    try {
      const { data, error } = await auth.sdk.storage.from('avatars').download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setAvatar(url)
    } catch (error) {
      console.log('Error downloading image: ', error.message)
    }
  }

  const changetheme = () => {
    if (theme === "light")
      dispatch({
        type: SET_DARK_THEME,
      });
    if (theme === "dark")
      dispatch({
        type: SET_LIGHT_THEME,
      });
  };

  return (
    <>
      <nav className="top-nav">
        <h4 className="title">{page}</h4>
        <div className="icons">
          <Button
            variant="contained"
            color="primary"
            startIcon={<MdSwapHoriz />}
            onClick={() => setShow(!show)}
          >
            Org
          </Button>
          <icon onClick={() => changetheme()}>
            {theme === "light" && <BsSun color="gold" size={20} />}
            {theme === "dark" && <BsMoon color="silver" size={20} />}
          </icon>
          <icon>
            <IoIosNotifications size={20} />
          </icon>
          <div className="vertical-divider"></div>
         
          <icon>
          <Link to="/dash/profile">
            <Avatar src={avatar}/>
            </Link>
          </icon>
          
        </div>
      </nav>
      <OrgsModal show={show} onClose={() => setShow(false)} />
    </>
  );
}
