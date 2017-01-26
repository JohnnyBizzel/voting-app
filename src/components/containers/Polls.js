// render a list of Polls
// a Container component (will perform CRUD)
import React, { Component } from 'react';
import Poll from '../presentation/Poll';
import Api from '../../utils/ApiManager';


class Polls extends Component {
	constructor() {
		super()
		this.state = {
			selected: 0,
			list: []
		}
	}

	
	// override this function
	componentDidMount(){
		console.log('componentDidMount: ');
		Api.get('/api/polls', null, (err, response) => {
			if (err) { 
				alert("Error: " + err); 
				return;
			}
			
			console.log('RESULTS: ' + JSON.stringify(response.message));
			
			this.setState({
					list: response.message
				});
		});

	}
	
	updatePoll(event){
		let updPoll = Object.assign({},this.state.poll);
		updPoll[event.target.id]=event.target.value;
		this.setState({
		  poll:updPoll
		})
	
	}

	
	addPoll(newPoll){
		console.log('add zone: ' + JSON.stringify(newPoll));
		let thisPoll = Object.assign({}, newPoll);
	
		// Insert
		Api.post('/api/poll', thisPoll, (err, response) => {
			if (err) { alert("Error adding poll: " + JSON.stringify(err)); return;}
			
			console.log('Creating a Poll...' + response);
			let updatedList = Object.assign([], this.state.list);
            updatedList.push(response.result);
            
            this.setState({
                list: updatedList
            })
		})
		


	}
	
	
	render() {
		const listItems = this.state.list.map((poll, i) =>  {
			return (
				<div key={i} className="box">
					<Poll currentPoll={poll} /> 
				</div>
			)
		});
		return (
			<div>
			   {listItems}
			</div>
	)}
	
 
}
// Todo: add this
// 	<CreatePoll onCreate={this.addPoll.bind(this)} />
export default Polls;