import React, { Component } from 'react';


import Api from '../../utils/ApiManager';
import {Link} from 'react-router';
import Inputtext from './Inputtext';
import FontAwesome from 'react-fontawesome';

var pollID = 2;
var newVotesObj ={};

class Editdamnpoll extends Component {
    constructor(){
        super()
              this.state = {
                poll:{
                    pollquestion: 'ankur',
                    author: 'ankur',
                    responses: [1]
                },
                newresponses:[2],
                valid: true
        };
        
    }
    componentWillMount(){
        var urlWithId =this.props.location.pathname;
        pollID = urlWithId.split('/').pop();
        console.log("here's the poll id",pollID)
        Api.get('/api/polls/' + pollID, null, (err, response) => {
            if(err){
                 alert("Error: " + err); 
                
            }
            else{
                
                var newobj = {pollquestion:response.message.pollquestion,author:response.message.author,responses:response.message.responses}
                this.setState({
                    poll:newobj
                    
                });
                var newarr = this.state.poll.responses.map(function(i,index){
                    return i.response
                })
                var tochange = this.state.newresponses;
                this.setState({
                    newresponses:newarr
                })
                console.log("this is only array",this.state.newresponses);
                console.log("conventional responses",this.state.poll.responses)
               
            }
            
        });
        
    }
    
     componentDidMount(){ 
         let isValid = Object.assign({},this.state.valid);
           isValid = JSON.stringify(true)
          this.setState({
                    valid:isValid
                })
     }
    editpoll(){
        newVotesObj = this.state.poll;
        Api.put('/api/polls/' + pollID, newVotesObj, (err, response) => {
            if (err) { 
                 console.log("Error: " + JSON.stringify(err)); 
                 return;
            }
            
            // Success so update the state with the correct scores
            /*
       
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
            yes
            */

        },true);

        
    }
    handleedit(e){
        e.preventDefault();
        console.log("state polls",this.state)
        
        var newVotesObj = Object.assign({},this.state.poll);
        // Trim space characters from the response:
        var trimmedObjResponses = newVotesObj.responses.map(function(item) {
            var respObj = Object.assign({}, item);
            respObj.response = respObj.response.trim();
            return respObj;
        });
        newVotesObj.responses = trimmedObjResponses;
        if(this.state.valid){
                 Api.put('/api/polls/' + pollID, newVotesObj, (err, response) => {
                     console.log("newVotesObj value",newVotesObj)
                    if (err) { 
                         console.log("Error: " + JSON.stringify(err)); 
                         return;
                    }
                    else{
                        alert("your data is succesfully saved" + JSON.stringify(response))
                    }
                 
                 },true);
        }
        else{
            alert("something wrong with your options.")
        }
        
    }
        
        /*
        console.log("this is this here",this)
        console.log("poll.responses",this.state.poll.responses)
        var rarr = this.state.poll.responses;
        var nrarr = this.state.newresponses;
        
        for(var i=0;i<nrarr.length-1;i++){
            
            if(nrarr[i]===rarr[i].response)
            {
                
            }
            else{
                rarr[i].response=nrarr[i];
                rarr[i].votes=0;
            }
            
        }
        
        var farr = Object.assign({},this.state.poll);
        farr.responses=rarr;
        
        this.setState({
            poll:farr
        })
        
        console.log("final state to send",this.state.poll)
        
        */
        
    
    addoption(){
        var harr = Object.assign({},this.state.poll);
        harr.responses.push({response:"",votes:0})
        var karr = this.state.newresponses;
        karr.push(" ");
         this.setState({poll:harr,newresponses:karr});
        
        console.log("harr karr",this.state)
        
        
    }
    deletefun(e){
        e.preventDefault();
        console.log("delete button is clicked")
        console.log("deletefun id",e.target.id)
        var harr = Object.assign({},this.state.poll);
        console.log("harr in deletefunc",harr)
        var ta = harr.responses[e.target.id]
        var ba = harr.responses.filter(function(item,index){
            
            return item !== ta});
            
            harr.responses = ba;
        
        var karr = this.state.newresponses;
        var ga = karr[e.target.id]
        karr = karr.filter(function(item,index){
            
            return item !== ga});
            console.log("ba",ba);
            console.log("karr",karr);
        
        this.setState({poll:harr,newresponses:karr},console.log("ankur"));
        
        console.log("whats the state",this.state)
        
        
        
    }
    
    valuechangetext(e){
        e.preventDefault();
        console.log("this is the id",e.target.id)
        var key = e.target.id;
        let updPoll = Object.assign({},this.state.poll);
        
        updPoll.responses[e.target.id].response=e.target.value
        
        if (e.target.value.trim() != '') {
            var narr = this.state.newresponses;
            narr[key]=e.target.value;
            let truth = true;
            this.setState({
               poll:updPoll,
               newresponses:narr,
               valid: JSON.stringify(truth)
           })    
        } else {
            
            let isValid = false;
            this.setState({
                valid: JSON.stringify(isValid)
            })
        }
        
        
    }
   
        
        
    
    /*
    this.state.newresponses[index]
     
           */
     
    
    render(){
        console.log("render state",this.state)
        console.log("this map",this.state.poll)
        console.log("this is new responses",this.state.newresponses)
        var newarr = this.state.newresponses;
        
       var responseinput =  this.state.newresponses.map(function(i, index){
           return(
               
                <div key={index} >
              
           <input type="text" id={index} onChange={this.valuechangetext.bind(this)} value={i ||''} /> 
           &nbsp; <button className="btn btn-xs btn-danger" onClick={this.deletefun.bind(this)} id={index}  >X</button> <br /><br />
           </div>
               
             
               )
           
        }.bind(this));
        
        
        
        return (
            <div>
            <h2>Edit the poll here!</h2>
            <h4>{this.state.pollquestion}</h4>
            <p>author:{this.state.author}</p>
            <form onSubmit={this.handleedit.bind(this)}>
            {responseinput}
            
            <br/>
            
            <input type="submit" name="submitBtn"  value="Submit Edited Poll"/>
             </form>
             <button onClick={this.addoption.bind(this)}>Add new option</button>
            
            <Link to="/">Back</Link>
            <p>Form valid = {this.state.valid}</p>
            </div>
		
	    )
    }
    
}

        
export default Editdamnpoll