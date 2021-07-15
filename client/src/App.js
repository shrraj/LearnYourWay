import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';
import Signout from './components/auth/Signout';
import ForgotPass from './components/auth/ForgotPass';
import Navbar from './components/home/Navbar';
import Home from './components/home/Home';
import Test1 from './components/home/Test1';
import Dashboard from './components/home/Dashboard';
import Content from './components/home/Content';
import TestAnalysis from './components/private/TestAnalysis';
import FrontPage from './components/private/FrontPage';
import Result from './components/home/Result';
import Error from './components/errorpage/Error';
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>

      <Switch >
        <Route exact path='/' >
        <Navbar />
          <FrontPage />
        </Route>
        <Route exact path='/test1' >
          <Test1 />
        </Route>
        <Route path='/signup'>
        <Navbar />
          <Signup />
        </Route>
        <Route path='/signin'>
        <Navbar />
          <Signin />
        </Route>
        <Route path='/Dashboard' >
        <Navbar />
          <Dashboard />
        </Route>
        <Route path='/home' >
          <Home />
        </Route>
        <Route path='/content'>
        <Navbar />
          <Content />
        </Route>
        <Route path='/forgotPass'>
        <Navbar />
          <ForgotPass />
        </Route>
        <Route path='/result'>
        <Navbar />
          <Result />
        </Route>
        <Route path='/testAnalysis'>
        <Navbar />
          <TestAnalysis />
        </Route>
        <Route path='/signout'>
          <Signout />
        </Route>
        <Route>
        <Navbar />
          <Error />
        </Route>
        
      </Switch>
    </div>
  );
}

export default App;