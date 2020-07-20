import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/login.component";
import Register from "./pages/register.component";
import Home from "./pages/home.component";
import BoardUser from "./components/board-user.component";
import BoardAdmin from "./components/board-admin.component";
import Profile from './components/profile.component';
import ViewCards from './pages/viewCards';
import Bono from './pages/Bono';
import PayForm from './pages/PayForm';
import AdminPanel from './pages/adminPanel';
import editBono from './pages/editBono';
import newBono from './pages/newBono';
import MiHistorial from './components/MiHistorial';
import Error from './pages/error';
import BonosNull from './pages/BonosNull';

class App extends Component {
  constructor(props) {
    super(props);


    this.state = {

    };
  }

  componentDidMount() {

  }

  render() {


    return (
      <Router>
        <div>
          <br />
          <br />
          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login/:idInstancia" component={Login} />
              <Route exact path="/register/:idInstancia" component={Register} />
              <Route exact path="/profile/:idInstancia" component={Profile} />
              <Route exact path="/user/:idInstancia" component={BoardUser} />
              <Route exact path="/admin/:idInstancia" component={BoardAdmin} />
              <Route exact path="/:idInstancia" component={ViewCards} />
              <Route exact path="/Bono/:idInstancia/:id" component={Bono} />
              <Route exact path="/PayForm/:idInstancia/:id/" component={PayForm} />
              <Route exact path="/adminPanel/:idInstancia" component={AdminPanel} />
              <Route exact path="/editBono/:idInstancia/:id" component={editBono} />
              <Route exact path="/newBono/:idInstancia" component={newBono} />
              <Route exact path="/MiHistorial/:idInstancia" component={MiHistorial} />
              <Route exact path="/error/:idInstancia" component={Error}/>
              <Route exact path="/BonosNull/:idInstancia" component={BonosNull}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;