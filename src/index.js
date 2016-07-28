import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';


import DynamicForm from './components/DynamicForm';
import schema from './schema.json';
import reducer from './reducer';

const logger = createLogger();
const store = createStore(
  reducer,
  applyMiddleware(logger)
);

ReactDOM.render(
  (<Provider store={store}>
    <DynamicForm onSubmit={} schema={schema} submitText="Submit" />
  </Provider>),
  document.getElementById('app')
);
