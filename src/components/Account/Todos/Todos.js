import React, { Component } from 'react'
import Form from "react-jsonschema-form"
import { connect } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import './Todos.scss'

const schema = {
    title: "Create Todo",
    type: "object",
    required: ["title"],
    properties: {
      title: {
        type: "string",
        title: "Title"
      },
      description: {
        type: "string",
        title: "Description"
      },
      doneyet: {
        type: "boolean",
        title: " Done Yet?",
        default: false
      }
    }
  }
  
  const uiSchema = {
    title: {
      "ui:autofocus": true,
      "ui:placeholder": "Title"
    },
    description: {
      "ui:widget": "textarea",
      "ui:placeholder": "Description"
    },
    doneyet: {
    
    }
  }

class Todos extends Component {

    constructor(props) {
        super(props)

        this.state = {
            createTodo: false,
            formData: {}
        }

        this.props.getTodos()
    }

    async onSubmit(formData) {
        await this.props.createTodo(formData.formData)

        if (!this.props.todoError) {
            this.setState(prevState => ({
                formData: {},
                createTodo: false
            }))
        }
    }

    async deleteTodo(id) {
        this.props.deleteTodo(id)
    }

    async toggleTodo(id) {
        let todo = this.props.todos.find((i, index) => { return i._id === id })
        todo = Object.assign(todo, { doneyet: !todo.doneyet } )

        this.props.updateTodo(todo)
    }

    render() {
        return (
             <div className="todos container"> 
                { 
                    !this.state.createTodo ? 
                        <div className="text-center">
                            <div className="row justify-content-center">
                                <ul>
                                {
                                    this.props.todos.map((todo, index) => {
                                        return (
                                            <li key={todo._id}>
                                                <input type="checkbox" checked={todo.doneyet} onChange={() => { this.toggleTodo(todo._id) }}/> 
                                                &nbsp;
                                                {todo.title}
                                                &nbsp;
                                                -
                                                &nbsp;
                                                <span className="times" onClick={() => { this.deleteTodo(todo._id) } }>
                                                    <FontAwesomeIcon icon={faTimes} />
                                                </span>
                                                <br/>
                                                <span className="description">
                                                    {todo.description}
                                                </span>           
                                            </li>  
                                        )
                                    })
                                }
                                </ul>
                                <div className="text-center">
                                    <p>
                                        { this.props.todos.length > 0 ? '' : 'No Todos Exist.' }
                                    </p>
                                </div>                                
                            </div> 
                            <button type="button" className="btn btn-primary" onClick={ () => { this.setState({ createTodo: !this.state.createTodo }) } }>
                                Create Todo
                            </button>
                        </div> 
                            :
                        <div className="row justify-content-center text-center">
                          <div>
                            <hr/>
                            <Form
                                formData={this.state.formData}
                                noHtml5Validate={true}
                                schema={schema}
                                uiSchema={uiSchema}
                                onChange={this.onChange}
                                onSubmit={this.onSubmit.bind(this)}
                                onError={this.onError} />
                            <button type="button" className="btn btn-danger" onClick={ () => { this.setState({ createTodo: !this.state.createTodo }) } }>
                                Cancel
                            </button>
                          </div>    
                        </div>
                }      
            </div>
        )
    }

}

const mapState = state => ({
  todos: state.todos.todos,
  todosLoading: state.todos.todosLoading,
  todosError: state.todos.todosError,
  todoLoading: state.todos.todoLoading,
  todoError: state.todos.todoError,
})
  
const mapDispatch = dispatch => ({
  getTodos: () => dispatch.todos.getTodos(),
  createTodo: (formData) => dispatch.todos.createTodo(formData),
  deleteTodo: (id) => dispatch.todos.deleteTodo(id),
  updateTodo: (todo) => dispatch.todos.updateTodo(todo)
})

export default connect(mapState, mapDispatch)(Todos)