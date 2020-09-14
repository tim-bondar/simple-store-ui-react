import {User} from "../../models/user";

export const userAuthenticated = 'userAuthenticated'

export interface UserAuthenticated {
    type: typeof userAuthenticated
    user: User
}

export const userUnauthenticated = 'userUnauthenticated'

export interface UserUnauthenticated {
    type: typeof userUnauthenticated
}

export type UserActions =
    | UserAuthenticated
    | UserUnauthenticated
