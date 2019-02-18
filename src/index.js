import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import App from './gl/App';
import Routes from './routes';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router>
  <div>

  <Link to="/gl">gl</Link>
  <Link to="/three">three</Link>,
    <Routes />
  </div>
  </Router>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
