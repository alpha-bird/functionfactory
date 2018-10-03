import React, { Component } from 'react';
import { connect } from 'react-redux';

import { browserHistory } from 'react-router';

import { forgotPassword } from '../../../api/aws/aws_cognito';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import 'react-notifications/lib/notifications.css';

class ResetPassword extends Component {

	constructor(){
		super()
		this.state = {
			email: '',
			password: '',
			confirm_password: '',
			pin: '',
			cognitoUserPackage: false,
			errorMessage: null,
			loading: false
		}
	}

	handleChange(attr, event){
		this.setState({
			[attr]: event.target.value
		})
	}

	sendVerificationEmail(){
		this.setState({loading:true});
		
		if( this.state.email === '' ) {
			return NotificationManager.error( 'Input your email!', 'Error occured', 5000 );
		}

		forgotPassword(this.state.email)
			.then((cognitoUserPackage)=>{
				NotificationManager.success( 'Sending Reset email successed!', 'Alert', 2000 );
				setTimeout( 
					() => { this.setState({
								cognitoUserPackage: cognitoUserPackage,
								loading: false
							}); 
						}, 
					2000 );
			})
			.catch((err)=>{
				this.setState({
					errorMessage: err.message,
					loading: false
				});
				console.log(err.message);
				return NotificationManager.error( 'Sending reset email failed!', 'Error occured', 5000 );
			})
	}

	verifyPin(){
		if(this.props.password === this.props.confirm_password){
			this.state.cognitoUserPackage.cognitoUser
				.confirmPassword(this.state.pin, this.state.password, this.state.cognitoUserPackage.thirdArg);
			setTimeout(()=>{
				browserHistory.push("/auth/login")
			}, 500);
		}
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
					{
						this.state.cognitoUserPackage ?

						<div className = 'mt-4' style = {{ display: 'flex', flexDirection : 'column', alignItems : 'center' }}>
							<label 
								className = 'avenir-medium' 
								style = {{ color : 'white', fontSize : '1.3rem', width : '100%' }}>
								Verification PIN
							</label>
							<input 
								value={this.state.pin}
								onChange={this.handleChange.bind(this, 'pin')} 
								className = 'form-control loginInput avenir-medium mt-3' 
								style = {{ width : 400 }} />

							<label 
								className = 'avenir-medium mt-3' 
								style = {{ color : 'white', fontSize : '1.3rem', width : '100%' }}>
								New Password
							</label>
							<input 
								value={this.state.password}
								onChange={this.handleChange.bind(this, 'password')} 
								className = 'form-control loginInput avenir-medium mt-3' 
								style = {{ width : 400 }} />

							<label 
								className = 'avenir-medium mt-3' 
								style = {{ color : 'white', fontSize : '1.3rem', width : '100%' }}>
								Confirm Password
							</label>
							<input 
								value={this.state.confirm_password}
								onChange={this.handleChange.bind(this, 'confirm_password')} 
								className = 'form-control loginInput avenir-medium mt-3' 
								style = {{ width : 400 }} />
							
							<button 
								type = "button" 
								className = "btn btn-primary mt-3 avenir-medium" 
								style = {{ width : '100%', fontSize : '1.3rem' }} 
								onClick={this.verifyPin.bind(this)}>
								Change Password
							</button>

							<label 
								className = 'avenir-medium clickable mt-4' 
								style = {{ color : 'white', fontSize : '1.3rem' }}
								onClick = {() => { browserHistory.push('/auth') }}>
								Back to Login
							</label>
						</div>

						:

						<div className = 'mt-4'  style = {{ display: 'flex', flexDirection : 'column', alignItems : 'center' }}>
							<input 
								type = 'email' 
								value={this.state.email}
								onChange={this.handleChange.bind(this, 'email')} 
								className = 'form-control loginInput avenir-medium' 
								style = {{ width : 400 }}
								aria-describedby="emailHelp" 
								placeholder="Email Address" />
							<button 
								type = "button" 
								className = "btn btn-primary mt-3 avenir-medium" 
								style = {{ width : '100%', fontSize : '1.3rem' }}
								onClick={ this.sendVerificationEmail.bind(this) }>
								Send Reset PIN
							</button>
							<label 
								className = 'avenir-medium clickable mt-4' 
								style = {{ color : 'white', fontSize : '1.3rem' }}
								onClick = {() => { browserHistory.push('/auth') }}>
								Back to Login
							</label>
						</div>
					}
				</div>
				<NotificationContainer/>
			</div>
		);
	}
}

// if there is an error, it will appear on the state tree
function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

function mapStateToProps(state){
	return {
	}
}

export default connect( mapStateToProps, mapDispatchToProps )( ResetPassword );
