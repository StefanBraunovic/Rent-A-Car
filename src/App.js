import './App.css';
import Home from './pages/home/Home';
import {Switch} from 'react-router-dom';
import PrivateRoute from './privateRoute/PrivateRoute';
import LoginPage from './pages/login/Login';
import Clients from './pages/Clients/Clients';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import Vehicles from './pages/Vehicles/Vehicles';
import Reservations from './pages/Reservations/Reservations';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <PrivateRoute path="/home" exact component={Home} isPrivate />
        <PrivateRoute path="/clients" exact component={Clients} isPrivate />
        <PrivateRoute path="/vehicles" exact component={Vehicles} isPrivate />
        <PrivateRoute
          path="/reservations"
          exact
          component={Reservations}
          isPrivate
        />

        <PrivateRoute path="/" component={LoginPage} />
      </Switch>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
