import React, { Component } from 'react';
import HistorialTable from './historial';
import AuthService from "../services/auth.service";
import Nav from "../components/Nav";

class MiHistorial extends Component {

   constructor(props) {
      super(props);
      this.state = {
         currentUser: AuthService.getCurrentUser(),
         datos: []
      };
   }

   componentDidMount() {
      this.fetchTasks();
   }

   fetchTasks() {
      
      const url = process.env.REACT_APP_RUTA_CUSTOMERS;
      console.log(`${url}${this.state.currentUser.email}`);
      //const { history } = this.props
      fetch(`${url}${this.props.idInstancia}/${this.state.currentUser.email}`)
         .then(res => res.json())
         .then(data => {
            this.setState({ datos: data });
            console.log(this.state.datos)
         })
         .catch(error => {
            console.log(error)
            //history.push(`/error/${this.props.match.params.idInstancia}`)
         });
   }

   render() {
  
   
      return (
        <div>
           <Nav idInstancia= {this.props.idInstancia} />
           <HistorialTable datos={this.state.datos}/>
        </div>                  
      )
  }
}

export default MiHistorial;