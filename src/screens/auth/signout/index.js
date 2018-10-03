import React, {Component} from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Radium from 'radium';

import { signOutUser } from '../../../redux/actions/auth_actions';

class SignOut extends Component {

	componentWillMount(){
		// signoutLandlord() is a function from `actions` coming from index.js
		this.props.signoutLandlord()
		setTimeout(()=>{
			browserHistory.push('/login')
		}, 500)
	}

	render() {
		return (
			<div style={comStyles().background}>
				<div style={comStyles().goodbye}>Sorry to see you go...</div>
			</div>
		)
	}
}

const RadiumHOC = Radium(SignOut);

function mapStateToProps(state){
	return {
	}
}

function mapDispatchToProps(dispatch){
	return {
		dispatch,
		signOutUser : dispatch(signOutUser)
	};
}

export default connect(mapStateToProps, mapDispatchToProps )( RadiumHOC );

const comStyles = () => {
	return {
		background: {
			width: "100%",
			height: "100%",
			margin: "0",
			left: "0",
			top: "0",
			display:"flex",
			justifyContent: "center",
			backgroundColor : "#f5f5f5"
		},
		goodbye: {
			fontSize: "1.2rem",
			fontWeight: "bold",
			color: "white",
			margin: "auto"
		}
	}
}
