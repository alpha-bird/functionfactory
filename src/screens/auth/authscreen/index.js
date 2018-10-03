import React, { Component } from 'react';
import {connect} from 'react-redux';
import Radium from 'radium';
import {StyleRoot} from 'radium';

class AuthScreen extends Component {
    render() {
        return (
        // Notice <div style={comStyles().app}> receives its CSS styling from the `comStyles()` function
        // this is what we mean by programatic CSS (via Javascript). See below for `comStyles()`
            <StyleRoot>
                <div style={comStyles().app}>
                    {this.props.children}
                </div>
            </StyleRoot>
        )
    }
}

const RadiumHOC = Radium(AuthScreen);

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

function mapStateToProps(state){
    return {
        auth : state.auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps )(RadiumHOC);

const comStyles = ( ) => {
  
    return {
        // unlike CSS, we cannot use snake-case, and instead must use camelCase
        // and the values in each key-value pair must be wrapped in "quotations", unless we want to use an imported variable
        app: {
            width: "100%",
            height: "100vh",
            margin: "0",
            left: "0",
            top: "0",
            position: "fixed",
            backgroundColor : "#f5f5f5",
        },
    }
}
