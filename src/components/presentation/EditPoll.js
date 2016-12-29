// presentational componet
// "use strict"; // maybe need this?
import React, { Component } from 'react';
import styles from '../layout/styles';

class EditPoll extends Component {
    
    render() {
        
        const zoneStyle = styles.zone; // needs to be inside the render func!
        
        return (<div style={zoneStyle.container}>
				    <h4 style={zoneStyle.header}>
				        <a style={zoneStyle.title} href="#">{this.props.currentPoll.pollquestion}</a>
				    </h4>
				        
				        <br/>
				        <span>by {this.props.currentPoll.author}</span>
				</div>
                );
    }
}

export default EditPoll