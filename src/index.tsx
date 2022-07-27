import React from 'react';
import { Provider } from 'react-redux';
import { store } from './Redux/store'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, About } from './components'
import './styles.css'
import { FirebaseAppProvider, AuthCheck } from 'reactfire';
import { firebaseConfig } from './firebaseConfig'
import 'firebase/auth';
import { SignIn } from './components/SignIn';
import {Search} from './components/Search';
import { Notes } from './components/Notes';




const temp_props = "NASA interactive website"

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <Provider store={store}>
    <Router>
      <Switch>


        <Route exact path="/">
          <Home title={temp_props}/>
        </Route>
        <Route path='/about'>
          <About></About>
        </Route>
        <Route path='/signin'>
          <SignIn></SignIn>
        </Route>
        <Route path='/search'>
          <Search></Search>
        </Route>
        <Route path='/Notes'>
          <Notes></Notes>
        </Route>


      </Switch>
    </Router>
    </Provider>
   </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);