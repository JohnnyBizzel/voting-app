// presentational componet
// "use strict"; // maybe need this?
import React, { Component } from 'react';
import styles from '../layout/styles';
import Api from '../../utils/ApiManager';
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router';

class PollDetail extends React.Component {
	
	constructor(props) {
    	super(props);
    		this.state = {
    			editing: props.editMode, 
				editText: props.children,
				selectedID: props.id,
				newText: ''
    		}
    		
    	this.changeText = this.changeText.bind(this);
    	this.submit = this.submit.bind(this);
    	this.remove = this.remove.bind(this);
    }
  
	edit() {
		this.setState({editing: true, editText:''});
	}
	
	changeText(event) {
			//var responseOption = this.state.editText;
			console.log('text changing:', event.target.value)
			this.setState({ newText: event.target.value })
			console.log('text response ID:', this.props.id)
			this.props.changetext(event.target.value, this.props.id)
	}
	
	submit = (event) => {
		event.preventDefault();
		//this.setState({editText:event.target.value})
		console.log('update pressed',this.state.newText);
		if (this.state.newText != '') {
			this.props.submit(this.props.id, this.state.newText.trim())	
			this.setState({editing: false, editText:''});
		} else {
			this.setState({editing: false});
		}
	}

       
	remove() {
		console.log(this.props.id);
		this.props.onRemove(this.props.id);
	}
	cancel = (event) => {
		event.preventDefault();
		this.setState({editing:false})
	}
	renderForm() {
		
			return (<div className="responseBox">
						<form onSubmit={this.submit}>
						<input ref={this.props.id} type="text" 
							className="form-control" onChange={this.changeText}
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


class PollResponse extends Component {
    constructor(props) {
    	super(props);
    		this.state = {
                newresponses:[2],
                valid: true
        };
    }


	// bound function - renders each answer - PollDetail component
    eachPollResponse = (resp) => {
 

		const remove = () => {} ;
		// onChange={this.props.save(resp.respID)}
		return (<PollDetail key={resp.respID} 
				id={resp.respID} submit={this.props.save} 
				changetext={this.props.onChange}
				editMode={this.state.editing} 
				onRemove={this.props.deleteOpt} respText={resp.response}>
				{resp.response}</PollDetail>)
	}

    render() {
        return (<div className="responses">
                    {this.props.poll.responses.map(this.eachPollResponse)}
                </div>
                )
    }
}

PollResponse.defaultProps = {
	someResponses: [{ _id:1, response: "not"},
                    { _id:2, response:"loaded"},
                    { _id:3, response:"yet"}
                   ]		
}

PollResponse.propTypes = {
	someResponses: React.PropTypes.array
}

/////////////////////////////////////////
//
//  EDIT POLL COMPONENT
//
/////////////////////////////////////////

class EditPoll extends Component {
    constructor(props) {
    	super(props)
    	this.state = {
                poll:{
                    pollquestion: '',
                    author: '',
                    responses: [1]
                },
                newresponses:[2],
                valid: true
        };
    	
    	this.save = this.save.bind(this);
    	this.update = this.update.bind(this);
    	this.deleteOption = this.deleteOption.bind(this);
    }
    
    componentDidMount(){
        
        // NB: pollID is a parameter of the URL (a query string)
        
        Api.get('/api/polls/' + this.props.params.id, null, (err, response) => {
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
                    return i.response;
                });
                this.setState({
                    newresponses:newarr
                });
                console.log("Api GET Loading:",this.state.poll.responses);
            }
        });
        
		let isValid = Object.assign({},this.state.valid);
		isValid = JSON.stringify(true)
		this.setState({
		        valid:isValid
		    })
        
    }
    
	save = (id, updatedText) => {
		console.log('in the save')
		
		let allResponses = Object.assign([],this.state.poll.responses);
		let updatedResponse = {};
		// TODO: Validation - if voted on already, values should not be changed?
		allResponses.forEach(function(r) {
			if (r.respID == id) {
				r.response = updatedText;
				console.log('Modified:',r);
				updatedResponse.response = updatedText;
				updatedResponse.respID = r.respID;
				updatedResponse.votes = r.votes;
			}
		})
		
		console.log(updatedResponse);
		this.setState({
            poll:{
                responses: allResponses
            }
        })
        
        // Now update in the database:
        
        if(this.state.valid){
			Api.put('/api/polls/' + this.props.params.id, updatedResponse, (err, response) => {
				if (err) { 
				     console.log("Error: " + JSON.stringify(err)); 
				     return;
				}
				else{
				    console.log("changes succesfully saved" + JSON.stringify(response))
				}
			
			},true);
        }
        else{
            alert("something wrong with your options.")
        }
	}
	
	deleteOption = (id) => {
		console.log('delete Opt', id);
		// TODO: Validation... maybe stop deleting an option with votes?
		// Update State to remove the unwanted option
		let newStateResponses = {...this.state };
		// need at least 2 responses
		// TODO: warning message
		if (newStateResponses.poll.responses.length < 2) {
			this.setState({ valid:  false });
			return;
		}
		
	
		// Use API to delete the option from the Db.
		if(this.state.valid){
			// find the index and splice out the deleted element
			const idx = newStateResponses.poll.responses.findIndex((x) => x.respID === id);
			console.log(idx, id);
			if (idx < 0) return;
		    newStateResponses.poll.responses.splice(idx, 1);
	    	this.setState(newStateResponses);
	    	console.log(newStateResponses);
	    	
	    	// deleted response object
    		let delResponse = {};
    		delResponse.response = '[[DELETE]]';
			delResponse.respID = id;
    		
			Api.put('/api/polls/' + this.props.params.id, delResponse, (err, response) => {
				if (err) { 
				     console.log("Error: " + JSON.stringify(err)); 
				     return;
				}
				else{
				    console.log("delete succesfully saved" + JSON.stringify(response))
				}
			
			},true);
        }
        else{
            alert("You must have at least 2 options for a poll.")
        }
	}
	
    /* update text (and update state) */
    update = (changedText, id) => {

    	let newStateResponses = {...this.state }; // == Object.assign({}, this.state);

	    newStateResponses.poll.responses.forEach((rs) => {
	      if (rs.respID === id) {
	      	// change the record matching the id
	        rs.response = changedText;
	      }
	    })
    	this.setState(newStateResponses);
    	
    	// TODO: Now update in the database:
	
	}
    
    render() {
    	let pollID = 'none';
		if (this.props.params != undefined)
			pollID = this.props.params.id;
    	//pollID = urlWithId.split('/').pop();
    	//someResponses={this.state.poll.responses}
        const zoneStyle = styles.zone; // needs to be inside the render func!
        
        return (<div style={zoneStyle.container}>
				    <h4 style={zoneStyle.header}>
				       <Link style={zoneStyle.title} to={`/Polldetailfull/${pollID}`}>{this.state.poll.pollquestion}</Link>
				    </h4>
				        <PollResponse onChange={this.update} 
				        	poll={this.state.poll} 
				        	thePollId={pollID} save={this.save} 
				        	deleteOpt={this.deleteOption} />
				        <br/>
				        <span>created by {this.state.poll.author}</span>
				</div>
                );
    }
}

export default EditPoll