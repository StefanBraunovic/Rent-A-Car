import './App.css';
import Home from './pages/home/Home';
import { Switch } from 'react-router-dom';
import PrivateRoute from './privateRoute/PrivateRoute';
import LoginPage from './pages/login/Login';

function App() {
	return (
		<div className="App">
			<Switch>
				<PrivateRoute path="/home" exact component={Home} isPrivate />
				<PrivateRoute path="/" component={LoginPage} />
			</Switch>
		</div>
	);
}

export default App;
