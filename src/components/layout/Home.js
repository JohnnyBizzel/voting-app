import React, { Component } from 'react'
//import Zones from '../containers/Zones'
import EditPoll from '../presentation/EditPoll'
import Polls from '../containers/Polls';
import {Link} from 'react-router';
import styles from './styles';
import Auth from '../../utils/Auth';

const locStoreKeyName = 'PollingStation_usr';

class Home extends Component {
    storageAvailable(type) {
        try {
          var storage = window[type],
              x = '__storage_test__';
          storage.setItem(x, x);
          storage.removeItem(x);
          return true;
        }
        catch(e) {
          return false;
        }
    }
    
    render() {
        var currentUserNameMsg = '';
        console.log('Home user is auth...', Auth.isUserAuthenticated());
        
        //const homeStyle = styles.frontpage; // needs to be inside the render func!
        if (this.storageAvailable('localStorage')) {
          if(!window.localStorage.getItem(locStoreKeyName)) {  
            // cehck
            //this._saveToLocalStorage(locStoreKeyName, JSON.stringify(recipeData));                  
          } else {
            currentUserNameMsg = 'Welcome ' + window.localStorage.getItem(locStoreKeyName)  
          }
        } else {
          console.log('Local storage not available - not all functions will work on this browser');
        }
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
            <p>{currentUserNameMsg}</p>
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