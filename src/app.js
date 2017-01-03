import React from 'react'
import ReactDOM from 'react-dom'
import Home from './components/layout/Home.js'

import Login from './Login/Login'
import   { Polldetail } from './components/layout/Polldetail.js';
import Container from './components/containers/Container.js';


import {Route,Router,browserHistory,hashHistory,IndexRoute} from 'react-router'
import makeMainRoutes from './components/routes'

const routes = new makeMainRoutes()

const mountNode = document.getElementById('root');


ReactDOM.render( <Router history={browserHistory}>
    <Route path="/" component={Container}>
    <IndexRoute component={Home} />
      <Route path="login" component={Login} />
      <Route path="Polldetailfull" component={Polldetail} />
      
    </Route>
    
    
  </Router>,mountNode);