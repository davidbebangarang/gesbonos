import React, { Component } from 'react';
import Footer from '../components/Footer';
import CaruselClass from '../components/CaruselClass';
import { withRouter } from 'react-router-dom';
import Logo from '../img/logo.jpg';
import Nav from "../components/Nav";
import ModalBook from "../components/ModelBook";

class Bono extends Component {
   constructor(props) {
      super(props);
      this.state = {
         email: '',
         dni: '',
         idBono: this.props.match.params.idBono,
         styleButton: {
            display: 'none'
         },
         bono: [],
         
      };
   }

   componentDidMount() {

      this.fetchTasks();
      this.checkUser();
     
   }
   checkUser() {
      if (localStorage.getItem("user") === null) {
         return false
      } else {
         this.setState(prevState => ({
            styleButton: {
               display: 'inline'
            }
         }))
         let userLog = JSON.parse(localStorage.getItem("user"))
         this.setState({email: userLog.email});
         this.setState({dni: userLog.dni});
         return true
      }
   }

   fetchTasks() {
      const url1 = process.env.REACT_APP_RUTA_BONO;
      const { history } = this.props
      var url = (`${url1}${this.props.match.params.idInstancia}/${this.props.match.params.id}`)
      fetch(url)
         .then(res => res.json())
         .then(data => {
            this.setState({ bono: data });
         })
         .catch(error => {
            history.push(`/error/${this.props.match.params.idInstancia}`)
         });
   }

   portcentaje(bono) {

      var valor = parseInt(bono.value);
      var precio = parseInt(bono.price);
      var portce = (precio / valor) * 100;
      var entero = portce.toFixed();
      return entero
   }
   
   checkImg() {

      console.log("esto tiene bono images ",this.state.bono.images)

      if (this.state.bono.images === "") {
         console.log("estoy en el primer if")
         return <img className="card-img-top" src={Logo} alt="Card cap" />

      } else {

         if(this.state.bono.cardImages==="") {

            console.log("estoy en el segundo if")
            let img = [
               
               this.state.bono.images
            ]

            return <CaruselClass imagen = {img} />

         }else{

            console.log("estoy en el tercer if")

            let img = [
               this.state.bono.images,
               this.state.bono.cardImages
            ]
            return <CaruselClass imagen = {img} />
         }
        
         
      }
   }

   render() {

      const { history } = this.props
      return (
         <div>
            <Nav
               idInstancia={this.props.match.params.idInstancia} />
            <div className="container mt-5">
               <div className="row text-center ml-2">
                  <div className="jumbotron col-md-5">
                     <h3 className="mb-4 centrado">{this.state.bono.title}</h3>
                     <hr class="my-4" />
                     <div className="container-fluid mb-4">
                        <div className="card-group">
                           <div className="card border-primary mb-3">
                              <div className="card-header valor">Valor</div>
                              <div className="card-body">
                                 <strike className="card-text text-secondary">{this.state.bono.value} €</strike>
                              </div>
                           </div>
                           <div className="card border-danger mb-3">
                              <div className="card-header descuento">Descuento</div>
                              <div className="card-body">
                                 <h5 className="card-text text-danger">{this.portcentaje(this.state.bono)} %</h5>
                              </div>
                           </div>
                           <div className="card border-success mb-3">
                              <div className="card-header precio">Precio</div>
                              <div className="card-body">
                                 <h4 className="card-text text-success">{this.state.bono.price} €</h4>
                              </div>
                           </div>
                        </div>
                     </div>
                     <button className="btn btn-primary todoAncho" onClick={() => history.push(`/PayForm/${this.props.match.params.idInstancia}/${this.props.match.params.id}/`)}>Comprar</button>
                     <div>
                        <div className="row mt-2" style={this.state.styleInput}>   
                        <ModalBook 
                           idInstance = {this.props.match.params.idInstancia}
                           idBono = {this.props.match.params.id}
                           email = {this.state.email}
                           dni = {this.state.dni}
                        /> 
                        </div>
                     </div>
                  </div>
                  <div className="col-md-7 ajustes">
                     {this.checkImg()}
                  </div>
               </div>
               <div className="row mt-4">
                  <div className="col-md-11">
                     <div className="card mb-3 martop">
                        <div className="card-header"><h4 className="descripcion">Descripción</h4></div>
                        <div className="card-body">
                           <p className="card-text">{this.state.bono.description}</p>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="row">
                  <div className="col-md-11">
                     <div className="card mb-3">
                        <div className="card-header"><h4 className="condiciones">Condiciones</h4></div>
                        <div className="card-body">
                           <p className="card-text">{this.state.bono.terms}</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <Footer />
         </div>
      )
   }
}
export default withRouter(Bono);