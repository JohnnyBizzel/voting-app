

import React, { Component } from 'react';
import {PropTypes as T} from 'react';
import { Jumbotron } from 'react-bootstrap'
import Home from '../layout/Home.js';

export default class Container extends Component {

    render() {
           let children = null;
           if (this.props.children) {
           children = React.cloneElement(this.props.children, {
           auth: this.props.route.auth //sends auth instance from route to children
               })
            }

        return (
            <div>
            
               {children}
            </div>
        )
    }
}