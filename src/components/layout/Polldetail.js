// presentational componet
// "use strict"; // maybe need this?
import React, { Component } from 'react';
import styles from '../layout/styles';
import {Doughnut} from 'react-chartjs-2';

import Chart from 'chart.js';

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
};


class Polldetail extends Component {
    
    	constructor() {
		super()
		this.state = {
			selected: 0,
			list: [],
			data:data
		}
	}
     
    
    render() {
        
        //const zoneStyle = styles.zone; // needs to be inside the render func!
        
        return(<div className="container">
        <div className="row">
        <div className="col-md-6">
                <h2> Poll detail page </h2>
                </div>
                <div className="col-md-6">
                <Doughnut data={this.state.data} />
                </div>
                
                </div>
                </div>);
    }
}

export default Polldetail