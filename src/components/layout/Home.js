import React, { Component } from 'react'
//import Zones from '../containers/Zones'
import Comments from '../containers/Comments'
import Polls from '../containers/Polls'

class Home extends Component {
    
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-sm-6">
                        <Polls />
                    </div>
                    <div className="col-md-6 col-sm-6">
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;