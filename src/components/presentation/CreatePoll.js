import React, { Component } from 'react';
import Poll from './Poll';
import Api from '../../utils/ApiManager';
//waste

class CreatePoll extends Component {
    constructor(){
        super()
            this.state = {
                poll:{
                    pollquestion: '',
                    author: '',
                    responses: []
                }
        };
    }
    
    updatePoll(event){

        // WRONG!!! Never mutate state!!
        // this.state.comment['username'] =event.target.value; 
        let updtPoll = Object.assign({}, this.state.poll);
        updtPoll[event.target.id] = event.target.value;
        

        this.setState({
            poll: updtPoll
        });
        console.log("poll",this.state.poll)
        
    }
   
    

    submitPoll(event){
        
       
        // call the function from the container (not here as this is presentation layer)
        //this.props.onCreate(this.state.poll);fg
        
        let pollObject = Object.assign({},this.state.poll);
        console.log("state copied",pollObject);
        // var arr1 =this.state.poll.responses.split(","); // don't do this here
        // var arr2=[];
        // for(var i=0;i<arr1.length;i++){
        //     arr2.push({response:arr1[i],votes:0})
            
        // }
         // pollObject["responses"]=this.state.poll.responses;
          console.log("final pollObject",pollObject)
        	Api.post('/api/polls', pollObject, (err, response) => {
			if (err) { 
				alert("Error: " + JSON.stringify(err)); 
				return;
			}
			
			console.log('this is response after saving: ' + JSON.stringify(response.message));
			
			
		});
    }
    
    render(){	
        return (
			<div>
              Add a new poll:<br/>
                    
                    <input onChange={this.updatePoll.bind(this)} id="pollquestion" className="form-control" type="text" placeholder="Poll question" value={this.state.poll.pollquestion}/>
                    <br/>
                    <input onChange={this.updatePoll.bind(this)} id="author" className="form-control" type="text" placeholder="Author"/>
                    <br/>
                    <input onChange={this.updatePoll.bind(this)} id="responses" className="form-control" type="text" placeholder="response" value={this.state.poll.responses}/>
                    <p>NB: add multiple responses using ; </p>
                 
                    <br/>
                    <button onClick={this.submitPoll.bind(this)} className="btn btn-info" >Send</button>
            </div>
	    )
    }
    
}
        /* Removed Timestamp field : /*  <!-- input onChange={this.updateTimestamp.bind(this)} className="form-control" type="text" placeholder="Time"/ -->*/
export default CreatePoll