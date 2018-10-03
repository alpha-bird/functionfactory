import  ActionTypes  from './action_types';

export const signInUser = ( ) => ({
	type : ActionTypes.SIGNIN_USER, 
});

export const signOutUser = ( ) => ({
	type : ActionTypes.SIGNOUT_USER,
});

export const setUserProfile = profile => ({
	type : ActionTypes.SET_USER_PROFILE, profile
});

export const setSignupEmail = email => ({
	type : ActionTypes.SET_SIGNUP_EMAIL, email
});