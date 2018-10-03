// src/App.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import InitialScreen from './screens/initial';
import AuthScreen from './screens/auth/authscreen';
import Login from './screens/auth/login';
import SignUp from './screens/auth/signup';
import SignOut from './screens/auth/signout';
import VerifyAccount from './screens/auth/verifyaccount';
import AddPayment from './screens/auth/addpayment';
import ResetPassword from './screens/auth/resetpassword';
import Home from './screens/home';
import Store from './store';

function requireAuth(nextState, replaceState) {
	//let logged = 'yes';
	//if (!auth.loggedIn())
	//if (!localStorage.getItem('User_Email'))
	if (!localStorage.getItem('user_token')) {
    	replaceState({ nextPathname: nextState.location.pathname }, '/')
	}
}

ReactDOM.render(
	<Provider store={Store}>
		<Router history={browserHistory}>
			<Route path='/' >
				<IndexRoute component={InitialScreen} />
				<Route path='auth' component={AuthScreen}>
					<IndexRoute component={Login} />
					<Route path='login' component={Login}></Route>
					<Route path='signup' component={SignUp}></Route>
					<Route path='signout' component={SignOut}></Route>
					<Route path='verify_account' component={VerifyAccount}></Route>
					<Route path='add_payment' component={AddPayment}></Route>
					<Route path='forgot_password' component={ResetPassword}></Route>
				</Route>
			</Route>
			<Route path='/home' component = { Home } onEnter={requireAuth}>
			</Route>
		</Router>
	</Provider>, document.getElementById('root'));
