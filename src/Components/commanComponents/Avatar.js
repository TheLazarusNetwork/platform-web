import { Avatar as MuiAvatar } from "@material-ui/core";
import { useEffect, useState } from "react";
import Auth from "../../api/Auth";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));
export default function Avatar({ userid, url, size, onUpload }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const classes = useStyles();

  const auth = new Auth();

  useEffect(() => {
    if (url) setAvatarUrl(url);
  }, [url]);


  async function uploadAvatar(event) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const filePath = `${userid}`;
      console.log(filePath);


      let { error: uploadError } = await auth.sdk.storage
        .from("avatars")
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });
        

      if (uploadError) {
        console.log(uploadError);
        throw uploadError;
      }


      const { publicURL } = auth.sdk.storage
        .from("avatars")
        .getPublicUrl(filePath);

      console.log(publicURL);
      onUpload(publicURL);
    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      {avatarUrl ? (
        <MuiAvatar src={avatarUrl} alt="Avatar" className={classes.large} />
      ) : (
        <div className="avatar no-image" style={{ height: size, width: size }}>
          <MuiAvatar className={classes.large} />
        </div>
      )}
      <div style={{ width: size }}>
        <label className="button primary block " htmlFor="single">
          {uploading ? "Uploading ..." : "Upload"}
        </label>

        <input
          style={
            {
              // visibility: 'hidden',
              // position: 'absolute',
            }
          }
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  );
}
