import axios from 'axios'

export default {
    state: {
        todos: [],
        todosLoading: false,
        todosError: null,
        todoLoading: false,
        todoError: null,
    },
    reducers: {
        setTodosSuccess: (state, payload) => {
            return {
                ...state,
                todos: payload
            }
        },
        setTodosLoading: (state, payload) => {
            return {
                ...state,
                todosLoading: payload
            }
        },
        setTodosError: (state, payload) => {
            return {
                ...state,
                todosError: payload
            }
        },
        setTodoSuccess: (state, payload) => {
            return {
                ...state,
                todos: payload
            }
        },
        setTodoLoading: (state, payload) => {
            return {
                ...state,
                todosLoading: payload
            }
        },
        setTodoError: (state, payload) => {
            return {
                ...state,
                todosError: payload
            }
        }
    },
    effects: (dispatch) => ({
        async getTodos(payload, rootState) {
          try {
            dispatch.todos.setTodosLoading(true)
            dispatch.todos.setTodosError(null)
            let response = await axios.get(`${process.env.REACT_APP_AUTH_SERVER}/tasks`, {withCredentials: true})
            dispatch.todos.setTodosLoading(false)
            dispatch.todos.setTodosSuccess(response.data)
          } catch (e) {
            dispatch.todos.setTodosLoading(false)
            dispatch.todos.setTodosError(e.response.data.message)
          }
        },
        async createTodo(payload, rootState) {
            try {
                
                dispatch.todos.setTodoLoading(true)
                dispatch.todos.setTodoError(null)
                let response = await axios.post(`${process.env.REACT_APP_AUTH_SERVER}/tasks/create`, payload, {withCredentials: true})
                dispatch.todos.setTodoLoading(true)
                dispatch.todos.setTodosSuccess([...rootState.todos.todos, Object.assign({},response.data)])
            } catch(e) {
                dispatch.todos.setTodoLoading(false)
                dispatch.todos.setTodoError(e.response.data.message)
            }
        },
        async deleteTodo(payload, rootState) {
            try {
                dispatch.todos.setTodoLoading(true)
                dispatch.todos.setTodoError(null)
                await axios.post(`${process.env.REACT_APP_AUTH_SERVER}/tasks/delete/${payload}`, {}, {withCredentials: true})
                dispatch.todos.setTodoLoading(false)
                dispatch.todos.setTodosSuccess(rootState.todos.todos.filter((i, index) => { return i._id !== payload }))
            } catch(e) {
                dispatch.todos.setTodoLoading(false)
                dispatch.todos.setTodoError(e.response.data.message)
            }
        },
        async updateTodo(payload, rootState) {
            try {
                dispatch.todos.setTodoLoading(true)
                dispatch.todos.setTodoError(null)
                await axios.post(`${process.env.REACT_APP_AUTH_SERVER}/tasks/edit/${payload.id}`, payload, {withCredentials: true})
                dispatch.todos.setTodoLoading(false)
                let index = rootState.todos.todos.findIndex((i, index) => { return i._id === payload._id })
                
                dispatch.todos.setTodosSuccess(
                    [
                        ...rootState.todos.todos.slice(0,index),
                        Object.assign(rootState.todos.todos[index], {
                            doneyet: rootState.todos.todos[index].doneyet
                        }),
                        ...rootState.todos.todos.slice(index+1),
                    ]
                )
                
            } catch(e) {
                dispatch.todos.setTodoLoading(false)
                dispatch.todos.setTodoError(e.response.data.message)
            }
        },
    })
}