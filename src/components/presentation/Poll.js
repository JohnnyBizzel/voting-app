// presentational componet
import React, { Component } from 'react';
import styles from '../layout/styles';
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router';


//<Link to="/Polldetail">Some question</Link>
//<Link to={`/user/${_id}`}>
//<Link to={{ pathname: 'Polldetailfull/', query: { id: this.props.currentPoll._id } }}>{this.props.currentPoll.pollquestion}</Link>

class Poll extends Component {
    componentDidMount(){
        console.log("here's the id",this.props.currentPoll._id)
    }
    
    render() {
        
        const zoneStyle = styles.zone; // needs to be inside the render func!
        
        return ( <div style={zoneStyle.container}>
       
				    
				    <h3 style={zoneStyle.header}>
				    
    				    <Link to={`/Polldetailfull/${this.props.currentPoll._id}`}>{this.props.currentPoll.pollquestion}</Link>
				    </h3>
				        <br/>
			        <span>by {this.props.currentPoll.author}</span>
			        <Link to="login">Log in to your account</Link>
			</div>);
    }
}

export default Poll;