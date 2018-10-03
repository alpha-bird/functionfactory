import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { setUserProfile } from '../../../redux/actions/auth_actions';
import { signInUser, retrieveUserFromLocalStorage } from '../../../api/aws/aws_cognito';
import { setKey } from '../../../api/server_apis';

import {NotificationContainer, NotificationManager} from 'react-notifications';
//import axios from 'axios';

import 'react-notifications/lib/notifications.css';
import './styles.scss';

class Login extends Component {

	constructor(){
		super();

		this.state = {
			email: '',
			password: '',
		};
	}

	componentDidMount(){
		const savedEmail = localStorage.getItem('User_Email');
		
		if( savedEmail ){
			this.setState({
				email: savedEmail
			})
		}

		retrieveUserFromLocalStorage()
			.then((data)=>{
				this.props.setUserProfile(data);//Auto login
				//browserHistory.push('/home');
			});
	}

	handleChange(attr, event){
		this.setState({
			[attr]: event.target.value
		});
	}
/*
	createNotification(type) {
		console.log('notification');
		return () => {
			switch (type) {
				case 'info':
					NotificationManager.info( 'Info message' );
					break;
				case 'success':
					NotificationManager.success( 'Success message', 'Title here' );
					break;
				case 'warning':
					NotificationManager.warning( 'Warning message', 'Close after 3000ms', 3000 );
					break;
				case 'error':
					NotificationManager.error( 'Error message', 'Click me!', 5000 );
					break;
			}
		};
	};
*/
	signin(){
		if ( this.state.email === '') {
			return NotificationManager.error( 'Type your username!', 'Error occured', 3000 );
		}
		else if( this.state.password === '' ) {
			return NotificationManager.error( 'Type your password!', 'Error occured', 3000 );
		}

		signInUser(
			{
				email: this.state.email,
				password: this.state.password
			})
			.then( userProfileObject =>
				{
					localStorage.setItem('User_Email', this.state.email);
					this.props.setUserProfile(userProfileObject);
					setKey();
					NotificationManager.success( 'Login success', 'Alert', 3000 );
					browserHistory.push('/home');
				})
			.catch((err)=>{
				console.log('Sign in failed!');
				NotificationManager.error( 'Login failed!', 'Error occured', 5000 );
			});
	}

	render(){
		return (
			<div className = 'mainView'>
				<img src='../../../res/images/logo.png' className = 'logo' alt = 'logo.png'/>

				<div className = 'row'>
					<label className = 'avenir-black' style = {{ color : '#46B2ED', fontSize : '2.3rem' }} >Slipstream</label>
					<label className = 'avenir-roman' style = {{ color : '#037CBE', fontSize : '2.3rem' }} >.cloud</label>
				</div>

				<div className = 'row'>
					<div className = 'loginForm mt-3'>
						<label className = 'avenir-medium' style = {{ fontSize : '2.2rem', color : '#8C8C8C' }} >Login</label>
						
						<input type = 'email' value = { this.state.email } onChange={this.handleChange.bind(this, 'email')} className = 'form-control loginInput mt-4' aria-describedby="emailHelp" placeholder="Email Address" />
						<input type = 'password' value = { this.state.password } onChange={this.handleChange.bind(this, 'password')} className = 'form-control loginInput mt-3' aria-describedby="emailHelp" placeholder="Password" />

						<div className = 'loginHelpContainer mt-4'>
							<label className = 'avenir-medium clickable' style = {{ color : '#84CCF3' }} onClick = { () => { browserHistory.push('/auth/forgot_password'); } } >Forgot your password?</label>
							<label className = 'avenir-medium' style = {{ color : '#C2C2C2', marginLeft : 10, marginRight : 10 }} > | </label>
							<label className = 'avenir-medium clickable' style = {{ color : '#84CCF3' }} onClick = { () => { browserHistory.push('/auth/signup'); } } >Register</label>
						</div>

						<div>
							<div className = 'loginButton mt-4' onClick={ this.signin.bind(this) }>
								<label className = 'avenir-medium mb-0' style = {{ color : 'white', fontSize : '1rem' }}>Sign In</label>
							</div>
						</div>
					</div>
				</div>
				<NotificationContainer/>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        setUserProfile : prof => dispatch(setUserProfile( prof ))
    };
}

function mapStateToProps(state){
	return {
	}
}

export default connect( mapStateToProps, mapDispatchToProps )( Login );
