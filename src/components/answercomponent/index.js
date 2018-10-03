import React, { Component } from 'react'

class AnswerComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            index : this.props.index,
            inner : this.props.data,
            onClick : this.props.clickEvent
        }
    }

    render () {
        return (
            <div className = 'row' onClick = { this.state.onClick } key = { this.state.index }>
                <div className = 'col-1'>
                </div>
                <div className = 'col-11'>
                    <label style = {{ fontSize : '1.2rem'}}>Name: {this.state.inner._source.name} </label><br/>
                    <label style = {{ fontSize : '1.2rem'}}>Answer: {this.state.inner._source.text}</label>
                </div>
            </div>
        )
    }
}

export default AnswerComponent