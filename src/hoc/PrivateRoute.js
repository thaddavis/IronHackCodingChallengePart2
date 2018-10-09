import React, { Component } from 'react'
import {
  withRouter,
  Route,
  Redirect
} from 'react-router-dom'
import { connect } from "react-redux"

import axios from 'axios'

class PrivateRoute extends Component {

  state = {
    loaded: false,
    isAuthenticated: false
  }

  componentDidMount() {
    this.authenticate()
    this.unlisten = this.props.history.listen(() => {
      axios.get(`http://localhost:4000/api/loggedin`, { withCredentials: true })
        .then(user => {})
        .catch(() => {
          if (this.state.isAuthenticated) this.setState({ isAuthenticated: false })
        })
    });
  }

  componentWillUnmount() {
    this.unlisten()
  }

  authenticate() {
    axios.get(`http://localhost:4000/api/loggedin`, { withCredentials: true })
      .then(() => {
        this.setState({ loaded: true, isAuthenticated: true })
      })
      .catch(() => this.props.history.push('/login'))
  }


  render() {
    const { component: Component, ...rest } = this.props
    const { loaded , isAuthenticated} = this.state
    if (!loaded) return null
    return (
      <Route
        {...rest}
        render={props => {
          return isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          )
        }}
      />
    )
  }
}

const mapState = state => ({
  auth: state.auth.auth,
})

const mapDispatch = dispatch => ({
  setAuthLoading: (bool) => dispatch.auth.setAuthLoading(bool),
  loggedin: () => dispatch.auth.loggedin(),
})

export default withRouter(connect(mapState, mapDispatch)(PrivateRoute))