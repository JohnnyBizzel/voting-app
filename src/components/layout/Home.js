import React, { Component } from 'react'
//import Zones from '../containers/Zones'
import EditPoll from '../presentation/EditPoll'
import Polls from '../containers/Polls';
import {Link} from 'react-router';
import styles from './styles';

class Home extends Component {
    
    render() {
        
        //const homeStyle = styles.frontpage; // needs to be inside the render func!
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
            <div>
                <Polls />
            </div>
                <div className="row">
                    <div className="col-md-6 col-sm-6">
                        
                        
                    </div>
                    <div className="col-md-6 col-sm-6">
                       
                    </div>
                    
                </div>
                <Link to="test">test route here</Link>
                
            </div>
        )
    }
}

export default Home;