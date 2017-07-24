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
				editText: props.children,
				selectedID: props.id
    		}
    		
    	this.changeText = this.changeText.bind(this);
    
    }
  
	edit() {
		this.setState({editing: true, editText:''})
	}
	changeText(event) {
			//var responseOption = this.state.editText;
			console.log('text changing:', event.target.value)
			console.log('text response ID:', this.props.id)
			this.props.changetext(event.target.value, this.props.id)
	}
	
	submit = (event) => {
		event.preventDefault();
		//this.setState({editText:event.target.value})
		console.log(event);
		//this.props.onSubmit()
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
// PollDetail.propTypes = {
// 	submit: React.PropTypes.func.isRequired
// }

		

class PollResponse extends Component {
    constructor(props) {
    	super(props);
    		// this.state = {
    		// 	pollResponses: '',
    		// 	typed: '',
    		// 	editing:false
    		// }
    		this.state = {
                // poll:{
                //     pollquestion: '',
                //     author: '',
                //     responses: [1]
                // },
                newresponses:[2],
                valid: true
        };
    }

	
	submit = (id) => (event) => {
		event.preventDefault();
		alert("Current event: " + event.target.value)
		this.setState({editing: false})
		let newVotesObj = Object.assign({},this.state.poll);
		console.log("update " + event.target.value + " ID : "+ id );
        // Trim space characters from the response:
        var trimmedObjResponses = newVotesObj.responses.map(function(item) {
            var respObj = Object.assign({}, item);
            respObj.response = respObj.response.trim();
            return respObj;
        });
        newVotesObj.responses = trimmedObjResponses;
        if(this.state.valid){
			Api.put('/api/polls/' + this.props.thePollId, newVotesObj, (err, response) => {
				console.log("newVotesObj value",newVotesObj)
				if (err) { 
				     console.log("Error: " + JSON.stringify(err)); 
				     return;
				}
				else{
				    alert("your data is succesfully saved" + JSON.stringify(response))
				}
			
			},true);
        }
        else{
            alert("something wrong with your options.")
        }
	}
	
	// bound function - renders each answer - PollDetail component
    eachPollResponse = (resp) => {
 
    console.log('Render response component',resp);
    
		const remove = () => {} ;
		// onChange={this.props.save(resp.respID)}
		return (<PollDetail key={resp.respID} 
				id={resp.respID} onSubmit={this.submit(resp.respID)} 
				changetext={this.props.onChange}
				editMode={this.state.editing} 
				onRemove={remove} respText={resp.response}>
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
	someResponses: [{ _id:1, response: "one"},
                    { _id:2, response:"two"},
                    { _id:3, response:"half"},
                    { _id:4, response:"five"}]		
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
    }
    
    componentDidMount(){
        //var urlWithId =this.props.location.pathname;
        //let pollID = this.props.params.id;
        // pollID = urlWithId.split('/').pop();
        console.log("here's the poll id",this.props.params.id)
        Api.get('/api/polls/' + this.props.params.id, null, (err, response) => {
            if(err){
                 alert("Error: " + err); 
                
            }
            else{
                console.log(response.message)
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
                
                console.log("Api GET Loading responses:",this.state.poll.responses)
               
            }
            
        });
         let isValid = Object.assign({},this.state.valid);
           isValid = JSON.stringify(true)
          this.setState({
                    valid:isValid
                })
        
    }
    
    	// TODO: Fix this!!
	save = (id) => (event) => {
		event.preventDefault();
		// let newVotesObj = Object.assign({},this.state.poll);
		console.log("update " + event.target.value + " ID : "+ id );
	
		let newResponsesObj = Object.assign([],this.state.poll.responses);
		
		newResponsesObj.forEach(function(r) {
			if (r.respID == id) {
				r.response = event.target.value.trim();
			}
		})
		console.log(newResponsesObj);
		this.setState({
                    poll:{
	                    responses: newResponsesObj
                    }
                })
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
				        <a style={zoneStyle.title} href="#">{this.state.poll.pollquestion}</a>
				    </h4>
				        <PollResponse onChange={this.update} poll={this.state.poll} thePollId={pollID} 
				        save={this.save} />
				        <br/>
				        <span>created by {this.state.poll.author}</span>
				</div>
                );
    }
}

export default EditPoll