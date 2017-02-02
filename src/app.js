import React from 'react'
import ReactDOM from 'react-dom'
import Home from './components/layout/Home.js'

import Login from './Login/Login'
//import    Polldetail from './components/layout/Polldetail.js'; // testing different Poll details
import PollDetails from './components/layout/PollDetails.js';
import EditPoll from './components/presentation/EditPoll.js';
import createPoll from './components/presentation/CreatePoll'

import Container from './components/containers/Container.js';


import {Route,Router,browserHistory,hashHistory,IndexRoute} from 'react-router'
import makeMainRoutes from './components/routes'


const mountNode = document.getElementById('root');


ReactDOM.render( <Router history={browserHistory}>
    <Route path="/" component={Container} >
    <IndexRoute component={Home} />
      <Route path="Polldetailfull/:id" component={PollDetails}  />
      <Route path="Editthepoll/:id" component={EditPoll}  />
      <Route path="createPoll" component={createPoll} />

    </Route>
    
    
  </Router>,mountNode);