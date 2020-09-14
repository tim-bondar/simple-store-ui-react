import jwtDecode from 'jwt-decode';
import {userAuthenticated, userUnauthenticated} from '../redux/actions/user.actions'
import axios from 'axios';
import {store} from "../redux/store";
import {User} from "../models/user";

export const CheckAuthentication = () => {
    const authToken = localStorage.token;
    if (authToken) {
        const decodedToken: any = jwtDecode(authToken);
        if (decodedToken.exp * 1000 < Date.now()) {
            store.dispatch({type: userUnauthenticated});
        } else {
            const user = JSON.parse(localStorage.user) as User;
            store.dispatch({type: userAuthenticated, user: user});
            axios.defaults.headers.common['Authorization'] = authToken;
        }
    }
}
