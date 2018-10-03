import React, {Component} from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { signUpUser } from '../../../api/aws/aws_cognito';
import { setSignupEmail } from '../../../redux/actions/auth_actions';

import {NotificationContainer, NotificationManager} from 'react-notifications';
import './styles.scss';
import { setTimeout } from 'timers';

class SignUp extends Component {

	constructor(){
		super()
		this.state = {
			username : '',
			email : '',
			password : '',
			confirmPassword : '',

			errorMessage: null,
			loading: false
		}
	}

	handleChange(attr, event){

		this.setState({
			[attr]: event.target.value
		});
	}

	signup(){
		//browserHistory.push('/auth/add_payment');
		
		if(this.state.username && this.state.email && this.state.password){
			// check that the password and password confirmation match
			if(this.state.password === this.state.confirmPassword){
				// if all checks pass, then toggle the loading icon as we run a syncronous piece of code
				this.setState({loading: true});
				// call the AWS Cognito function that we named `signUpUser`
				signUpUser(this.state)
					.then(({email, username})=>{
						console.log("done signing up");
						// if successful, then save the email to localStorage so we can pre-fill the email form on the login & verify account screens
						localStorage.setItem('User_Email', email);
						localStorage.setItem('User_Name', this.state.username);
						
						this.props.setRegisteredEmail('ghost@gmail.com');

						NotificationManager.success( 'Register success!', 'Congratulation!', 2000, );
						setTimeout( () => {
							browserHistory.push('/auth/add_payment');
						}, 2000);
						// re-route to the verify account screen
					})
					.catch((err)=>{
						// if failure, display the error message and toggle the loading icon to disappear
						this.setState({
							errorMessage: err.message,
							loading: false
						});
						return NotificationManager.error( err.message, 'Error Occured', 5000 );
					})
			} else {
				this.setState({
					errorMessage: "Passwords do not match"
				});
				return NotificationManager.error( 'Password not matched!', 'Error occured!', 5000 );
			}
		} else {
			this.setState({
				errorMessage: "Please include an agent name, email address and password."
			});
			return NotificationManager.error( 'Please include an agent name, email address and password!', 'Error occured!', 5000 );
		}
	}

	render(){
		return (
			<div className = 'mainView'>
				<img src='../../../res/images/logo.png' className = 'logo' alt = 'logo.png'/>

				<div className = 'row mt-2'>
					<label className = 'avenir-black mb-0' style = {{fontSize : '2.3rem', color : '#46B2ED' }} >Slipstream</label>
					<label className = 'avenir-roman mb-0' style = {{fontSize : '2.3rem', color : '#037CBE' }} >.cloud</label>
				</div>

				<div className = 'row'>
					<div className = 'signupForm mt-4'>
						<label className = 'avenir-medium' style = {{ fontSize : '2.2rem', color : '#8C8C8C' }} >Sign up to begin</label>

						<div className  = 'row m-0 mt-5' style = {{ width : '100%' }}>
							<input 
								type = 'name' 
								className = 'form-control loginInput col' 
								onChange = { this.handleChange.bind(this, 'username') }
								aria-describedby="emailHelp" 
								placeholder="Username" />
							<input 
								type = 'email' 
								className = 'form-control loginInput col ml-4' 
								onChange = { this.handleChange.bind(this, 'email') }
								aria-describedby="emailHelp" 
								placeholder="Email Address" />
						</div>

						<div className = 'row m-0 mt-3' style = {{ width : '100%'}}>
							<input 
								type = 'password' 
								className = 'form-control loginInput col' 
								onChange = { this.handleChange.bind(this, 'password') }
								aria-describedby = 'password' 
								placeholder = 'Password' />
							<input 
								type = 'password' 
								className = 'form-control loginInput col ml-4' 
								onChange = { this.handleChange.bind(this, 'confirmPassword') }
								aria-describedby = 'password' 
								placeholder = 'Confirm Password' />
						</div>

						<div className = 'loginButton mt-5' onClick = { this.signup.bind(this) }>
							<label className = 'mb-0' style = {{ color : 'white', fontSize : '1rem' }}>Register</label>
						</div>

						<div className = 'row mt-3'>
							<label className = 'avenir-medium mb-0' style = {{ color : '#C2C2C2' }}>By clicking you agree of our</label>
							<label className = 'avenir-medium mb-0 ml-1' style = {{ color : '#84CCF3' }}>terms of use</label>
						</div>
					</div>
				</div>
				<NotificationContainer/>
			</div>
		);
	}
};

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        setRegisteredEmail : ( email ) => dispatch( setSignupEmail(email) )
    };
}

function mapStateToProps(state){
	return {
	}
}

export default connect( mapStateToProps, mapDispatchToProps )( SignUp );
