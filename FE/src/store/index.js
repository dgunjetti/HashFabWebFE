import reducer from './reducers'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk' 

var getComposeEnhancers = () => {
    if (window.navigator.userAgent.includes('Chrome') 
    		&& !process.env.REACT_APP_PRODUCTION) {
      return compose(
        applyMiddleware(thunk)
        ,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      );
    }
    return compose(applyMiddleware(thunk) );
  };

  

export function configureStore() {
	var store = createStore(reducer, getComposeEnhancers() );
	return store;
}