import './App.css';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import ProfileEdit from './pages/profile/edit-proile';
import ProfileCreate from './pages/profile/ProfileCreate';
import ProfileDetails from './pages/profile/ProfileDetails';
import MemoryCreation from './components/memory/memoryCreation';
import { UserAndprofiles } from './pages/userpage/user-and-profile';
import ENHome from './pages/home/ENHome';
import ENLogin from './pages/login/ENLogin';
import ENRegister from './pages/register/ENRegister';
import ENProfileEdit from './pages/profile/ENEditProfile';
import ENProfileCreate from './pages/profile/ENProfileCreate';
import ENProfileDetails from './pages/profile/ENProfileDetails';
import { ENUserAndprofiles } from './pages/userpage/ENUser-and-profile';
import { AuthContext } from './context/AuthContext';
import { useContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import LanguageContext from './context/LanguageContext';
function App() {
  const { user } = useContext(AuthContext);
  const [language, setLanguage] = useState(LanguageContext.language);
  
  return (
    <>
      <Router>
        {language === 'heb' ? (
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
            <Route exact path="/register">
              {user ? <Redirect to="/" /> : <Register />}
            </Route>
            <Route exact path="/about" >
              <About />
            </Route>
            <Route exact path="/createprofile/:id" >
              <ProfileCreate />
            </Route>
            <Route exact path="/profiledetails/:id" >
              <ProfileDetails />
            </Route>
            <Route exact path="/userprofiles/:id" >
              <UserAndprofiles />
            </Route>
            <Route exact path="/editprofiles/:id" >
              <ProfileEdit />
            </Route>
            <Route exact path="/memorycreation/:profileid" >
              <MemoryCreation />
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/">
              <ENHome />
            </Route>
            <Route exact path="/login">{user ? <Redirect to="/" /> : <ENLogin />}</Route>
            <Route exact path="/register">
              {user ? <Redirect to="/" /> : <ENRegister />}
            </Route>
            <Route exact path="/about" >
              <About />
            </Route>
            <Route exact path="/createprofile/:id" >
              <ENProfileCreate />
            </Route>
            <Route exact path="/profiledetails/:id" >
              <ENProfileDetails />
            </Route>
            <Route exact path="/userprofiles/:id" >
              <ENUserAndprofiles />
            </Route>
            <Route exact path="/editprofiles/:id" >
              <ENProfileEdit />
            </Route>
            <Route exact path="/memorycreation/:profileid" >
              <MemoryCreation />
            </Route>
          </Switch>
        )}
      </Router>
    </>
  );
}

export default App;
