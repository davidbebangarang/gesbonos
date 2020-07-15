import React, { Component } from 'react';
import Footer from '../components/Footer';
import Nav from "../components/Nav";

class error extends Component {

  render() {

      return (
        <div>
          <Nav 
            idInstancia= {this.props.match.params.idInstancia} />
            <h3>ERROR 404</h3>
            <Footer />
        </div>                  
      )
    }
}
export default error;