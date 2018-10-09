import React, { Component } from "react"
import Form from "react-jsonschema-form"
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux"
import Wrapper from '../../Wrappers/Wrapper'

const schema = {
  title: "Sign Up",
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

class SignUp extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      formData: {}
    }
  }

  async onSubmit(formData) {
    await this.props.signup(formData.formData)
    this.props.history.push('login')
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
      </Wrapper>
    )
  }

}

const mapState = state => ({
  authLoading: state.auth.authLoading,
  authError: state.auth.authError,
  auth: state.auth.auth,
})

const mapDispatch = dispatch => ({
  signup: (formData) => dispatch.auth.signup(formData)
})

export default withRouter(connect(mapState, mapDispatch)(SignUp))

