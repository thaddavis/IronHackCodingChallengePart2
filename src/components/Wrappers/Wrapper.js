import React, { Component } from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom'

class Wrapper extends Component {

  render() {
    return (
      <div className="wrapper">
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/sign-up">Sign Up</Link></li>
        </ul>
            
        <hr/>
        
        {this.props.children}
      </div>
    );
  }
}

export default withRouter(Wrapper)
