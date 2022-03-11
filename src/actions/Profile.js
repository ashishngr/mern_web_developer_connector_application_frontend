import axios from 'axios';
import { setAlert } from './Alert';

import {
    ACCOUNT_DELETED,
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    GET_PROFILES,
    CLEAR_PROFILE,
    GET_REPOS
} from './Types';


// Get current profile
export const getCurrentProfile = () => async dispatch =>{
    try {
        const res = await axios.get('/api/profile/me');
        console.log(res);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (error) {
        dispatch({type : CLEAR_PROFILE})
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}
// Get All Profiles
export const getProfiles = () => async dispatch =>{
    dispatch({type: CLEAR_PROFILE});
    try {
        const res = await axios.get('/api/profile');
        console.log(res);
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}
// Get profile by id
export const getProfileById = (userId) => async dispatch =>{
    try {
        const res = await axios.get(`/api/profile/user/${userId}`);
        console.log(res);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}

// Get GitHub Repos
export const getGithubRepos = username => async dispatch =>{
    try {
        const res = await axios.get(`/api/profile/github/${username}`);
        console.log(res);
        dispatch({
            type: GET_REPOS,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}
//create or update profile
export const createProfile = (FormData, navigate, edit = false) => async dispatch =>{
    try {
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }            
        }
        const res = await axios.post('/api/profile', FormData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });

        dispatch(setAlert (edit ? 'Profile Updated' : 'Profile Created', 'Success'));

        if(!edit){
            navigate('/dashboard')
        }
    } catch (error) {
        const errors = error.response.data.errors

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}

// Add experience
export const addExperience = (formData, navigate) => async dispatch =>{
    try {
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }            
        }
        const res = await axios.put('/api/profile/experience', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data,
        });

        dispatch(setAlert ('Experience Added', 'success'));
            navigate('/dashboard')
      
    } catch (error) {
        const errors = error.response.data.errors

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}

export const addEducation = (formData, navigate)=> async dispatch =>{
    try {
                const config = {
                    headers: {
                        'Content-Type' : 'application/json'
                    }            
                }
                const res = await axios.put('/api/profile/education', formData, config);
        
                dispatch({
                    type: UPDATE_PROFILE,
                    payload: res.data,
                });
        
                dispatch(setAlert ('Education Added', 'success'));
                    navigate('/dashboard')
              
    } catch (error) {
                const errors = error.response.data.errors
        
                if(errors){
                    errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
                }
                dispatch({
                    type: PROFILE_ERROR,
                    payload: {msg: error.response.statusText, status: error.response.status}
                })
    }
}

// Delete experience
export const deleteExperience = id =>  async dispatch =>{
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert ('Experience Deleted', 'success'));
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}

// Delete education
export const deleteEducation = id =>  async dispatch =>{
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert ('Education Deleted', 'success'));
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}

//Delete account and profile
export const deleteAccount = () =>  async dispatch =>{
    if(window.confirm('Are You sure ? This can  not be undone!')){
        try {
            await axios.delete('/api/profile');

            dispatch({type: UPDATE_PROFILE});
            dispatch({type: ACCOUNT_DELETED});

            dispatch(setAlert ('Your account has been permanently deleted'));
        } catch (error) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: error.response.statusText, status: error.response.status}
            })
        }


    }

}
