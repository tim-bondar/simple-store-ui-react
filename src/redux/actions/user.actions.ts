import {SET_USER, SET_ERRORS, LOADING_UI, CLEAR_ERRORS, SET_UNAUTHENTICATED, LOADING_USER} from '../types'
import axios from 'axios';
import {AuthenticationRequest, AuthenticationResponse} from "../../models/authentication";
import {User} from "../../models/user";
import {API_URL} from "../../envrironment";

/*
Server expects:

{
 "username":"user",
 "password":"user"
}

Client expects:

{
 "token":"ASDFGHJRTYUVBNM...",
 "firstName":"John",
 "lastName":"Doe",
 "userName":"user",
 "isAdmin":false
}
*/

export const loginUser = (userCreds: AuthenticationRequest, history: any) => (dispatch: any) => {
    dispatch({type: LOADING_UI})
    axios.post<AuthenticationResponse>(API_URL+'users/authenticate', userCreds)
        .then((res) => {
            const token = `Bearer ${res.data.token}`;
            localStorage.setItem('user', JSON.stringify(res.data as User));
            localStorage.setItem('token', `Bearer ${res.data.token}`);//setting token to local storage
            axios.defaults.headers.common['Authorization'] = token;//setting authorize token to header in axios
            dispatch(getUserData());
            dispatch({type: CLEAR_ERRORS});

            history.push('/');//redirecting to index page after login success
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: SET_ERRORS,
                payload: err.response?.data
            });
        });
}

//for fetching authenticated user information
export const getUserData = () => (dispatch: any) => {
    dispatch({type: LOADING_USER});

    // Get user data from local storage or request current user properties
    const userData = localStorage.getItem('user');

    if (userData) {
        const user = JSON.parse(userData) as User;
        dispatch({
            type: SET_USER,
            user: user
        });
    } else {
        axios.get<User>(API_URL+'/users/current')
            .then(res => {
                dispatch({
                    type: SET_USER,
                    user: res.data
                });
            })
            .catch(err => {
                console.log(err);
            });
    }
}

export const logoutUser = () => (dispatch: any) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization']
    dispatch({
        type: SET_UNAUTHENTICATED
    });
    window.location.href = '/login'; //redirect to login page
};
