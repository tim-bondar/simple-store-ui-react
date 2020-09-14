import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch} from "react-router-dom"
import GuestRoute from "./utils/GuestRoute"
import PrivateRoute from "./utils/PrivateRoute"
import {Provider} from 'react-redux';
import {CheckAuthentication} from './utils/CheckAuthentication'
import {store} from "./redux/store";
import {Login} from "./components/Login";
import {Home} from "./components/Home";

const App: React.FC = () => {
    useEffect(() => {
        CheckAuthentication();
    }, []);
    return (
        <div className="App" >
            <Provider store={store}>
                <Router>
                    <Switch>
                        <PrivateRoute
                            exact
                            path="/"
                            component={Home}/>
                        <GuestRoute
                            exact
                            path="/login"
                            component={Login}/>
                    </Switch>
                </Router>
            </Provider>
        </div>
    )
}
export default App;
