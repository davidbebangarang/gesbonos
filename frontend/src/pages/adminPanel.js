import React, { Component } from 'react';
import Footer from '../components/Footer';
import Rows from '../components/rows';
import Nav from "../components/Nav";

class adminPanel extends Component {

  constructor(props) {
    super();
      this.state = {       
        control : undefined,
        bonos: []
    };
    
  }
  componentDidMount() {
    this.fetchBonos(); 
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
      this.setState({bonos: data.body});
      this.setState({control:true});
    }).catch(this.setState({control: false}));
  }
  render() {
    
    const{history}=this.props
    
    if(this.state.control){
      return (
        <div>
          <Nav 
            idInstancia= {this.props.match.params.idInstancia} />
              <div className="container row">   
                <div className="col-2 mt-5  ">
                  <button type="button" className="btn btn-outline-success nuevoBono" onClick={()=>history.push(`/newBono/${this.props.match.params.idInstancia}`)}>NUEVO BONO</button>
                 
                </div>     
                <div className="col-10 mt-5">  
                    {
                    this.state.bonos.map(bonos=> {              
                      return(    
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
            <Footer />
        </div>                  
      )
    }else{
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