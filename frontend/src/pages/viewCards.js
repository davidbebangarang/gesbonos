import React, { Component } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import { withRouter } from 'react-router-dom';
import Nav from '../components/Nav';

class Viewcards extends Component {

  constructor(props) {
    super(props);
    this.state = {
      control: true,
      bonos: []
    };
  }
  componentDidMount() {
    this.fetchTasks();
  }

  getMatchParams() {
    return this.props.match.params.idInstancia;

  }

  fetchTasks() {
    const url = process.env.REACT_APP_RUTA_BONO;
    const { history } = this.props
    console.log(`${url}${this.props.match.params.idInstancia}`, 'url que llama a los bonos')
    fetch(`${url}${this.props.match.params.idInstancia}`)
      .then(res => res.json())
      .then(data => {
        this.checkBonos(data);
        this.setState({ bonos: data });
      })
      .catch(error => {
        history.push(`/error/${this.props.match.params.idInstancia}`)
      });
  }

  checkBonos(data) {
    const { history } = this.props
    if (data.length === 0) {
      history.push(`/bonosNull/${this.props.match.params.idInstancia}`)
    }
  }
  render() {

    return (
      <div>
        <Nav 
            idInstancia= {this.props.match.params.idInstancia} />
        <div className="container ">

          <div className="row justify-content-left mt-5">
            {
              this.state.bonos.map(bonos => {
                return (
                  <Card idInstancia={this.props.match.params.idInstancia}
                    id={bonos.idBono}
                    imagen={bonos.cardImages}
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
        <Footer />
      </div>
    )
  }
}
export default withRouter(Viewcards);
//export default new Viewcards();