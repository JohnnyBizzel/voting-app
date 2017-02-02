import React from 'react'
//import Router from 'react-router'
import Link from 'react-router'
import Route from 'react-router'
import IndexRedirect from 'react-router'
import browserHistory from 'react-router'
import Container from './containers/Container.js'
//import AuthService from 'utils/AuthService'

import Home from './layout/Home'
import Login from '../Login/Login'
//import Polldetail from './layout/Polldetail.js'; // removed for testing
import PollDetails from './layout/PollDetails.js';
import EditPoll from './presentation/EditPoll.js';

//export const makeMainRoutes = () =>
const auth = 2;

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}
class makeMainRoutes extends React.Component  {
  render() {
  return (
      
      <Route path="/" component={Container} auth={auth}>
       
        
        <Route path="login" component={Login} />
        <Route path="Polldetailfull" component={PollDetails} onEnter={requireAuth}/>
        <Route path="editthepoll" component={EditPoll} />
      </Route>
      
      //end
     
      )
  }
  
}

export default makeMainRoutes