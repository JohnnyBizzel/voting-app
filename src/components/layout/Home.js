import React, { Component } from 'react'
//import Zones from '../containers/Zones'
import EditPoll from '../presentation/EditPoll'
import Polls from '../containers/Polls';
import {Link} from 'react-router';
import styles from './styles';
import Auth from '../../utils/Auth';

class Home extends Component {
    
    render() {
        console.log(Auth.isUserAuthenticated());
        //const homeStyle = styles.frontpage; // needs to be inside the render func!
        return (
            <div className="container">
            <h1>The Polling Station</h1>
            <nav role="navigation">
             <div className="container-fluid">
                 {Auth.isUserAuthenticated() ?
                <div className="navbar-header">
                    <ul className="nav navbar-nav navbar-right">
                        <li><Link to="logout">Log out</Link></li>
                        <li><Link to="createPoll">Create Poll</Link></li>
                    </ul>
                </div>
                : 
                <div className="navbar-header">
                    <ul className="nav navbar-nav navbar-right">
                      <li><a href="/login" title="signin">Sign in</a></li>
                      <li><a href="/user/register" title="register">Register</a></li>
                    </ul>
                </div>
                 }
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