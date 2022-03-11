import React from 'react'
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
const PrivateRoute = ({component: Component, auth:{isAuthenticated, loading}, ...rest}) => {
    // <Route 
    //         {...rest} 
    //         render={props => 
    //             !isAuthenticated &&  !loading ? (
    //             <Navigate to='/login' />
    //             ) : (
    //             <Component {...props}/>
    //             )
    //         }/>

    if(isAuthenticated){
         return <Component />;
    }

    return <Navigate to="/login" />;

};
PrivateRoute.prototype = {
    auth: PropTypes.object.isRequired
}
const mapStateToProps = state =>({
    auth: state.auth
})

export default connect(mapStateToProps) (PrivateRoute)