import React, { Component } from 'react';
import styles from '../layout/styles';
import {Doughnut} from 'react-chartjs-2';
import Api from '../../utils/ApiManager';
import Chart from 'chart.js';
import {Link} from 'react-router';


class RadioRows extends Component {

    constructor(props) {
         
        super(props);
       // this.responsesfinal=this.responsesfinal.bind(this);
        
    }   
    // responsesfinal() {
    //     this.state.list.responses.map(function(i){
    //         function handleSelect(e) {
    //                         e.preventDefault();
                            
    //                         // TODO not sure how to set state from here:
    //                         alert('You selected: ' + e.target.value);
    //                         //this.setState({radiovalue:e.target.value});
    //                         console.log("previous radio value",this.state.bind(this))
    //                         console.log("new radio value",e.target.value)
                            
    //         }
                        
    //         return (<div className="radio">
    //                     <label><input key={i.key} name="megha" onChange={handleSelect} 
    //                     type="radio" placeholder="bawa" value={i.response}  />
    //                     {i.response}
    //                     </label>
                        
    //                 </div>
    //         )
    //     })
    // }
    
    vote(){  alert('You selected: '+  this.props.resp);
        
        
    }
    
    render(){
        let handleSelector = function handleSelect(e) {
                            e.preventDefault();
                            
                            // TODO not sure how to set state from here:
                            alert('You selected: ' + e.target.value);
                            //this.setState({radiovalue:e.target.value});
                            console.log("previous radio value",this.state.bind(this))
                            console.log("new radio value",e.target.value)
                            
            }
    console.log("Rendering RadioRows");
    console.log(this.props.resp);
            return (
            <div className="responseBox">
                <div className="boldText width25pct"> {this.props.resp} </div>
                <label><input key={this.props.key} name="megha" onChange={handleSelector} 
                        type="radio" placeholder="bawa" value={this.props.resp}  />
                        {this.props.resp}
                        </label>
               <button key={this.props.key} onClick={this.vote.bind(this)}>Vote</button> current score: {this.props.votes}
            </div>
            );

    }
}

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
            radiovalue:""
        };

    }
    componentWillMount(){
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
   



    sendVote(){ console.log("vote TODO")}

    render() {
        var responseList = this.state.list.responses.map(function(i){
            return (
                <RadioRows key={i.key} resp={i.response} votes={i.votes} />
            )
        }.bind(this));
        
        return(<div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <Link to="/">Back</Link>
                            <h2>{this.state.list.pollquestion}</h2>
                                {responseList}
                                <br/>
                                <button onClick={this.sendVote}>Submit</button>
                    </div>

                    <div className="col-md-6">
                        <Doughnut data={this.state.data} />
                    </div>

                </div>
            </div>);
    }
}

export default PollDetails;