import './App.css';
import Home from './pages/home/Home';
import {Switch, Route} from 'react-router-dom';
import PrivateRoute from './privateRoute/PrivateRoute';
import LoginPage from './pages/login/Login';
import Clients from './pages/Clients/Clients';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import Vehicles from './pages/Vehicles/Vehicles';
import Reservations from './pages/Reservations/Reservations';
import CreateReservations from './pages/Reservations/components/CreateReservations';
import {ROLES} from './constants/constants';
import ClientHome from './pages/home/client/ClientHome';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <PrivateRoute
          path="/home"
          exact
          component={Home}
          isPrivate
          role={ROLES.EMPLOYEE}
        />
        <PrivateRoute
          path="/home"
          exact
          component={ClientHome}
          isPrivate
          role={ROLES.CLIENT}
        />
        <PrivateRoute
          path="/clients"
          exact
          component={Clients}
          isPrivate
          role={ROLES.EMPLOYEE}
        />
        <PrivateRoute
          path="/vehicles"
          exact
          component={Vehicles}
          isPrivate
          role={ROLES.EMPLOYEE}
        />
        <PrivateRoute
          path="/reservations"
          exact
          component={Reservations}
          isPrivate
          role={ROLES.EMPLOYEE}
        />
        <PrivateRoute
          path="/add-reservations"
          exact
          component={CreateReservations}
          isPrivate
          role={ROLES.EMPLOYEE}
        />

        <Route path="/login" component={LoginPage} />
      </Switch>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
