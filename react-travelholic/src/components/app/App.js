import React from 'react';
import './App.css';
import NavBar from 'components/Navbars/NavBar'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LoginPage from 'components/LoginPage/LoginPage'
import Registration from 'components/Registration/Registration';
import Home from 'components/Home/Home';
import Profile from 'components/Profile/Profile';

function App() {
    return (
        <BrowserRouter>
            <NavBar></NavBar>
            <Switch>
                <Route path="/registration" component={Registration} />
                <Route path="/profile/:username" component={Profile} />
                <Route path="/home" component={Home} />
                <Route path="/" component={LoginPage} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
