import React, { Component } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import { browserHistory } from 'react-router';

import { setUserProfile } from '../../../redux/actions/auth_actions';
import { signInUser, retrieveUserFromLocalStorage } from '../../../api/aws/aws_cognito';
import { setKey } from '../../../api/server_apis';

import axios from 'axios';

class Login extends Component {

	constructor(){
		super();

		this.state = {
			email: '',
			password: '',
			errorMessage: null,
			loading: false
		};
	}

	componentDidMount(){
		const savedEmail = localStorage.getItem('User_Email');
		if(savedEmail){
			this.setState({
				email: savedEmail
			})
		}
		retrieveUserFromLocalStorage()
			.then((data)=>{
				this.props.setUserProfile(data)
				//browserHistory.push('/home');
			})
	}

	handleChange(attr, event){
		this.setState({
			[attr]: event.target.value
		})
	}

	signin(){
		this.setState( { loading: true } );

		signInUser(
			{
			email: this.state.email,
			password: this.state.password
			})
		.then( userProfileObject =>
			{
				//NEW
				//async function go() {
				//	try {
				//	  const ApiUrl = 'http://34.237.44.133:10001/api/v1';
				//	  const KEY = await axios.get( ApiUrl + '/web/slipstream/private/jwt_test')
				//	  console.log("KEY", KEY.data.auth);
				//		localStorage.setItem('KEY', KEY.data.auth);
		     //   } catch (e) {
        //    console.error(e); // 💩
        //   }
        // }
        //go();


				//console.log("KEY", KEY);
				//DROR
				console.log('userProfileObject:');
				console.log(userProfileObject);
				localStorage.setItem('User_Email', this.state.email);
				//this.props.setUser(userProfileObject)
				//MysetUser(userProfileObject)
				this.props.setUserProfile(userProfileObject);
				setKey();
				console.log('mySUCCESS');
				browserHistory.push('/home');
			}
		)
		.catch((err)=>{
			console.log('myERROR');
			this.setState({
				errorMessage: err.message,
				loading: false
			})
		})
	}

	redirectTo(route){
		browserHistory.push(route)
	}

	render(){
		return (
			<div style={comStyles().mainview}>
				<div style={comStyles().entrance}>
					<img src='../../../res/images/aws_logo.png' style={comStyles().logo} alt = 'logo.png'/>
					<h1 style={comStyles().landlordText}>User Login</h1>
					<form style={comStyles().form}>
						<div className='form-group'>
							<label style={comStyles().formText}>Email</label>
							{/* Field name determines the name of the variables being passed to handleSubmit(this.props.signinLandlord) */}
							<input value={this.state.email} onChange={this.handleChange.bind(this, 'email')} type="email" className='form-control' style={comStyles().formInput} />
						</div>
						<div className='form-group'>
							<label style={comStyles().formText}>Password</label>
							<input value={this.state.password} onChange={this.handleChange.bind(this, 'password')} type="password" className='form-control' style={comStyles().formInput} />
						</div>
						{
							this.state.loading
							?
							<div style={comStyles().loadingBox}>
								<img src='../../../res/images/loading.gif' style={comStyles().loadingGif} alt = 'loading.gif'/>
							</div>
							:
							<button onClick={this.signin.bind(this)} style={comStyles().signupButton} type='button' className='btn btn-block btn-primary'>Sign in</button>
						}
					</form>
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
					<div onClick={()=>this.redirectTo('/auth/signup')} style={comStyles().signup}>Sign Up</div>
					<div onClick={()=>this.redirectTo('/auth/verify_account')} style={comStyles().verify}>Verify Account</div>
					<div onClick={()=>this.redirectTo('/auth/forgot_password')} style={comStyles().forgot}>Forgot Password</div>
				</div>
			</div>
		);
	}
}

const RadiumHOC = Radium(Login);

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

//export default connect(mapStateToProps, {setUser})(RadiumHOC);
export default connect( mapStateToProps, mapDispatchToProps )( RadiumHOC );

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
			backgroundColor: "rgba(0,0,0,0.05)"
		},
		landlordText: {
			color: "black",
			fontWeight: "bold",
			textAlign: "center",
			margin: "15px auto"
		},
		signupButton: {
			color: "white",
			fontSize: "1.2rem",
			fontWeight: "bold"
		},
		logo: {
			height: "auto",
			width: "200px",
			margin: "30px auto"
		},
		signup: {
			color: "black",
			fontSize: "1.2rem",
			textAlign: "center",
			margin: "50px 0px 30px 0px",
			cursor: "pointer"
		},
		verify: {
			color: "black",
			fontSize: "1.2rem",
			textAlign: "center",
			margin: "5px",
			cursor: "pointer"
		},
		forgot: {
			color: "black",
			fontSize: "1.2rem",
			textAlign: "center",
			margin: "5px",
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
		messageClose: {
			float: "right",
			fontSize: "1.2rem",
			cursor: "pointer"
		}
	}
}
