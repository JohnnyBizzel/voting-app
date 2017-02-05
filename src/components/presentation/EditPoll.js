// presentational componet
// "use strict"; // maybe need this?
import React, { Component } from 'react';
import styles from '../layout/styles';
import Api from '../../utils/ApiManager';

class PollDetail extends React.Component {
	
	constructor(props) {
    	super(props);
    		this.state = {
    			editing: false, 
				editText: props.children
    		}
    
    }
    
    
	// edit() {
	// 	this.setState({editing: true, editText:''})
	// }
	// update(event) {
	// 		//var responseOption = this.state.editText;
	// 		this.setState({ editText: event.target.value})
	// },
	// 
	save = (event) => {
		event.preventDefault();
		this.setState({editText:event.target.value})
	}

       
	remove() {
		this.props.onRemove(this.props.response)
	}
	cancel = (event) => {
		event.preventDefault();
		this.setState({editing:false})
	}
	renderForm() {
	
			return (<div className="responseBox">
						<form onSubmit={this.props.onSubmit}>
						<input ref="newText" type="text"
							className="form-control" onChange={this.save}
							value={this.state.editText} />
						<input className="btn btn-success" type="submit" value="Update" />																
						<button className="btn btn-default" 
							onClick={this.cancel} >Cancel</button>
						</form>
					</div>)
	}
	renderDisplay() {
			return (<div className="container-fluid">
						<p>{this.state.editText}</p>
						<span>
							<button className="btn btn-warning" 
								onClick={() => this.setState({editing:true})}>Edit</button>
							<button className="btn btn-danger" onClick={this.remove}>Delete</button>
						</span>
					</div>)
	}
	render() {
			return (this.state.editing) ? this.renderForm() : this.renderDisplay()								
	}
}		

		

class PollResponse extends Component {
    constructor(props) {
    	super(props);
    		this.state = {
    			pollResponses: [],
    			typed: ''
    		}
    }
    
	// bound function
    eachPollResponse = (resp) => {
 
		const remove = () => {} 
		
		return (<PollDetail key={resp.respID} 
				id={resp.respID} onSubmit={this.submit} onRemove={remove} 
	             >
				{resp.response}</PollDetail>)
	}
	
	submit = (event) => {
		event.preventDefault();
		alert("Current state: " + this.props.children)
		this.setState({editing: false})
		  // call API - update poll
	
	        console.log("state polls",this.state)
	        
	        var newVotesObj = Object.assign({},this.props.thePoll);
	        // Trim space characters from the response:
	        var trimmedObjResponses = newVotesObj.responses.map(function(item) {
	            var respObj = Object.assign({}, item);
	            respObj.response = respObj.response.trim();
	            return respObj;
	        });
	        newVotesObj.responses = trimmedObjResponses;
	  //      if(this.state.valid){
	  //               Api.put('/api/polls/' + pollID, newVotesObj, (err, response) => {
	  //                   console.log("newVotesObj value",newVotesObj)
	  //                  if (err) { 
	  //                       console.log("Error: " + JSON.stringify(err)); 
	  //                       return;
	  //                  }
	  //                  else{
	  //                      alert("your data is succesfully saved" + JSON.stringify(response))
	  //                  }
	                 
	  //               },true);
	  //      }
	  //      else{
	  //          alert("something wrong with your options.")
			// }
		alert("update " + this.props.children + " ID : "+ this.props.id );
	}
  
  
//thePoll={this.props.thePoll}
    render() {
        return (<div className="responses">
        			
        		 <code>{this.state.typed}</code>
                    {this.props.someResponses.map(this.eachPollResponse)}
                </div>
                )
    }
}

PollResponse.defaultProps = {
	someResponses: [{ _id:1, response: "one"},
                                { _id:2, response:"two"},
                                { _id:3, response:"half"},
                                { _id:4, response:"five"}]		
}

PollResponse.propTypes = {
	someResponses: React.PropTypes.array
}

class EditPoll extends Component {
    constructor() {
    	super()
    	this.state = {
                poll:{
                    pollquestion: 'ankur',
                    author: 'ankur',
                    responses: [1]
                },
                newresponses:[2],
                valid: true
        };
    	
    }
    

    componentDidMount(){
        var urlWithId =this.props.location.pathname;
        let pollID = 2;
        pollID = urlWithId.split('/').pop();
        console.log("here's the poll id",pollID)
        Api.get('/api/polls/' + pollID, null, (err, response) => {
            if(err){
                 alert("Error: " + err); 
                
            }
            else{
                
                var newobj = {pollquestion:response.message.pollquestion,author:response.message.author,responses:response.message.responses}
                this.setState({
                    poll:newobj
                    
                });
                var newarr = this.state.poll.responses.map(function(i,index){
                    return i.response
                })
                var tochange = this.state.newresponses;
                this.setState({
                    newresponses:newarr
                })
                console.log("this is only array",this.state.newresponses);
                console.log("conventional responses",this.state.poll.responses)
               
            }
            
        });
         let isValid = Object.assign({},this.state.valid);
           isValid = JSON.stringify(true)
          this.setState({
                    valid:isValid
                })
        
    }
    

    update = (event, id) => {
		// var updatedResponses = this.state.someResponses.map(
		// 				response => (response.response !== response) ? 
		// 									response: { ...response,
		// 												response: newText }
		// 				)
			//	this.setState({updatedResponses})
				console.log(event +' ID: '+ id);
	}
    
    render() {

        const zoneStyle = styles.zone; // needs to be inside the render func!
        
        return (<div style={zoneStyle.container}>
				    <h4 style={zoneStyle.header}>
				        <a style={zoneStyle.title} href="#">{this.state.poll.pollquestion}</a>
				    </h4>
				        <PollResponse onChange={this.props.update} thePoll={this.state.poll} someResponses={this.state.poll.responses} />
				        <br/>
				        <span>created by {this.props.author}</span>
				</div>
                );
    }
}

export default EditPoll