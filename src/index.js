import React from 'react';
import ReactDOM from 'react-dom';
import { init } from "@rematch/core";
import { Provider } from "react-redux";

import auth from "./models/auth";
import todos from "./models/todos";

import './index.scss';
import App from './app/App';
import * as serviceWorker from './serviceWorker';


// generate Redux store
const store = init({
    models: {
        auth,
        todos
    }
});

const Root = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(<Root/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
