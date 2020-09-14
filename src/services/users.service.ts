import {AuthenticationRequest, AuthenticationResponse} from "../models/authentication";
import axios from "axios";
import {API_URL} from "../envrironment";
import {User} from "../models/user";
import {AllActions, AsyncAction} from "../redux/store";
import {userAuthenticated, userUnauthenticated} from "../redux/actions/user.actions";
import {clearErrors, setErrors} from "../redux/actions/ui.actions";

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

export const login = (userCreds: AuthenticationRequest, history: any) : AsyncAction<AllActions>  =>
    async (dispatch) => {
        dispatch({type: clearErrors})
        axios.post<AuthenticationResponse>(API_URL+'users/authenticate', userCreds)
            .then((res) => {
                const token = `Bearer ${res.data.token}`;
                const userData = res.data as User;
                localStorage.setItem('user', JSON.stringify(userData));
                localStorage.setItem('token', `Bearer ${res.data.token}`);
                axios.defaults.headers.common['Authorization'] = token;
                dispatch({type: userAuthenticated, user: userData});

                history.push('/');//redirecting to index page after login success
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: setErrors,
                    errors: err.response?.data
                });
            });
    };

export const logout = () : AsyncAction<AllActions> =>
    (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization']
    dispatch({type: userUnauthenticated});
    window.location.href = '/login'; //redirect to login page
};
