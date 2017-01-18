import React from 'react'
import ReactDOM from 'react-dom'
import Home from './components/layout/Home.js'
import Editdamnpoll from './components/presentation/Editdamnpoll.js'

import Login from './Login/Login'
import Waste from './Login/Waste.js'
//import    Polldetail from './components/layout/Polldetail.js'; // testing different Poll details
import PollDetails from './components/layout/PollDetails.js';
import createPoll from './components/presentation/CreatePoll'

import Container from './components/containers/Container.js';


import {Route,Router,browserHistory,hashHistory,IndexRoute} from 'react-router'
import makeMainRoutes from './components/routes'
import AuthService from './utils/AuthService'

const routes = new makeMainRoutes()

const mountNode = document.getElementById('root');
const auth = new AuthService('7SJudZnU0L7f1uFNXiH4o9P2gBgYH317', 'app1163.auth0.com');

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}


ReactDOM.render( <Router history={browserHistory}>
    <Route path="/" component={Container} auth={auth}>
    <IndexRoute component={Home} />
      <Route path="login" component={Login} />
      <Route path="Polldetailfull/:id" component={PollDetails}  />
      <Route path="waste" component={Waste}  />
      <Route path="createPoll" component={createPoll} />
      <route path="editdamnpoll/:pollid" component={Editdamnpoll} />
      
    </Route>
    
    
  </Router>,mountNode);