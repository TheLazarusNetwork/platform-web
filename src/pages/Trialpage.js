import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../redux/actions/userAction';

class UserProfile extends React.Component{

    componentDidMount(){
        this.props.dispatch(fetchUser());
    }

    render(){
        const{error, loading, userData} = this.props;

        if(error){
            return<div>Error! {error.message}</div>
        }
        if (loading) {
            return <div>Loading...</div>;
          }
        
        return (
            <div>
                userdata
                {userData}
            </div>
        )
      
    }
}

const mapStateToProps= state=>({
    userData: state.user.currentUserData,
    loading: state.user.loading,
    error: state.user.error
})

export default connect(mapStateToProps)(UserProfile)