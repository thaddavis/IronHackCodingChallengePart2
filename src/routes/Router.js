import React from 'react'
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'

import Home from '../components/Home/Home'
import Login from '../components/Auth/Login/Login'
import Signup from '../components/Auth/Signup/Signup'
import Dashboard from '../components/Account/Dashboard/Dashboard'
import NoMatch from '../components/NoMatch/NoMatch'
import PrivateRoute from '../hoc/PrivateRoute'

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/sign-up" component={Signup}/>
            <PrivateRoute path='/user-dashboard' component={Dashboard} />
            <Route component={NoMatch} />
        </Switch>
    </BrowserRouter>
)

export default Router;