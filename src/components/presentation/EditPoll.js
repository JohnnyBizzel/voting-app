// presentational componet
// "use strict"; // maybe need this?
import React, { Component } from 'react';
import styles from '../layout/styles';
import Api from '../../utils/ApiManager';

class PollDetail extends React.Component {
	
	constructor(props) {
    	super(props);
    		this.state = {
    			editing: props.editMode, 
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
	// save = (event) => {
	// 	event.preventDefault();
	// 	this.setState({editText:event.target.value})
	// }

       
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
						<input ref={this.props.key} type="text" key={this.props.key}
							className="form-control" onChange={this.props.onChange}
							value={this.props.respText} />
						<input className="btn btn-success" type="submit" value="Update" />																
						<button className="btn btn-default" 
							onClick={this.cancel} >Cancel</button>
						</form>
					</div>)
	}
	renderDisplay() {
			return (<div className="container-fluid">
						<p>{this.props.respText}</p>
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
// PollDetail.propTypes = {
// 	submit: React.PropTypes.func.isRequired
// }

		

class PollResponse extends Component {
    constructor(props) {
    	super(props);
    		this.state = {
    			pollResponses: [],
    			typed: '',
    			editing:false
    		}
    }
    
	// bound function
    eachPollResponse = (resp) => {
 
		const remove = () => {} 
		
		return (<PollDetail key={resp.respID} 
				id={resp.respID} onSubmit={this.submit} onChange={this.save}
				editMode={this.state.editing} 
				onRemove={remove} respText={resp.response}>
				{resp.response}</PollDetail>)
	}
	
	save = (event) => {
		event.preventDefault();
		this.setState({typed:event.target.value});
		alert("update " + event.target.value + " ID : "+ event.target.ref );
	}
	
	submit = (event) => {
		event.preventDefault();
		alert("Current event: " + event.target.value)
		this.setState({editing: false})
		  // call API - update poll
	
	        console.log("Submitted state polls: ",this.state)
	        
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
                    pollquestion: '',
                    author: '',
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
                
                var newobj = {pollquestion:response.message.pollquestion,
                	author:response.message.author,
                	responses:response.message.responses}
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
				        <PollResponse onChange={this.props.update} thePoll={this.state.poll} 
				        someResponses={this.state.poll.responses} />
				        <br/>
				        <span>created by {this.props.author}</span>
				</div>
                );
    }
}

export default EditPoll