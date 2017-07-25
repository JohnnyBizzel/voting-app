import React, { Component, PropTypes } from 'react';
import styles from '../layout/styles';
import {Doughnut} from 'react-chartjs-2';
import Api from '../../utils/ApiManager';
import Chart from 'chart.js';
import {Link} from 'react-router';
import EditPoll from '../presentation/EditPoll';

var pollidagain;
class RadioRows extends Component {

    constructor(props) {
         
        super(props);
        this.state = {
            currentVoteResponse: '',
            currentPollId: this.props.pollId
        }
    }   
   

    render(){
            return (
            <div key={this.props.index} className="responseBox">
                <span className="float-right">
                    current score: {this.props.votes}
                </span>
                <label><input  name="radiobtns" 
                        type="radio" 
                        value={this.props.resp}
                        />&emsp;{this.props.resp}
                </label>
            </div>
            );

    }
   
}


RadioRows.propTypes = {
  resp: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired
};

class PollDetails extends Component {

    constructor() {

        super();

        this.state = {
            selected: -1,
            editVisible: true,
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
                    data: [60 ,60, 60],
                    backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#A1CF1F'
                    ],
                    hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#A1CF1F'
                    ]
                }]
            }
        };

        this.handleNewVote = this.handleNewVote.bind(this);
    }
    componentDidMount(){
        console.log('componentDidMount (Polldetail): ' + this.props.location.pathname);
        var urlWithId =this.props.location.pathname;
        
        var pollID = urlWithId.split('/').pop();
        pollidagain =pollID;
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
          //  const numResponses = this.state.list.responses.length;
          
            let colorsArray = []
            colorsArray = this.state.list.responses.map(function(respColor) {
                      return "rgb(" + Math.floor(Math.random()*255) +","+
                            Math.floor(Math.random()*255) + ","+
                            Math.floor(Math.random()*255) + ")";
            //     return ["'rgb(" + Math.floor(Math.random()*255) + ","+
            //                       Math.floor(Math.random()*255) + "," +
            //                       Math.floor(Math.random()*255) + ")'"]
            })
            
            // [
            //             '#DB6384',
            //             '#36EBA2',
            //             '#FFCE56',
            //             '#1AAE56'
            //             ]
            var newElement =  {
                        data: votesSoFar,
                        backgroundColor: colorsArray,
                        hoverBackgroundColor: colorsArray
                    };
            myData.push(newElement);
            myData.shift();
            this.setState(this.state.data.datasets = (myData));
            this.setState(this.state.data.labels = respLabels);
        });
        

    }
    deletefunc(){
        console.log("deletefunc this",this)
        console.log('deletefunc pathname: ' + this.props.location.pathname);
        console.log("pollidagain value",pollidagain)
        
        Api.del('/api/polls/' + pollidagain, null, (err, response) => {
            if (err) { 
                alert("Error: " + err); 
                return;
            }
            else if(err==null&&response==null)
        
            {
                console.log("everything went well")
            }
            else{
                console.log("I dont know what happene")
            }
        
        })
        
    }
   
    handleNewVote(e) { 
        e.preventDefault();
        //set something in storage to check on what polls user already voted.
    //     //currentPollId
    //   if (typeof(Storage) !== "undefined") {
    // // Code for localStorage/sessionStorage.
    //     this.localStorage.setItem("lastname", "Smith");
    //   } else {
    // // Sorry! No Web Storage support..
    //   }
        
  
        var form = e.target
        var selectedRadio = form.elements.radiobtns.value
        var pollId = this.state.list._id

        let updatedList = Object.assign([], this.state.list);
        let chartValues = Object.assign({}, this.state.data);
        var idx = this.state.list.responses.findIndex(function(elem) { 
                                    return elem.response == selectedRadio;});
        var totalVotes = this.state.list.responses[idx].votes + 1;
        var newVotesObj = { response: selectedRadio, votes: totalVotes};
       
        // call API - update poll
        Api.put('/api/polls/' + pollId, newVotesObj, (err, response) => {
            if (err) { 
                 console.log("Error: " + JSON.stringify(err)); 
                 return;
            }
            
            // Success so update the state with the correct scores
       
            var listLen = updatedList.responses.length;
            for (let i = 0; i < listLen; i++) {
                if (updatedList.responses[i]['response'] == selectedRadio)
                    updatedList.responses[i]['votes'] = totalVotes;
            }
            
            // Get doughnut to re-draw chart. (using a data store?)
            var votesSoFar = updatedList.responses.map(function(rv) { return rv.votes; });
            chartValues.datasets[0].data = votesSoFar
            this.setState({ 
              data: chartValues,
              list: updatedList
            });
            

        });

        
    }
   
    render() {
        let responseList = this.state.list.responses.map(function(item, index){
            return (
                <RadioRows  key={index} 
                pollId={this.state.list._id} resp={item.response} votes={item.votes} />
            )
        }.bind(this)); 
  
        return(<div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/">Back</Link>
                                <h2>{this.state.list.pollquestion}</h2>
                                    <form onSubmit={this.handleNewVote}>
                                        {responseList}
                                    </form>
                                    <div className="col-xs-12 text-center">
                                        <input type="submit" name="submitBtn"  value="Cast your vote"/>
                                        <button onClick={() => this.deletefunc()} type="button">Delete</button>
                                        <button className="btn btn-primary"><Link to={`/editdamnpoll/${pollidagain}`}>Edit the damn  Poll </Link> </button>
                                    </div>
                        </div>
                        <div className="col-md-6">
                            <Doughnut data={this.state.data} />
                        </div>
                    </div>
                   
                
                </div>);
    }
}

export default PollDetails;