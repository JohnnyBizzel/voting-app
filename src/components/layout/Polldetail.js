// presentational componet
// "use strict"; // maybe need this?
import React, { Component } from 'react';
import styles from '../layout/styles';
import {Doughnut} from 'react-chartjs-2';
import Api from '../../utils/ApiManager';
import Chart from 'chart.js';
import {Link} from 'react-router';


const data = {
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
    ,json :{ "id": "test"}
};

class RadioRow extends Component {

    constructor(props) {
       super(props);
    }   
    
    
    render(){
        this.state.list.responses.map(function(i){
            return (
            <div>
            
             <input key={i.key} name="megha" type="radio" placeholder="bawa" />{i}<br />
               
            </div>
            );
         });
        // return (
        //      <div>
            
        //      <input defaultValue="{i}" name="megha" type="radio" onChange={this} placeholder="bawa" />{i}<br />
               
        //      </div>
        //      )
    }
}

class Polldetail extends Component {

    constructor() {


        super();
        this.radiofunc = this.radiofunc.bind(this);
        this.eachPollResponse = this.eachPollResponse.bind(this);
  this.vote = this.vote.bind(this);
        this.state = {
            selected: 0,
            list: {
                    responses: []
                   },
            data:data,
            radiovalue:""
        };

    }
  //   componentWillMount(){

  //   console.log("component will mount")
  //   console.log('componentDidMount (Polldetail): ' + this.props.location.pathname);

        // //console.dir(this.props);
        // var urlWithId =this.props.location.pathname;
        // var pollID = urlWithId.split('/').pop();
        // Api.get('/api/polls/' + pollID, null, (err, response) => {
        //     if (err) { 
        //         alert("Error: " + err); 
        //         return;
        //     }

        //     console.log('RESULTS: ' + JSON.stringify(response.message));

        //     this.setState({
        //             list: response.message
        //         });
        // });

  //   }


    componentWillMount(){
        console.log('componentDidMount (Polldetail): ' + this.props.location.pathname);

        //console.dir(this.props);
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

            data.json = response.message;
            console.log("responses are ",this.state.list.responses)
        });


    }
    vote(){
        console.log("button clicked")
        return ;

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
        console.log(this); // React Component instance
    }

    render() {

        //const zoneStyle = styles.zone; // needs to be inside the render func!
        //cool
        //<input defaultValue="{i}" name="megha" type="radio" onChange={this.radiofunc.bind(this)} placeholder="bawa" />{i}<br />
        //<button type="button" key={i.key} >{i}</button>
        // onClick={this.radiofunc.bind(this)}
         const responsesfinal = 
                 this.state.list.responses.map(function(i) {
                        function handleSelect(e) {
                            e.preventDefault();
                            alert('You selected: ' + e.target.value);
                            this.setState({radiovalue:e.target.value});
                        }
                        //var isSelected = this.state.selected;
                    return (
                    <div>
                    
                     <input key={i.key} name="megha" onChange={handleSelect} type="radio" placeholder="bawa" value={i}  />{i}<br />
                       
                    </div>
                    );
         });


// TODO add ...{responsesfinal}
//              {this.state.list.responses.map(item => 
//                            <RadioRow key={item.id} name={item.name} />)} 

/* 
<div onClick={this.handleClick.bind(this)}>TEST
                        </div>
                        */

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

                </div>
            </div>);
    }
}

export default Polldetail;