import React, { Component } from 'react';
var ReactMarkdown = require('react-markdown');

class PageComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            index : this.props.index,
            inner : this.props.data,
            onClick : this.props.clickEvent
        }
    }

    render () {
        console.log(this.state.inner);
        return (
            <div className = 'row' onClick = { this.state.onClick }>
                <div className = 'col-1'>
                </div>
                <div className = 'col-11'>
                    <label> { this.state.inner._source.name } </label>
                    <ReactMarkdown source={this.state.inner._source.text} />
                </div>
            </div>
        )
    }
};

export default PageComponent