// render a list of Polls
// a Container component (will perform CRUD)
import React, { Component } from 'react';
import Poll from '../presentation/Poll';
import Api from '../../utils/ApiManager';
import styles from '../layout/styles';


class Polls extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selected: 0,
			list: []
		}
	
	//	this.editPollOption= this.editPollOption.bind(this)
		
	}
	

	
	// override this function
	componentDidMount(){
		
		Api.get('/api/polls', null, (err, response) => {
			if (err) { 
				alert("Error: " + err); 
				return;
			}
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
		console.log('add poll: ' + JSON.stringify(newPoll));
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
	
	// editPollOption() {
	// 	console.log('edit poll option - needed?')
	// 	
	// }
	
	render() {
		const stylePoll = styles.polls;
		const listItems = this.state.list.map((poll, i) =>  {
			return (
				<div key={i} style={stylePoll.pollwd}>
					<Poll currentPoll={poll} currentUser={this.props.curUsr} /> 
				</div>
			)
		});
		return (
			<div style={stylePoll.flexCont}>
				{listItems}
			</div>
	)}
	
 
}

export default Polls;