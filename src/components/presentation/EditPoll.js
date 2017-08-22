// presentational componet
// "use strict"; // maybe need this?
import React, { Component } from 'react';
import styles from '../layout/styles';
import Api from '../../utils/ApiManager';
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router';

/////////////////////////////
//
//  POLL DETAIL
//
////////////////////////////

class PollDetail extends React.Component {
	
	constructor(props) {
    	super(props);
    		this.state = {
    			editing: props.editMode, 
				editText: props.children,
				selectedID: props.id,
				newText: '',
            	user_feedback: '' 
    		}
    		
    	this.changeText = this.changeText.bind(this);
    	this.submit = this.submit.bind(this);
    	this.remove = this.remove.bind(this);
    }
  
	edit() {
		this.setState({editing: true, editText:''});
	}
	
	changeText(event) {
		// Report error
		if (!event.target.value.trim()) {
			this.setState({ user_feedback: '* A response cannot be left blank'});
			return;
		}
			
		console.log('text changing:', event.target.value)
		this.setState({ newText: event.target.value })
		console.log('text response ID:', this.props.id)
		this.props.changetext(event.target.value, this.props.id)
	}
	
	submit = (event) => {
		event.preventDefault();
		if (this.state.newText != '') {
			this.props.submit(this.props.id, this.state.newText.trim())	
			this.setState({editing: false, editText:'', user_feedback: ''});
		} else {
			this.setState({editing: false, user_feedback: ''});
		}
	}

	remove() {

		this.props.onRemove(this.props.id);
	}
	cancel = (event) => {
		event.preventDefault();
		this.setState({editing:false, user_feedback: '' })
	}
	renderForm() {
		const sty = styles.editPoll;
			return (<div className="container-fluid responseBox">
						<div className="row">
						<form onSubmit={this.submit}>
							<div className="col-xs-12 col-sm-8 col-md-6">
								<input ref={this.props.id} type="text" 
									className="form-control" onChange={this.changeText}
									value={this.props.respText} />
							</div>
							<div className="col-xs-12 col-sm-4 col-md-6">
								<div className="float-right">
									
									<button className="btn-sm btn-success" 
										style={sty.buttonSpace} 
										type="submit" 
										value="Update">
										<i className="fa fa-floppy-o" aria-hidden="true"></i>
										&nbsp;Update</button>
									<button className="btn-sm btn-default" 
										style={sty.buttonSpace}
										onClick={this.cancel}>
										<i className="fa fa-ban" aria-hidden="true"></i>
										&nbsp;Cancel</button>
								</div>
							</div>
						</form>
						<br/>
						<span className="error-text">{this.state.user_feedback}</span>
						</div>
					</div>)
	}
	renderDisplay() {
		const sty = styles.editPoll;
			return (<div className="container-fluid" style={sty.containerBox}>
						<div className="row responseOption">
							<div className="col-xs-12 col-sm-8 col-md-6">
								{this.props.respText}
							</div>
								<div className="col-xs-12 col-sm-4 col-md-6">
									<div className="float-right">
										<button className="btn-sm btn-warning" 
											style={sty.buttonSpace}
											onClick={() => this.setState({editing:true})}>
											<i className="fa fa-pencil-square-o" aria-hidden="true"></i>
											&nbsp;Edit</button>
										<button className="btn-sm btn-danger"
											style={sty.buttonSpace} 
											onClick={this.remove}>
											<i className="fa fa-times" aria-hidden="true"></i>
											&nbsp;Delete</button>
									</div>
								</div>
							
						</div>
					</div>)
	}
	render() {
		return (this.state.editing) ? this.renderForm() : this.renderDisplay()								
	}
}

//////////////////////////////
//
//  NEW RESPONSE
//
//////////////////////////////

class NewResponse extends Component {
	constructor(props) {
    	super(props);
    		this.state = {
                valid: true,
                newText: '',
                user_feedback: ''
        };
        // TODO: Re factor out user_feedback
        // BIND EVENTS!!!
        this.changeText = this.changeText.bind(this);
        this.cancel = this.cancel.bind(this);
        this.save = this.save.bind(this);
    }
	
