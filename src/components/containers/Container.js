

import React, { Component } from 'react';
import Home from '../layout/Home.js';

export default class Container extends Component {

    render() {
        return (
            <div>
            
               {this.props.children}
            </div>
        )
    }
}