import React, { Component, PropTypes } from 'react';
import styles from '../layout/styles';
import {Doughnut} from 'react-chartjs-2';
import Api from '../../utils/ApiManager';
import Chart from 'chart.js';
import {Link} from 'react-router';
import EditPoll from '../presentation/EditPoll';

var pollidagain;


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

        this.submit = this.submit.bind(this);
    }
    
    componentDidMount(){
 
        var urlWithId =this.props.location.pathname;
        
        var pollID = urlWithId.split('/').pop();
        pollidagain =pollID;
        Api.get('/api/polls/' + pollID, null, (err, response) => {
            if (err) { 
                alert("Error: " + err); 
                return;
            }
        

            this.setState({
                    list: response.message
                });


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

        Api.del('/api/polls/' + pollidagain, null, (err, response) => {
            if (err) { 
                alert("Error: " + err); 
                return;
            }
            else
            {
                // TODO DELETE Poll
                console.log("DELETE: No errors.")
            }
        
        })
        
    }
   
    submit(e) { 
        // Time to handleNewVote
        e.preventDefault();
        
        // TODO : set something in storage to check on what polls user already voted.
    //     //currentPollId
    //   if (typeof(Storage) !== "undefined") {
    // // Code for localStorage/sessionStorage.
    //     this.localStorage.setItem("lastname", "Smith");
    //   } else {
    // // Sorry! No Web Storage support..
    //   }
        
  
        var form = e.target;
        const selectedRadio = form.elements.radiobtns.value;
        const pollId = this.state.list._id;

        let updatedList = Object.assign([], this.state.list);
        let chartValues = Object.assign({}, this.state.data);
        console.log(this.state.list.responses);
        const idx = this.state.list.responses.findIndex(function(elem) { 
                                    return elem.response == selectedRadio;});
        console.log(idx);
        if (idx < 0) {
            // No option selected
            return;
        }
        const totalVotes = this.state.list.responses[idx].votes + 1;
        const rId = this.state.list.responses[idx].respID;
        let newVotesObj = { respID: rId, response: selectedRadio, 
                            votes: totalVotes,
                            operation: '[UPDATE]'
        };
       
        
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
            chartValues.datasets[0].data = votesSoFar;
            
            this.setState({ 
              data: chartValues,
              list: updatedList
            });
            

        });

        
    }
    // TODO improve vote button style
   
    render() {
        let responseList = this.state.list.responses.map(function(item, index){
            return (
                <div key={index} className="responseTableRow">

                    <table className="responseTable">
                    <tr>
                        <td>
                            <input name="radiobtns" 
                                type="radio" 
                                value={item.response}
                                />&emsp;{item.response}
                        </td>
                        <td>
                            <span className="score float-right">
                                {item.votes}
                            </span>
                        </td>
                    </tr>
                    </table>
                </div>
            );
        }.bind(this)); 
  
        return(
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <h2>{this.state.list.pollquestion}</h2>
                    <form onSubmit={this.submit}>
                        <div className="gridWrapper">
                            <div className="responseHeaderRow">
                             <span className="float-right">Score</span>
                                Option 
                            </div>
                            {responseList}
                        </div>
                        <div className="col-xs-12 text-center">
                           <input type="submit" 
                            className="btn-sm"
                            value="Vote"/>
                        </div>
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