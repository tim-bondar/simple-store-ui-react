import {Reducer} from "redux";
import {User} from "../../models/user";
import {userAuthenticated, userUnauthenticated} from "../actions/user.actions";
import {AllActions} from "../store";

export interface UserState {
    user: User | null,
    authenticated: boolean
}

const initialState: UserState = {
    user: null,
    authenticated: false
}

export const UserReducer: Reducer<UserState, AllActions> =
    (state = initialState, action) => {
        switch (action.type) {
            case userAuthenticated :
                return {user : action.user, authenticated: true}

            case userUnauthenticated :
                return {user : null, authenticated: false}

            default:
                return state;
        }
    }
