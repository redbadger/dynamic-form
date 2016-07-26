import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import DynamicForm from './components/DynamicForm';
import schema from './schema.json';
import reducers from './reducer';

const store = createStore(reducers);

ReactDOM.render(
  (<Provider store={store}>
    <DynamicForm onSubmit={args => console.log(args)} schema={schema} submitText="Submit" />
  </Provider>),
  document.getElementById('app')
);
