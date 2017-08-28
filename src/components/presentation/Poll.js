// presentational componet
import React, { Component } from 'react';
import styles from '../layout/styles';
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router';


//<Link to="/Polldetail">Some question</Link>
//<Link to={`/user/${_id}`}>
//<Link to={{ pathname: 'Polldetailfull/', query: { id: this.props.currentPoll._id } }}>{this.props.currentPoll.pollquestion}</Link>

class Poll extends Component {
    constructor() {
        super()
        this.state = {
            linkStyle: 'normal',
            currentUser: 'tester'
        }
        this.onHover = this.onHover.bind(this)
        this.offHover = this.offHover.bind(this)
    }
    
    componentDidMount(){
        //console.log("here's the id",this.props.currentPoll._id)
        
    }
    
    onHover(e) {
        this.setState({ linkStyle: 'hover' });
    }
    
    offHover() {
        this.setState({ linkStyle: 'normal' });
    }
    
    render() {
        
        const zoneStyle = styles.zone; // needs to be inside the render func!
        
        return ( <div style={zoneStyle.container}>
       
				    
				    <h2 style={zoneStyle.header}>
				    
				    <Link to={`/Polldetailfull/${this.props.currentPoll._id}`}>{this.props.currentPoll.pollquestion}</Link>
				    
				    
				        
				    </h2>
				        <br/>
				        <span>by {this.props.currentPoll.author}</span>
				        { this.state.currentUser == 'tester' ?
				        <Link className="btn" style={this.state.linkStyle == 'normal' ?
				                    zoneStyle.link :
				                    zoneStyle.linkHover}
				                    onMouseOver={this.onHover}
				                    onMouseOut={this.offHover} to={`/editthepoll/${this.props.currentPoll._id}`}>Edit Poll</Link>
				                : this.props.currentPoll.author === this.state.currentUser ?
				                    <Link className="btn-sm" to={`/user/login`}>Sign in to edit</Link> : ''}
				</div>
                );
    }
}

export default Poll;

/* 
REMOVED Login link here:
				        <Link style={zoneStyle.link} to="login">Log in</Link>
*/