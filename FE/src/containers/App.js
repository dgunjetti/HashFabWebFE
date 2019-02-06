import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '../store'
import { BrowserRouter as Router } from 'react-router-dom'
import Main from './Main'
import { setAuthorizationToken, setCurrentUser, getUser } from '../store/actions/auth'
import jwtDecode from 'jwt-decode'

const store = configureStore();

if(localStorage.jwtToken) {
	setAuthorizationToken(localStorage.jwtToken);
	try {
    var decode = jwtDecode(localStorage.jwtToken);
    store.dispatch(getUser(decode.id));
	} catch(err) {
		store.dispatch(setCurrentUser({}));
	}
}

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="App">
        <Main />
      </div>
    </Router>
  </Provider>
);

export default App;
