import React, { Component } from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom'
import { connect } from "react-redux"

class DashboardWrapper extends Component {
  
  signOut() {
    this.props.logout()
    this.props.history.push('/')
  }

  render() {
    return (
      <div className="wrapper">
        <ul>
            <li><Link to="/user-dashboard">Home</Link></li>
            <li><Link to="#" onClick={ this.signOut.bind(this) }>Logout</Link></li>
        </ul>
            
        <hr/>
        
        { this.props.children }
        
      </div>
    );
  }
}

const mapState = state => ({
  auth: state.auth.auth,
})

const mapDispatch = dispatch => ({
  logout: () => dispatch.auth.logout()
})

export default withRouter(connect(mapState, mapDispatch)(DashboardWrapper))

