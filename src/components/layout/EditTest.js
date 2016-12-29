import React, { Component } from 'react'
//import Zones from '../containers/Zones'
import EditPoll from '../presentation/Editpoll'

class EditTest extends Component {
    
    render() {
        return (
            <div className="container">
                <div className="row">
                    <EditPoll/>
                </div>
            </div>
        )
    }
}

export default EditTest;