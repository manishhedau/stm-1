import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { getAllStudents } from "./store/studentsSlice";


import configureStore from './store/configureStore'

const store = configureStore();

// store.dispatch(getAllStudents([
//   {
//     name: "manish"
//   }
// ]));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

