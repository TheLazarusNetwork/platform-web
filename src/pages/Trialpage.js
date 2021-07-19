import React from "react";
import { connect } from "react-redux";
import { fetchUser } from "../redux/actions/userAction";


class Trialpage extends React.Component {

   componentDidMount(){
    console.log('inside component didMount')
    this.props.dispatch(fetchUser());
  }


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
        {console.log(userData)}
      </div>
    );

  }
}

const mapStateToProps = (state) => ({
  userData: state.user.currentUserData,
  loading: state.user.loading,
  error: state.user.error,
});

export default connect(mapStateToProps)(Trialpage);
