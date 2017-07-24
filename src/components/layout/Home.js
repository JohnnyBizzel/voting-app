import React, { Component } from 'react'
//import Zones from '../containers/Zones'
import EditPoll from '../presentation/EditPoll'
import Polls from '../containers/Polls';
import {Link} from 'react-router';

class Home extends Component {
    
    render() {
        return (
            <div className="container">
            <h1>The Polling Station</h1>
            <nav role="navigation">
             <div className="container-fluid">
                <div className="navbar-header">
                    <ul className="nav navbar-nav navbar-right">
                      <li><a href="/user/login" title="signin">Sign in</a></li>
                      <li><a href="/user/register" title="register">Register</a></li>
                      <li><Link to="createPoll">Create Poll</Link></li>
                   
                    </ul>
                </div>
             </div>
            </nav>

                <div className="row">
                    <div className="col-md-6 col-sm-6">
                        <Polls />
                        
                    </div>
                    <div className="col-md-6 col-sm-6">
                       
                    </div>
                    
                </div>
                <Link to="waste">waste page here</Link>
                
            </div>
        )
    }
}

export default Home;