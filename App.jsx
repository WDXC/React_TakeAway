import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import ForgetPage from './Pages/ForgetPage';
import Main from './Pages/Main';

export default function App() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path={"/"} component={Main} />
                    <Route exact path={"/signin"} component={LoginPage} />
                    <Route exact path={"/signup"} component={SignupPage} />
                    <Route exact path={"/signin/forget"} component={ForgetPage} />
                </Switch>
            </Router>
        </div>
    )
}
