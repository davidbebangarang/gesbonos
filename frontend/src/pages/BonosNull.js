import React, { Component } from 'react';
import Footer from '../components/Footer';
import {withRouter} from 'react-router-dom';
import Nav from "../components/Nav";

class BonosNull extends Component {
  
   render() {     
     return (
         <div>  
           <Nav 
            idInstancia= {this.props.match.params.idInstancia} />          
             <h1>no hay bonos disponibles</h1>    
            <Footer />
         </div>                  
     )
   }
 }
 export default withRouter (BonosNull);