import React from "react";
import { useEffect } from "react";
const Success = ({ history }) => {
  useEffect(() => {
      history.push("/dash")
  }, []);
  return <div className='center'> Success </div>;
};
export default Success;

// import React from "react";
// import { connect } from "react-redux";
// import { Redirect } from "react-router-dom";
// import { fetchUser } from "../../redux/actions/userAction";

// class Success extends React.Component {
//   componentDidMount() {
//     console.log("inside component didMount");
//     this.props.dispatch(fetchUser());
//   }

//   render() {
//     const { error, loading, userData } = this.props;

//     if (error) {
//       return <div>Error! {error.message}</div>;
//     }
//     if (loading) {
//       return <div>Loading...</div>;
//     }
//     return <Redirect to="/dash" />;
//   }
// }

// const mapStateToProps = (state) => ({
//   userData: state.user.currentUserData,
//   loading: state.user.loading,
//   error: state.user.error,
// });

// export default connect(mapStateToProps)(Success);
