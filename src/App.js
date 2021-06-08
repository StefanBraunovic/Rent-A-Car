import './App.css';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import { Switch } from 'react-router-dom';
import PrivateRoute from './privateRoute/PrivateRoute';

function App() {
	return (
		<div className="App">
			<Switch>
				<PrivateRoute path="/home" exact component={Home} isPrivate />
				<PrivateRoute path="/login" component={Login} />
			</Switch>
		</div>
	);
}

export default App;
