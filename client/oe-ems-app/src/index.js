import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createBrowserHistory } from "history";
import * as serviceWorker from './serviceWorker';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Admin from "./layouts/Admin.js"

const hist = createBrowserHistory();
ReactDOM.render(
<Router history={hist}>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Redirect from="/" to="/admin/dashboard" />
    </Switch>
  </Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
