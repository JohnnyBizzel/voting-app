// presentational componet
// "use strict"; // maybe need this?
import React, { Component } from 'react';
import styles from '../layout/styles';

class PollDetail extends React.Component {
	
	constructor(props) {
    	super(props);
    		this.state = {
    			editing: false, 
				editText: props.children
    		}
    
    }
    
	save(event) {
	//	this.props.update(this.refs.newText.value, this.props.response)
		event.preventDefault();
		this.setState({editText:event.target.value})

	}
	submit(event) {
		event.preventDefault();
		alert("Current state: " + this.state.editText)
		this.setState({editing: false})
		  // call API - update poll
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
			return (<div className="responseBox">
						<p>{this.props.children}</p>
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
    			someResponses: [],
    			typed: ''
    		}
    }
    

    eachPollResponse(resp) {
 
		const remove = () => {} 
		return (<PollDetail key={resp.response} 
				id={resp.response}   onRemove={remove} 
	             >
				{resp.response}</PollDetail>)
	}
  

    render() {
        return (<div className="responses">
        			
        You typed: <code>{this.state.typed}</code>
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
    constructor(props) {
    	super(props)
    	
    }
    update(newText, id) {
		var updatedResponses = this.state.someResponses.map(
						response => (response.response !== response) ? 
											response: { ...response,
														response: newText }
						)
				this.setState({updatedResponses})
	}
    
    render() {

        const zoneStyle = styles.zone; // needs to be inside the render func!
        
        return (<div style={zoneStyle.container}>
				    <h4 style={zoneStyle.header}>
				        <a style={zoneStyle.title} href="#">{this.props.question}</a>
				    </h4>
				        <PollResponse onChange={this.update} someResponses={this.props.someResponses} />
				        <br/>
				        <span>created by {this.props.author}</span>
				</div>
                );
    }
}

export default EditPoll