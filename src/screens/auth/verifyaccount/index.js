import React, {Component} from 'react';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';
import Radium from 'radium';

import { setUserProfile } from '../../../redux/actions/auth_actions';
import {verifyUserAccount , resetVerificationPIN} from '../../../api/aws/aws_cognito';


class VerifyAccount extends Component {

	constructor(){
		super()
		this.state = {
			username: "",
			email: "",
			pin: "",
			resend: false,
			successMessage: "Check your email for a verification PIN",
			errorMessage: null,
			loading: false
		}
	}

	componentDidMount(){
		const savedEmail = localStorage.getItem('User_Email')
		if(savedEmail){
			this.setState({
				email: savedEmail
			})
		}
		const savedUsername = localStorage.getItem('User_Name')
		if(savedUsername){
			this.setState({
				username: savedUsername
			})
		}
	}

	handleChange(attr, event){
		this.setState({
			[attr]: event.target.value
		})
	}

	resendPIN(){
		this.setState({
			loading: true,
			errorMessage: ""
		})
		resetVerificationPIN(this.state.email)
			.then(()=>{
				this.setState({
					resend: false,
					loading: false,
					errorMessage: ""
				})
			})
			.catch((err)=>{
				console.log(err.message)
				this.setState({
					errorMessage: err.message,
					loading: false
				})
			})
	}

	verifyPin(){
		
		if(this.state.username && this.state.pin){
			this.setState({loading: true})
			verifyUserAccount({
				username: this.state.username,
				pin: this.state.pin
			})
			.then((data)=>{
				browserHistory.push('/auth/add_payment')
			})
			.catch((err)=>{
				console.log(err)
				this.setState({
					errorMessage: err.message,
					successMessage: "",
					loading: false
				})
			})
		}else{
			this.setState({
				errorMessage: "Please enter your username and its verification PIN",
				successMessage: "",
				loading: false
			})
		}
		//browserHistory.push('/auth/add_payment');
	}

	redirectTo(route){
		browserHistory.push(route)
	}

	render(){
		return (
			<div style={comStyles().mainview}>
				<div style={comStyles().entrance}>
					<img src='../../../res/images/aws_logo.png' style={comStyles().logo} alt = 'logo.png'/>
					<h1 style={comStyles().landlordText}>Account Verification</h1>

					{
						this.state.resend
						?
						<div>
							<div className='form-group'>
								<label style={comStyles().formText}>Email</label>
								<input value={this.state.email} onChange={this.handleChange.bind(this, 'email')} type="email" className='form-control' style={comStyles().formInput} />
							</div>
							{
								this.state.errorMessage
								?
								<div className='alert alert-danger' style={comStyles().errorMessage}>
									{this.state.errorMessage}
									<b onClick={()=>this.setState({errorMessage: ""})} style={comStyles().messageClose}>&times;</b>
								</div>
								:
								null
							}
							{
								this.state.loading
								?
								<div style={comStyles().loadingBox}>
									<img src='../../../res/images/loading.gif' style={comStyles().loadingGif} alt = 'loading.gif'/>
								</div>
								:
								<button onClick={this.resendPIN.bind(this)} style={comStyles().button} type='button' className='btn btn-primary btn-block'>Resend Verification PIN</button>
							}
							<div onClick={()=>this.redirectTo('/auth/signup')} style={comStyles().login}>Back To Login</div>
						</div>
						:
						<div>
							<form style={comStyles().form}>
								<div className='form-group'>
									<label style={comStyles().formText}>Username</label>
									<input value={this.state.username} onChange={this.handleChange.bind(this, 'username')} type="username" className='form-control' style={comStyles().formInput} />
								</div>
								<div className='form-group'>
									<label style={comStyles().formText}>Verification PIN</label>
									<input value={this.state.pin} onChange={this.handleChange.bind(this, 'pin')} type="text" className='form-control' style={comStyles().formInput} />
								</div>
								{
									this.state.successMessage
									?
									<div className='alert alert-success' style={comStyles().errorMessage}>
										{this.state.successMessage}
										<b onClick={()=>this.setState({successMessage: ""})} style={comStyles().messageClose}>&times;</b>
									</div>
									:
									null
								}
								{
									this.state.errorMessage
									?
									<div className='alert alert-danger' style={comStyles().errorMessage}>
										{this.state.errorMessage}
										<b onClick={()=>this.setState({errorMessage: ""})} style={comStyles().messageClose}>&times;</b>
									</div>
									:
									null
								}
								{
									this.state.loading
									?
									<div style={comStyles().loadingBox}>
										<img src='../../../res/images/loading.gif' style={comStyles().loadingGif} alt = 'loading.gif'/>
									</div>
									:
									<button onClick={this.verifyPin.bind(this)} style={comStyles().button} type='button' className='btn btn-primary btn-block'>Verify</button>
								}

							</form>
							<div onClick={()=>this.setState({resend: true})} style={comStyles().resend}>Resend Verification PIN</div>
							<div onClick={()=>browserHistory.push('/auth/login')} style={comStyles().back}>Back To Login</div>
						</div>
					}
				</div>
			</div>
		);
	}
}

const RadiumHOC = Radium( VerifyAccount );

// if there is an error, it will appear on the state tree
function mapStateToProps(state){
	return {
	}
}

function mapDispatchToProps(dispatch){
	return {
		dispatch,
		setUserProfile : profile => dispatch( setUserProfile(setUserProfile) )
	};
}

export default connect( mapStateToProps, mapDispatchToProps )( RadiumHOC );


// =========================================================


const comStyles = () => {
	return {
		mainview: {
			width: "100%",
			height: "100%",
			margin: "0",
			left: "0",
			top: "0",
			display: "flex",
			justifyContent: "center",
			backgroundColor : "#f5f5f5"
		},
		entrance: {
			display: "flex",
			flexDirection: "column",
			margin: "auto",
			justifyContent: "center"
		},
		form: {
			width: "500px",
			margin: "auto",
			"@media (max-width: 600px), and (max-height: 740px)": {
				width: "90%"
			}
		},
		formText: {
			color: "black",
			fontSize: "1.2rem",
			fontWeight: "bold",
		},
		formInput: {
			fontSize: "1.2rem",
			textAlign: "center",
			backgroundColor: "rgba(256,256,256,0.9)"
		},
		landlordText: {
			color: "black",
			fontWeight: "bold",
			textAlign: "center",
			margin: "15px auto"
		},
		logo: {
			height: "auto",
			width: "200px",
			margin: "15px auto"
		},
		resend: {
			color: "black",
			fontSize: "1.2rem",
			textAlign: "center",
			margin: "30px 0px 0px 0px",
			cursor: "pointer"
		},
		button: {
			color: "white",
			fontSize: "1.2rem",
			fontWeight: "bold"
		},
		back: {
			color: "black",
			fontSize: "1.2rem",
			textAlign: "center",
			margin: "10px auto",
			cursor: "pointer"
		},
		errorMessage: {
			width: "500px",
			margin: "15px auto",
			"@media (max-width: 600px), and (max-height: 740px)": {
				width: "90%"
			}
		},
		loadingBox: {
			width: "500px",
			margin: "auto",
			display: "flex",
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "center",
			"@media (max-width: 600px), and (max-height: 740px)": {
				width: "90%"
			}
		},
		loadingGif: {
			width: "50px",
			height: "50px"
		},
		login: {
			color: "black",
			fontSize: "1.2rem",
			textAlign: "center",
			margin: "30px 0px 0px 0px",
			cursor: "pointer"
		},
		messageClose: {
			float: "right",
			fontSize: "1rem",
			cursor: "pointer"
		}
	}
}
