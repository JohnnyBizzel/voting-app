import React, { Component } from 'react';

import Api from '../../utils/ApiManager';
import {Link} from 'react-router';




class Inputtext extends Component {
    constructor(){
        super()
              this.state = {
               newresponses :[]
        };
        
    }
    componentWillMount(){
    var responses = this.props.val;
    this.setState({newresponses:responses});
}
    
    

     
    
    render(){
        
            var farr = this.state.responses.map(function(i,index){
                
                return(
                    <div key={index}>
                    <input type="text" value={this.state.responses[i]} />
                    
                    </div>
                    )
                
            })
    
        return (
            {farr}
            
		
	    )
    }
    
}
        
export default Inputtext