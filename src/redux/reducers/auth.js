import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';
import ActionTypes from '../actions/action_types';

const initialState = Immutable({ 
    authenticated : false,
    userProfile : [ ],
    registerEmail : ''
});

const signInUser = function ( state, action ) {
    console.log('Sign in....');

    return ({
        ...state,
        authenticated : true,
    });
};

const signOutUser = function ( state, action ) {
    console.log('Sign out....');

    return ({
        ...state,
        authenticated : false,
    });
};

const setUserProfile = function ( state, action ) {
    console.log('Saving User Profile .....');

    return ({
        ...state,
        userProfile : action.profile,
    });
};

const setRegisterEmail = function ( state, action ) {
    console.log('Saving Register Email ...');

    return ({
        ...state,
        registerEmail : action.email,
    })
}

const actionHandlers = {
    [ActionTypes.SIGNIN_USER]: signInUser,
    [ActionTypes.SIGNOUT_USER]: signOutUser,
    [ActionTypes.SET_USER_PROFILE]: setUserProfile,
    [ActionTypes.SET_SIGNUP_EMAIL]: setRegisterEmail
}

export default createReducer(initialState, actionHandlers);