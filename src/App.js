import React, {useEffect} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-form/CreateProfile';
import AddExperience from './components/profile-form/AddExperience';
import PrivateRoute from './components/routing/PrivateRoute';
import AddEducation from './components/profile-form/AddEducation'
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/Post/Post';
// import Post from './components/Post/Post';
//Redux
import {Provider} from 'react-redux';
import store from './Store';
import { loadUser } from './actions/Auth';
import setAuthToken from './utils/SetAuthToken';

import './App.css';



const App = ()  => {
  useEffect(()=>{
    if(localStorage.token){
      setAuthToken(localStorage.token);
    }

    store.dispatch(loadUser());

  }, [])
  return (
    <Provider store={store}>
        <Router>
           
              <Navbar />
              <section className='container'>
                <Alert />
              <Routes>
                <Route exact path='/' element={<Landing />} />
                <Route exact path='/register' element={<Register />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/profiles' element={<Profiles />} />
                <Route exact path='/profile/:id' element={<Profile/>} />

                <Route exact path='/dashboard' element={<PrivateRoute component={Dashboard} />} />
                <Route exact path='/create-profile' element={<PrivateRoute component={CreateProfile} />} />
                <Route exact path='/edit-profile' element={<PrivateRoute component={CreateProfile} />} />
                <Route exact path='/add-experience' element={<PrivateRoute component={AddExperience} />} />
                <Route exact path='/add-education' element={<PrivateRoute component={AddEducation} />} />
                <Route exact path='/posts' element={<PrivateRoute component={Posts} />} />
                {/* <Route exact path="/posts/:id" element={<PrivateRoute component={Post} />} /> */}

              </Routes>
              </section>
            
        </Router>
    </Provider>
  );
}

export default App;
