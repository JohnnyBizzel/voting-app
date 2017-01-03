import React from 'react'
//import Router from 'react-router'
import Link from 'react-router'
import Route from 'react-router'
import IndexRedirect from 'react-router'
import browserHistory from 'react-router'
import Container from './containers/Container.js'

import Home from './layout/Home'
import Login from '../Login/Login'
import Polldetail from './layout/Polldetail.js';
//import Poll from './containers/Container.js';
//export const makeMainRoutes = () =>
class makeMainRoutes extends React.Component  {
  render() {
  return (
      
      <Route path="/" component={Container}>
       
        
        <Route path="login" component={Login} />
        <Route path="Polldetailfull" component={Polldetail} />
        
      </Route>
      
      //end
     
      )
  }
  
}

export default makeMainRoutes