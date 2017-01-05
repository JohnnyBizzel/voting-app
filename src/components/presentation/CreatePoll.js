import React, { Component } from 'react';
import Poll from './Poll';
import Api from '../../utils/ApiManager';

class CreatePoll extends Component {
    constructor(){
        super()
            this.state = {
                poll:{
                    pollquestion: '',
                    author: '',
                    timestamp: '',
                    responses: ['',0]
                }
        };
    }
    
    updatePoll(event){

        // WRONG!!! Never mutate state!!
        // this.state.comment['username'] =event.target.value; 
        let updtPoll = Object.assign({}, this.state.poll);
        updtPoll[event.target.id] = event.target.value;

        this.setState({
            comment: updtPoll
        });
    }
    

    submitPoll(event){
        console.log("Submitting new poll (from CreatePoll): " + JSON.stringify(this.state.poll));
        // call the function from the container (not here as this is presentation layer)
        this.props.onCreate(this.state.poll);
    }
    
    render(){	
        return (
			<div>
              Add a new poll:<br/>
                    
                    <input onChange={this.updatePoll.bind(this)} id="body" className="form-control" type="text" placeholder="Poll question"/>
                    <br/>
                    <input onChange={this.updatePoll.bind(this)} id="username" className="form-control" type="text" placeholder="Author"/>
                    <br/>
                 
                    <br/>
                    <button onClick={this.submitPoll.bind(this)} className="btn btn-info" >Send</button>
            </div>
	    )
    }
    
}
        /* Removed Timestamp field : /*  <!-- input onChange={this.updateTimestamp.bind(this)} className="form-control" type="text" placeholder="Time"/ -->*/
export default CreatePoll