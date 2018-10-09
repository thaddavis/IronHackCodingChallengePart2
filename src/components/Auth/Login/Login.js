import React, { Component } from "react"
import Form from "react-jsonschema-form"
import { Redirect, withRouter } from "react-router-dom"
import { connect } from "react-redux"

import Wrapper from '../../Wrappers/Wrapper'

const schema = {
  title: "Login",
  type: "object",
  required: ["username", "password"],
  properties: {
    username: {
      type: "string",
      title: "Username"
    },
    password: {
      type: "string",
      title: "Password",
      minLength: 7
    }
  }
}

const uiSchema = {
  username: {
    "ui:autofocus": true,
    "ui:placeholder": "Username"
  },
  password: {
    "ui:widget": "password",
    "ui:placeholder": "Password"
  }
}

class Login extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      formData: {}
    }

    this.props.loggedin()
  }

  onSubmit(formData) {
      this.props.login(formData.formData)
  }

  render() {
    return (
      <Wrapper>
        <div className="container">
          <div className="row justify-content-center text-center">
            <Form
              formData={this.state.formData}
              noHtml5Validate={true}
              schema={schema}
              uiSchema={uiSchema}
              onSubmit={this.onSubmit.bind(this)}
              />
          </div>
          <div className="row justify-content-center text-center">
            { this.props.authLoading ? 'Loading...' : '' }
          </div>
          <div className="row justify-content-center text-center">
             { this.props.authError ? this.props.authError : '' }
          </div> 
        </div>
        {
          this.props.auth ? 
          <Redirect to="/user-dashboard"></Redirect>
          :
          ''
        }
      </Wrapper>
    )
  }
}

const mapState = state => ({
  authLoading: state.auth.authLoading,
  auth: state.auth.auth,
  authError: state.auth.authError,
})

const mapDispatch = dispatch => ({
  login: (user) => dispatch.auth.login(user),
  loggedin: () => dispatch.auth.loggedin(),
})

export default withRouter(connect(mapState, mapDispatch)(Login))

