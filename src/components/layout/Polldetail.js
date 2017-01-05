import React, { Component } from 'react';
import styles from '../layout/styles';
import {Doughnut} from 'react-chartjs-2';
import Api from '../../utils/ApiManager';
import Chart from 'chart.js';
import {Link} from 'react-router';


// class RadioRow extends Component {

//     constructor(props) {
//       super(props);
//     }   
    
    
//     render(){
//         this.state.list.responses.map(function(i){
//             return (
//             <div>
            
//              <input key={i.key} name="megha" type="radio" placeholder="bawa" />{i}<br />
               
//             </div>
//             );
//          });
     
//     }
// }

class Polldetail extends Component {

    constructor() {


        super();
        this.radiofunc = this.radiofunc.bind(this);
        this.eachPollResponse = this.eachPollResponse.bind(this);
        this.handleClick=this.handleClick.bind(this);
        
  
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
        });
    }
   
    radiofunc(e) {
        console.log("awesome");
        console.log("something from rado button",event.target.value);
        this.setState({radiovalue:event.target.value});

    }
    //because this is not a pure function, we need to bind this eachPollresponse function also
    eachPollResponse(resp) {
                return 
    }

    handleClick() {
        console.log("Chart data: " + this.state.data.datasets); 
        var myData = this.state.data.datasets;
        var random = [Math.random()*5,Math.random()*16,Math.random()*9];
        var newElement =  {
                    data: random,
                    backgroundColor: [
                    '#DB6384',
                    '#36EBA2',
                    '#FFCE56'
                    ],
                    hoverBackgroundColor: [
                    '#DB6384',
                    '#36EBA2',
                    '#FFCE56'
                    ]
                };
        myData.push(newElement);
        myData.shift();
        this.setState(this.state.data.datasets = (myData));
      
      //this.setState({this.state.data.datasets[0].data=myData})
    }
    

    render() {
        
        const responsesfinal = this.state.list.responses.map(function(i){
            function handleSelect(e) {
                            e.preventDefault();
                            
                            // TODO not sure how to set state from here:
                            alert('You selected: ' + e.target.value);
                            //this.setState({radiovalue:e.target.value});
            }
                        
            return (<div className="radio">
                        <label><input key={i.key} name="megha" onChange={handleSelect} 
                        type="radio" placeholder="bawa" value={i.response}  />
                        {i.response}
                        </label>
                        
                    </div>
            )
        })
     
     


        return(<div className="container">
                <div className="row">
                    <div className="col-md-6">
                    <Link to="/">Back</Link>
                        <h2>{this.state.list.pollquestion}</h2>
                      {responsesfinal}
                        <button onClick={this.vote}>Submit</button>

                        </div>

                    <div className="col-md-6">
                        <Doughnut data={this.state.data} />
                    </div>
                    <div onClick={this.handleClick.bind(this)} 
                        className="btn btn-warning">Change Chart (dummy data)</div>

                </div>
            </div>);
    }
}

export default Polldetail;