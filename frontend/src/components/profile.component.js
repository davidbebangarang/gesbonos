import React, { Component } from "react";
import AuthService from "../services/auth.service";
import ShowBonosConsumo from "./showBonosConsumo";
import 'antd/dist/antd.css';
import { Avatar } from 'antd';
import ProfilePicChanger from './ProfilePicChanger';
import Pic1 from "../img/Avatares/1.png";
import Pic2 from "../img/Avatares/2.png";
import Pic3 from "../img/Avatares/3.png";
import Pic4 from "../img/Avatares/4.png";
import Pic5 from "../img/Avatares/5.png";
import Pic6 from "../img/Avatares/6.png";
import Pic7 from "../img/Avatares/7.png";
import Pic8 from "../img/Avatares/8.png";
import MiHistorial from "./MiHistorial";
import Nav from "../components/Nav";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: AuthService.getCurrentUser(),
      profileImage: ''
    };
    this.userId = '';
    this.userEmail= '';
  }

  handleImageChange = (profileImage) => {
    this.setState({
      profileImage
    })
  }

  setHistory() {
    const url = process.env.REACT_APP_RUTA_CUSTOMERS;
    fetch(`${url}${this.userEmail}`)
      .then(res => res.text())
      .then(data => {
        console.log(data, this.userEmail);
      })
      .catch(error => {
        console.log("Error en cargar el email (front)");
      });
  }

  render() {

    const { currentUser } = this.state;
    this.userId = currentUser.dni;
    this.userEmail = currentUser.email;
    console.log(currentUser);
    // Mostrar inicial en avatar por defecto
    var x;
    var cadena = currentUser.username,
      separador = " ",
      arregloDeSubCadenas = cadena.split(separador);

    for (x = 0; x < arregloDeSubCadenas.length; x++) {
      var subCadena = arregloDeSubCadenas[x].substring(0, 1);
      var inicial = subCadena;
    }
    //

    return (
      <div className="container mt-5">
        <Nav 
            idInstancia= {this.props.match.params.idInstancia} />
        <div className="jumbotron">
          <div className="row">
            <div className="col-md-4 item-centrado">
            <link rel="stylesheet" href="https://bootswatch.com/4/flatly/bootstrap.min.css"/>
              <Avatar size={150} icon={inicial} className="mr-4" src={this.state.profileImage} />
              <ProfilePicChanger handleImageChange={this.handleImageChange} pic1={Pic1} pic2={Pic2} pic3={Pic3} pic4={Pic4} pic5={Pic5} pic6={Pic6} pic7={Pic7} pic8={Pic8} />
            </div>
            <div className="col-md-8 mt-4">
              <h3>Bienvenido <strong>{currentUser.username}</strong>.</h3>
              <p className="lead">Desde aquí podrás administrar tus datos y ver tu historial de compras.</p>

            </div>
          </div>
          <div className="mt-5">
            <ul class="nav nav-tabs row">
              <li className="nav-item col-md-4 mb-1"><a className="btn btn-lg btn-block btn-primary" data-toggle="tab" href="#misDatos">Información personal</a></li>
              <li className="nav-item col-md-4 mb-1"><a className="btn btn-lg btn-block btn-primary" data-toggle="tab" href="#historialCompras" onClick={() => { this.setHistory() }}>Historial de compras</a></li>
              <li className="nav-item col-md-4 mb-1"><a className="btn btn-lg btn-block btn-primary anchoBoton" data-toggle="tab" href="#consumoo">Mis Bonos</a></li>
            </ul>
          </div>

          <div id="myTabContent" className="tab-content">
            <div className="tab-pane fade" id="misDatos">
              <div className="card border-primary mb-3 mt-3">
                <div className="card-body bg-secondary text-white">
                  <p>
                    <h4>Nombre:{" "}</h4>
                    {currentUser.username}
                  </p>
                  <p>
                    <h4>Apellidos:{" "}</h4>
                    {currentUser.lastname}
                  </p>
                  <p>
                    <h4>DNI:{" "}</h4>
                    {currentUser.dni}
                  </p>
                  <p>
                    <h4>Email:{" "}</h4>
                    {currentUser.email}
                  </p>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="historialCompras">
              <MiHistorial
            idInstancia = {this.props.match.params.idInstancia}/>
            </div>

            <div className="tab-pane fade" id="consumoo">
              <ShowBonosConsumo userId={this.userId} 
                idInstancia = {this.props.match.params.idInstancia}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}