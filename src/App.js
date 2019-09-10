import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import HomeScene from './Views/Scenes/Home/Home.scene';
import SignInScene from './Views/Scenes/SignIn/SignIn.scene';
import TodosScene from './Views/Scenes/Todos/Todos.scene';


function App() {
  // The last SignInScene is the default route
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Switch>
            <Route exact path="/react-bootcamp/" component={HomeScene} />
            <Route path="react-bootcamp/sign-in" component={SignInScene} />
            <Route path="react-bootcamp/todos" component={TodosScene} />
            <Route component={SignInScene} />
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
