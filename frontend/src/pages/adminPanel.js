import React, { Component } from 'react';
import Footer from '../components/Footer';
import Rows from '../components/rows';
import Nav from "../components/Nav";


class adminPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dni: '',
      control: undefined,
      bonos: [],
      apiResponse: [],
      structedResponse: ''
    };
    this.url = process.env.REACT_APP_RUTA_USERS;
  }

  callAPI(userId, idInstance) {
    fetch(this.url, {
      "method": "POST",
      "body": JSON.stringify({
        "userId": userId,
        "idInstance": idInstance
      }),
      "headers": {
        "content-type": "application/json"
      }
    })
      .then(res => res = this.structResponse(res))//[{"A":1},{"B":4}]
      .then(res => this.setState({ apiResponse: res }))
      .catch(err => this.setState({ apiResponse: "No se han encontrado bonos de: " + userId }))
  }

  consumeBono(userId, actividad) {
    fetch(this.url, {
      "method": "PATCH",
      "body": JSON.stringify({ userId, actividad }),
      "headers": {
        "content-type": "application/json"
      }
    })

      .then(res => res = this.structResponse(res))
      .then(res => this.setState({ apiResponse: res }))
      .catch(err => this.setState({ apiResponse: "No se han encontrado bonos de: " + userId }))
  }

  componentDidMount() {
    this.fetchBonos();
    this.callAPI(this.props.userId);
  }
  //muestra todos los bonos
  fetchBonos() {
    //CONEXION SERVIDOR
    fetch(`${process.env.REACT_APP_RUTA_ADMIN}${this.props.match.params.idInstancia}`, {
      "method": "GET",
      "headers": {}
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ bonos: data.body });
        this.setState({ control: true });
      }).catch(this.setState({ control: false }));
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  async structResponse(res) {

    return new Promise((resolve, reject) => {
      /*for (var clave in json){
      }*/
      res.text()
        .then(data => {
          console.log(data);
          const bonos = JSON.parse(data).body;
          let card = []
          let solution = []
          for (let i = 0; i < bonos.length; i++) {
            for (let clave in bonos[i]) {
              if (bonos[i][clave] !== 0 && bonos[i][clave] !== '0') {
                solution.push(
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-4">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                      <div className="navbar-collapse" id="navbarSupportedContent">
                        <p className="navbar-brand">Titulo {clave}</p>
                        <ul className="navbar-nav mr-auto">
                          <li className="nav-item active ml-6">
                            <p className="navbar-brand"> Cantidad {bonos[i][clave]}</p>
                          </li>
                          <li className="nav-item active ml-6">
                            <button className="btn btn-primary" onClick={() => this.consumeBono(this.state.dni, clave)}>Comsumir</button>
                          </li>
                        </ul>

                      </div>
                    </nav>
                  </div>
                );
              }
            }
          }
          card.push(<div className="row justify-content-left mt-5">{solution}</div>)
          resolve(card);
        })
    });
  }

  render() {
    const { dni } = this.state;
    const { history } = this.props

    if (this.state.control) {
      return (
        <div>
          <Nav
            idInstancia={this.props.match.params.idInstancia} />
          <div className="container row">
            <div className="col-2 mt-5  ">
              <button type="button" className="btn btn-outline-success nuevoBono" onClick={() => history.push(`/newBono/${this.props.match.params.idInstancia}`)}>NUEVO BONO</button>

            </div>
            <div className="col-10 mt-5">
              {
                this.state.bonos.map(bonos => {
                  return (
                    <Rows idInstancia={this.props.match.params.idInstancia}
                      id={bonos.idBono}
                      titulo={bonos.title}
                      ubicacion={bonos.location}
                      valor={bonos.value}
                      precio={bonos.price}
                    />
                  )
                })
              }
            </div>
          </div>

          <div className="jumbotron">
              <div className="row">
                <h4 className="col-3">Buscar bonos</h4>
                <input className="col-6 form-control" type="text" id="dni" name="dni" placeholder="DNI cliente" value={dni} onChange={this.handleChange} />
                <div className="col-1"></div>
                <button className="col-2 btn btn-outline-primary" onClick={() => this.callAPI(this.state.dni, this.props.match.params.idInstancia)}>Buscar</button>
              </div>
              {this.state.apiResponse}
          </div>
          <Footer />
        </div>
      )
    } else {
      return (
        <div>
          <div className="container">
            <div className="row justify-content-left mt-5">
            </div>
          </div>

          <Footer />
        </div>
      )
    }
  }
}
export default adminPanel;