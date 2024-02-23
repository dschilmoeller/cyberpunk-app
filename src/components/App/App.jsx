import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import RuleBook from '../RuleBook/RuleBook';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';

import CharacterList from '../Characters/CharacterList/CharacterList';
import CharacterSheet from '../Characters/CharacterSheet/CharacterSheet';
import Creation from '../CharCreation/Creation';
import AdvancementSheet from '../Characters/AdvancementSheet/AdvancementSheet';
import ShoppingSheet from '../Characters/ShoppingSheet/ShoppingSheet';

import GameMasterLanding from '../GameMaster/GameMasterLanding';
import GameMasterSheet from '../GameMaster/GameMasterSheet';
import GameMasterContacts from '../GameMaster/GamemasterContacts';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <div className='navBarLock'>
          <Nav />
        </div>

        <div className='contentPadder'>
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/login" />

            {/* Visiting localhost:3000/about will show the about page. */}
            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/about"
            >
              <AboutPage />
            </Route>

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/user"
            >
              <UserPage />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows RuleBook else shows LoginPage
              exact
              path="/info"
            >
              <RuleBook />
            </ProtectedRoute>

            <Route
              exact
              path="/login"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect to the /user page
                <Redirect to="/user" />
                :
                // Otherwise, show the login page
                <LoginPage />
              }
            </Route>

            <Route
              exact
              path="/registration"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect them to the /user page
                <Redirect to="/user" />
                :
                // Otherwise, show the registration page
                <RegisterPage />
              }
            </Route>

            <ProtectedRoute
              exact
              path="/characterlist"
            >
              <CharacterList />
            </ProtectedRoute>
            {/* in play version, can edit health, luck, and other temp features */}
            <ProtectedRoute
              exact
              path="/charactersheet/:id"
            >
              <CharacterSheet />
            </ProtectedRoute>

            {/* detailed version, able to spend XP and change sheet generally */}
            <ProtectedRoute
              exact
              path="/advancementsheet/:id"
            >
              <AdvancementSheet />
            </ProtectedRoute>

            {/* shopping area */}
            <ProtectedRoute
              exact
              path="/shopsheet/:id"
            >
              <ShoppingSheet />
            </ProtectedRoute>

            {/* character creation */}
            <ProtectedRoute
              exact
              path="/charcreation/"
            >
              <Creation />
            </ProtectedRoute>

            {/* GM Page */}
            <ProtectedRoute
              exact
              path="/gamemaster/"
            >
              <GameMasterLanding />
            </ProtectedRoute>

            {/* GM Individual Character Details Page */}
            <ProtectedRoute
              exact
              path="/gamemastersheet/:id"
            >
              <GameMasterSheet />
            </ProtectedRoute>

            <ProtectedRoute
              exact
              path="/gamemastercontacts"
            >
              <GameMasterContacts />
            </ProtectedRoute>

            <Route
              exact
              path="/home"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect them to the /user page
                <Redirect to="/user" />
                :
                // Otherwise, show the Landing page
                <LandingPage />
              }
            </Route>

            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
