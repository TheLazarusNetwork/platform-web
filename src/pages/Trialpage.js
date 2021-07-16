import React from "react";
import { connect } from "react-redux";
import { fetchUser } from "../redux/actions/userAction";
import axios from "axios";

const auth_token = JSON.parse(localStorage.getItem("supabase.auth.token"))
  .currentSession.access_token;

function Getuser() {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjI2OTU0Nzc4LCJzdWIiOiJmZjcwYjdmNS1iMzNhLTQ5NzYtYmNkMi1mM2U4YmVhNDVjYjciLCJlbWFpbCI6InNocnV0aWJhbnNhbDE4MDJAZ21haWwuY29tIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwifSwidXNlcl9tZXRhZGF0YSI6eyJmdWxsX25hbWUiOiJzaHJ1dGkgYmFuc2FsIn0sInJvbGUiOiJhdXRoZW50aWNhdGVkIn0.AgF9ef1Tn_ANUHf5p979ZHvlciLD4SUsSVLsfhPrczU");
    myHeaders.append('Access-Control-Allow-Origin',"*")
    myHeaders.append('Access-Control-Allow-Request-Method',"GET")
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    
    fetch("https://platform.lazarus.network/api/v1.0/users", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    
}

Getuser();

class UserProfile extends React.Component {

  render() {
    const { error, loading, userData } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }
    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        userdata
        {userData}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.user.currentUserData,
  loading: state.user.loading,
  error: state.user.error,
});

export default connect(mapStateToProps)(UserProfile);