	changeText = (event) => {
		console.log(this.refs.inputNewResponse.value);
		if (!this.refs.inputNewResponse.value) {
			this.setState({
				user_feedback: '* Cannot be blank',
				valid: false
			})
			return;
		} else {
			this.setState({
				user_feedback: '',
				valid: true
			})
		}
		this.setState({ newText: this.refs.inputNewResponse.value });
	}
	cancel = (e) => {
		e.preventDefault();
		
		this.props.cancel();
	}
	save = (e) => {
		e.preventDefault();
		if (!this.refs.inputNewResponse.value) return;
		console.log('save new resp ', this.refs.inputNewResponse.value);
		this.props.saveNew(this.state.newText);
	}
	render() {
	const sty = styles.editPoll;
		return (<div className="container-fluid responseBox">
					<div className="row">
					<form onSubmit={this.save}>
						<div className="col-xs-12 col-sm-8 col-md-6">
							<input type="text" ref="inputNewResponse"
								className="form-control" onChange={this.changeText}
								placeholder="Add a new poll option"
								value={this.state.newText} />
						</div>
						<span className="error-text">{this.state.user_feedback}</span>
						<div className="col-xs-12 col-sm-4 col-md-6">
							<div className="float-right">
								<button className="btn-sm btn-success" 
									style={sty.buttonSpace} 
									type="submit" 
									value="Save">
									<i className="fa fa-floppy-o" aria-hidden="true"></i>
									&nbsp;Save</button>
								<button className="btn-sm btn-default" 
									style={sty.buttonSpace}
									onClick={this.cancel}>
									<i className="fa fa-ban" aria-hidden="true"></i>
									&nbsp;Cancel</button>
							</div>
						</div>
					</form>
					<br/>
					
					{this.props.adding}
					</div>
				</div>)
	}
}

//////////////////////////////
//
//   POLL RESPONSE
//
//////////////////////////////

class PollResponse extends Component {
    constructor(props) {
    	super(props);
    		this.state = {
                valid: true,
                addMode: false
        };
        // BIND EVENTS!!!
        this.showAddOpt = this.showAddOpt.bind(this);
        this.cancelAddOpt = this.cancelAddOpt.bind(this);
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
	
	showAddOpt() {
		console.log('add new response func')
		this.setState({ addMode: true });
	}
	cancelAddOpt() {
		// Change
		this.setState({ addMode: false });
	}

    render() {
    	const sty = styles.editPoll;
        return (<div>
        			<div style={sty.responses}>
                    	{this.props.poll.responses.map(this.eachPollResponse)}
                	</div>
                	<div>
                		<button className="btn-sm btn-success"
							style={sty.buttonSpace} 
							onClick={this.showAddOpt}>
							<i className="fa fa-plus" aria-hidden="true"></i>
							&nbsp;New response</button>
						{this.state.addMode ? 
							<NewResponse 
								adding={this.state.addMode} 
								cancel={this.cancelAddOpt}
								saveNew={this.props.addNew} /> : '' }
                	</div>
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
	
	/* update text event (and update state) */
    update = (changedText, id) => {
		if (!changedText.trim()) {
			console.log('TEXT is blank ERROR!!')
			return;
		}
    	let newStateResponses = {...this.state }; // == Object.assign({}, this.state);

	    newStateResponses.poll.responses.forEach((rs) => {
	      if (rs.respID === id) {
	      	// change the record matching the id
	        rs.response = changedText;
	      }
	    })
	    //newStateResponses.user_feedback = ''; 
    	this.setState(newStateResponses);
    	// this.setState({ user_feedback: '' });
	}    
    
	save = (id, updatedText) => {
		console.log('in the save: ', this.state.poll.pollquestion)
		
		let newState = {...this.state };
		// let allResponses = Object.assign([],this.state.poll.responses);
		let updatedResponse = {};
		// TODO: Validation - if voted on already, values should not be changed?
		newState.poll.responses.forEach(function(r) {
			if (r.respID == id) {
				r.response = updatedText;
				console.log('Modified:',r);
				updatedResponse.response = updatedText;
				updatedResponse.respID = r.respID;
				updatedResponse.votes = r.votes;
			}
		})
		updatedResponse.operation = '[UPDATE]';
		console.log(updatedResponse);
	
		this.setState(newState);
        
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
			
			});
        }
        else{
            alert("something wrong with your options.")
        }
	}

	add = (newResponseText) => {
		console.log('add a new option:', newResponseText);
		
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
    		delResponse.operation = '[DELETE]';
			delResponse.respID = id;
    		
			Api.put('/api/polls/' + this.props.params.id, delResponse, (err, response) => {
				if (err) { 
				     console.log("Error: " + JSON.stringify(err)); 
				     return;
				}
				else{
				    console.log("delete succesfully saved" + JSON.stringify(response))
				}
			
			});
        }
        else{
            alert("You must have at least 2 options for a poll.")
        }
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
				        	thePollId={pollID} 
				        	save={this.save}
				        	addNew={this.add}
				        	deleteOpt={this.deleteOption} />
				        <br/>
				        <span>created by {this.state.poll.author}</span>
				</div>
                );
    }
}

export default EditPoll