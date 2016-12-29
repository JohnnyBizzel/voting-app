// presentational componet
// "use strict"; // maybe need this?
import React, { Component } from 'react';
import styles from '../layout/styles';

var PollDetail = React.createClass({
	getInitialState() {
		return {editing: false}		
	},
	edit() {
		this.setState({editing: true})
	},
	save() {
		this.props.onChange(this.refs.newText.value, this.props.id)
		this.setState({editing: false})
	},
	remove() {
		this.props.onRemove(this.props.id)
	},
	renderForm() {
			return (<div className="pollquestion">
							<input ref="newText" type="text" className="form-control"></input>
							<button onClick={this.save}>Save</button>																	
					</div>)
	},
	renderDisplay() {
			return (<div className="pollquestion">
						<p>{this.props.children}</p>
						<span>
							<button onClick={this.edit}>Edit</button>
							<button onClick={this.remove}>X</button>
						</span>
					</div>)
	},
	render() {
			return (this.state.editing) ? this.renderForm() : this.renderDisplay()								
	}
})		


var PollResponse = React.createClass( {
    getInitialState() {
				return {
					someResponses:  [{ "id":1, "value": "one"},
                                { "id":2, "value":"two"},
                                {"id":3, "value":"half"},
                                {"id":4, "value":"five"}]				
				}
	},
	update() {},
	remove() {},
    eachPollResponse(resp) {
				return (<PollDetail key={resp.id} 
						id={resp.id} 
						onChange={this.update}
						onRemove={this.remove}>
						{resp.value}</PollDetail>)
	},
    render() {
        return (<div className="responses">
                    {this.state.someResponses.map(this.eachPollResponse)}
                </div>
                )
    }
})

class EditPoll extends Component {
    
    render() {
        
        const zoneStyle = styles.zone; // needs to be inside the render func!
        
        return (<div style={zoneStyle.container}>
				    <h4 style={zoneStyle.header}>
				        <a style={zoneStyle.title} href="#">Question</a>
				    </h4>
				        <PollResponse />
				        <br/>
				        <span>by [author] </span>
				</div>
                );
    }
}
// {this.props.currentPoll.pollquestion}
// {this.props.currentPoll.author}
export default EditPoll