// render a list of Polls
// a Container component (will perform CRUD)
//"use strict"; // maybe need this?
import React, { Component } from 'react';
import Poll from '../presentation/Poll';
// import CreateZone from '../presentation/CreateZone';
import Api from '../../utils/ApiManager';

//var tempList = [1,2,3];

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
	
		// /*superagent
		// 	.get('api/zone')
		// 	.query(null)
		// 	.set('Accept', 'application/json')
		// 	.end((err, response) => {
		// 		if (err) { alert("Error: " + err); return;}
		// 		console.log(JSON.stringify(response.body));
				
		// 		let results = response.body.message;
				
		// 		this.setState({
		// 			list: results
		// 		})
		// 	})
		// */
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
		// set ZipCodes to be an array - break up the string
		// if(updatedZone.zipCodes.indexOf(';') > -1) {
		// 	updatedZone['zipCodes'] = updatedZone.zipCodes.split(',');
		// } else {
		// 	updatedZone['zipCodes'] = updatedZone.zipCodes;
		// }
		
		
		Api.post('/api/poll', thisPoll, (err, response) => {
			if (err) { alert("Error: " + err); return;}
			
			console.log('Creating a Poll...' + response);
			let updatedList = Object.assign([], this.state.list);
            updatedList.push(response.result);
            
            this.setState({
                list: updatedList
            })
		})
		
		// This adds a Zone to the local state
		/*let updatedList = Object.assign([], this.state.list);
		updatedList.push(this.state.zone);
		this.setState({
			list: updatedList
		})*/

	}
	
	
	render() {
//	

		const listItems = this.state.list.map((poll, i) =>  {
			return (
				<li key={i}>
					<Poll currentPoll={poll} /> 
				</li>
			)
		});
		return (
			<div>
				<ol>
				   {listItems}
				</ol>
				
			
			</div>
	)}
	
 
}
// Todo: add this
// 	<CreatePoll onCreate={this.addPoll.bind(this)} />
export default Polls;