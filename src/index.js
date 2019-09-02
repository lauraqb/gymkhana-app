import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from "./js/store/index"
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById("root")
  );