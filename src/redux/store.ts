import {createStore, combineReducers, applyMiddleware, compose, Action, Dispatch} from 'redux'
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {UserActions} from "./actions/user.actions";
import {UIActions} from "./actions/ui.actions";
import {UserReducer, UserState} from "./reducers/user.reducer";
import {UIReducer, UIState} from "./reducers/ui.reducer";

export type AllActions =
    | UserActions
    | UIActions

export interface RootState {
    user: UserState,
    ui: UIState
}

const rootReducer = combineReducers<RootState, AllActions>({
    user: UserReducer,
    ui: UIReducer
})

let preloadedState: RootState | undefined;
try { preloadedState = JSON.parse(window.location.search) as RootState} catch (e) { }

export const store = createStore(rootReducer, preloadedState, composeWithDevTools(applyMiddleware(thunk)));

export type AsyncAction<TAction extends Action> = ThunkAction<void, RootState, unknown, TAction>
export type AsyncDispatch<TAction extends Action> = ThunkDispatch<RootState, void, TAction>

export const useAsyncDispatch = <T extends Action>(): AsyncDispatch<T> => useDispatch<AsyncDispatch<T>>();
export const useSyncDispatch = <T extends Action>(): Dispatch<T> => useDispatch<Dispatch<T>>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const delay = (ms:number) => new Promise<void>(resolve => setTimeout(resolve, ms))
