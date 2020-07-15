import React, { Component } from 'react';
import AuthService from "../services/auth.service";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import BoardUser from "./board-user.component";
import BoardAdmin from "./board-admin.component";
class Nav extends Component {

  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined
    };
  }
  componentDidMount() {

    const user = AuthService.getCurrentUser();
    //const params = ViewCards.getMatchParams();

    if (user) {
      this.setState({
        currentUser: AuthService.getCurrentUser(),
        showAdminBoard: user.roles.includes("ROLE_ADMIN")
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showAdminBoard } = this.state;
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-primary fixed-top">
          <Link to={"/"} className="navbar-brand">
            GESBONOS
            </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
                </Link>
            </li>
            <li>
              <Link to={`/${this.props.idInstancia}`} className="nav-link">
                Bonos
              </Link>
            </li>

            {showAdminBoard && (
              <li>
                <Link to={`/AdminPanel/${this.props.idInstancia}`} className="nav-link">
                  Administración
                  </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">

              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={`/profile/${this.props.idInstancia}`} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>            
              <li className="nav-item">
                  <a href={`/login/${this.props.idInstancia}`} className="nav-link" onClick={this.logOut}>
                    Cerrar sesión
                  </a>
                </li>
            </div>
          ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={`/login/${this.props.idInstancia}`} className="nav-link">
                    Iniciar sesión
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={`/register/${this.props.idInstancia}`} className="nav-link">
                    Registrarse
                  </Link>
                </li>
              </div>
            )}
        </nav>
      </div>
    )
  }
}
export default Nav;