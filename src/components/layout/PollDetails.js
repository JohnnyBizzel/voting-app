import React, { Component, PropTypes } from 'react';
import styles from '../layout/styles';
import {Doughnut} from 'react-chartjs-2';
import Api from '../../utils/ApiManager';
import Chart from 'chart.js';
import {Link} from 'react-router';

class RadioButtons extends Component {
    
    
}

class RadioRows extends Component {

    constructor(props) {
         
        super(props);
        this.state = {
            currentVoteResponse: '',
            currentPollId: this.props.pollId
        }
    }   
   
    // userVote(){  
    //     console.log('You selected: 12-13 ID ='+ this.props.pollId + ' RESP='  + ' this.props.resp=' +  this.props.resp);
    //     var resp = this.props.resp;
    //     /* Api.put('/api/polls/' + resp, null, (err, response) => {
    //         if (err) { 
    //             alert("Error: " + err); 
    //             return;
    //         }
    //       */  

    // }
    
    // update() {
    //     console.log("Updated: " + this.props.resp + " key=" + this.props.pollId);
    // }
    render(){
   
        
            return (
            <div key={this.props.index} className="responseBox">
                
                <label><input  name="radiobtns" 
                        
                        type="radio" 
                        placeholder="bawa" 
                        value={this.props.resp}
                        />
                            &emsp;{this.props.resp}
                        </label>&emsp;
                current score: {this.props.votes}
            </div>
            );
//onClick={this.userVote.bind(this)}
    }
    
  
}


RadioRows.propTypes = {
  resp: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
 // userVote: PropTypes.func.isRequired
};
/*
 let handleSelector = function handleSelect(e,f) {
                            //e.preventDefault();
                            
                            // TODO not sure how to set state from here:
                            alert(e + 'You selected: ' + f);
                            //this.sendVote(e, f)
                            //this.setState({radiovalue:e.target.value});
                            console.log("previous radio value",this.state.bind(this))
                            console.log("new radio value",e.target.value)
                            
            }
*/

  // () => this.sendVote(this.props.pollId, this.props.resp)
    
    // <div className="boldText width25pct"> {this.props.resp} </div>
    //  <button key={this.props.key} onClick={this.vote.bind(this)}>Vote</button> (not needed)
    
class PollDetails extends Component {

    constructor() {

        super();

        this.state = {
            selected: 0,
            list: {
                    responses: []
                   },
            data: {
                labels: [
                    'Red',
                    'Green',
                    'Yellow'
                ],
                datasets: [{
                    data: [300, 50, 100],
                    backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                    ],
                    hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                    ]
                }]
            },
            currentVoteResponse: ''
        };

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }
    componentDidMount(){
        console.log('componentDidMount (Polldetail): ' + this.props.location.pathname);
        var urlWithId =this.props.location.pathname;
        var pollID = urlWithId.split('/').pop();
        Api.get('/api/polls/' + pollID, null, (err, response) => {
            if (err) { 
                alert("Error: " + err); 
                return;
            }
        
            console.log('This particular polldetail RESULTS: ' + JSON.stringify(response.message));
        
            this.setState({
                    list: response.message
                });
        
            
            console.log("responses are ",this.state.list.responses)
            
            // update chart
            var myData = this.state.data.datasets;
            var votesSoFar = this.state.list.responses.map(function(rv) { return rv.votes; });
            var respLabels = this.state.list.responses.map(function(r) { return r.response; });
            
            // TODO :  create an array of random colours for the chart.
            
            var newElement =  {
                        data: votesSoFar,
                        backgroundColor: [
                        '#DB6384',
                        '#36EBA2',
                        '#FFCE56',
                        '#1AAE56'
                        ],
                        hoverBackgroundColor: [
                        '#DB6384',
                        '#36EBA2',
                        '#FFCE56',
                        '#1AAE56'
                        ]
                    };
            myData.push(newElement);
            myData.shift();
            this.setState(this.state.data.datasets = (myData));
            this.setState(this.state.data.labels = respLabels);
        });
        

    }
   



    handleFormSubmit(e, childData) { 
        // call API
        e.preventDefault();
        //Api.put()
        var form = e.target
        var selectedRadio = form.elements.radiobtns.value
        var pollId = this.state.list._id
        console.log("vote " + pollId + ' : response was: ' + selectedRadio);
        
    }
    
    // castVote={this.sendVote(this.state.list._id,item.response)} 
    selectItem(currentVoteResponse) {
        this.setState({currentVoteResponse})
    }

        // onClick={this.handleChildClick.bind(null,item)}
    render() {

        let responseList = this.state.list.responses.map(function(item, index){
            return (
                <RadioRows  key={index} 
                pollId={this.state.list._id} resp={item.response} votes={item.votes} />
            )
        }.bind(this)); // bind the onClick handle event
        // <button onClick={this.handleChildClick}>Submit</button>
        return(<div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <Link to="/">Back</Link>
                            <h2>{this.state.list.pollquestion}</h2>
                            <form onSubmit={this.handleFormSubmit}>
                                {responseList}
                                <br/>
                                
                                 <input type="submit" name="submitBtn"  value="Cast your vote"/>
                            </form>
                    </div>

                    <div className="col-md-6">
                        <Doughnut data={this.state.data} />
                    </div>

                </div>
            </div>);
    }
}


export default PollDetails;