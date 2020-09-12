import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import userReducer from './reducers/user.reducer'
import uiReducer from './reducers/ui.reducer'

const initialState = {};
const middleware = [thunk];

//todo: rework on package
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
    }
}
const reducer = combineReducers({
    user: userReducer,
    UI: uiReducer
});
const store = createStore(reducer, initialState, compose(applyMiddleware(...middleware), (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) as any));
export default store;
