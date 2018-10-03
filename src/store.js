import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './redux/reducers';
import createSagaMiddleware from 'redux-saga';
import root_sagas from './redux/sagas';
/*
import { createLogger } from 'redux-logger';
import reduxThunk from 'redux-thunk';
import devTools from 'remote-redux-devtools';
*/
// store.js represents the overall Redux state
// store.js is exported for use inside ./index.js (ie. <Provider store={Store}>)
				// all child components of <Provider> will have access to the Redux store (aka Redux state)

const sagaMiddleware = createSagaMiddleware();

const middleWares = [
	sagaMiddleware
];
const enhancers = [
	applyMiddleware(...middleWares),
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// recall that all actions will flow through each middleware until it reaches the end to be passed to Redux reducers
// applyMiddleware() is used to combine various middlewares
const store = createStore(
	reducers,
	composeEnhancers(...enhancers)
)

root_sagas.forEach(saga => sagaMiddleware.run(saga));

// and finally export the store for external use
export default store;
