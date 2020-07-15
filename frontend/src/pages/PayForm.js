import React, { Component } from 'react';
import Footer from '../components/Footer';
import Payment from '../components/Payment';
import Nav from "../components/Nav";

class PayForm extends Component {

    constructor() {
        super();
        let userLog = JSON.parse(localStorage.getItem("user"))
          this.state = {
              name: userLog? userLog.username : "",
              full_name: userLog? userLog.lastname : "",
              nif: userLog? userLog.dni : "",
              country:"",
              city:"",
              adress:"",
              provincia:"",
              postCode:"",
              control:"",
              publicKey:"",
              userLog: JSON.parse(localStorage.getItem("user")),
              disable: userLog? true :false,    
              bono: []
        };     
       
      }



      componentDidMount() {
        this.getStripeKey();

        this.fetchTasks();
      }

      getStripeKey(){
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch(process.env.REACT_APP_RUTA_BONO+"/instanceData/"+this.props.match.params.idInstancia, requestOptions)
            .then(response => response.text())
            .then(result => {console.log("Este es el result"+result)
                this.setState({publicKey:result})})
            .catch(error => console.log('error', error));

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

      handleChange = (e) => {
        const {name, value } = e.target
        this.setState({ [name]: value });   
              
      }
   render() {  


    const { name } = this.state;
    const { full_name } = this.state;
    const { nif } = this.state;
    const { country } = this.state;
    const { city } = this.state;
    const { adress } = this.state;
    const { provincia } = this.state;
    const { postCode } = this.state;
    let control= false;

    if(name===''||full_name===''||nif===''||country===''||city===''||adress===''||provincia===''||postCode===''){
       control=false;
    }else{
        control = true
    }
     return (
         <div> 
             <Nav idInstancia= {this.props.match.params.idInstancia} />
             <div className='container'>
                <div className=' row'>                 
                        <div className='col-md-4'>                          
                            <h5 className='mt-4 card-header'>Datos necesarios</h5>                       
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                <label for="inputEmail4">Nombre</label>
                                <input type="text" className="form-control" id="name" name="name" value={name} onChange={this.handleChange} disabled = {this.state.disable} />
                                </div>
                                <div className="form-group col-md-6">
                                <label for="inputPassword4">Apellidos</label>
                                <input type="text" className="form-control" id="inputPassword4" name="full_name" value={full_name} onChange={this.handleChange} disabled = {this.state.disable}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="inputAddress">NIF/NIE</label>
                                <input type="text" className="form-control" id="nif" name="nif" value={nif} onChange={this.handleChange} disabled = {this.state.disable}/>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                <label for="inputEmail4">País</label>
                                <input type="text" className="form-control" id="country" name="country" value={country} onChange={this.handleChange}/>
                                </div>
                                <div className="form-group col-md-6">
                                <label for="inputPassword4">Ciudad</label>
                                <input type="text" className="form-control" id="city" name="city" value={city} onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="inputAddress2">Dirección</label>
                                <input type="text" class="form-control" id="adress" name="adress" value={adress} onChange={this.handleChange}/>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-8">
                                <label for="inputState">Provincia</label>
                                <select id="inputState" className="form-control" id="provincia" name="provincia" value={provincia} onChange={this.handleChange}>
                                    <option selected value=''></option>
                                    <option selected value='alava'>Álava</option>
                                    <option value='albacete'>Albacete</option>
                                    <option value='alicante'>Alicante/Alacant</option>
                                    <option value='almeria'>Almería</option>
                                    <option value='asturias'>Asturias</option>
                                    <option value='avila'>Ávila</option>
                                    <option value='badajoz'>Badajoz</option>
                                    <option value='barcelona'>Barcelona</option>
                                    <option value='burgos'>Burgos</option>
                                    <option value='caceres'>Cáceres</option>
                                    <option value='cadiz'>Cádiz</option>
                                    <option value='cantabria'>Cantabria</option>
                                    <option value='castellon'>Castellón/Castelló</option>
                                    <option value='ceuta'>Ceuta</option>
                                    <option value='ciudadreal'>Ciudad Real</option>
                                    <option value='cordoba'>Córdoba</option>
                                    <option value='cuenca'>Cuenca</option>
                                    <option value='girona'>Girona</option>
                                    <option value='laspalmas'>Las Palmas</option>
                                    <option value='granada'>Granada</option>
                                    <option value='guadalajara'>Guadalajara</option>
                                    <option value='guipuzcoa'>Guipúzcoa</option>
                                    <option value='huelva'>Huelva</option>
                                    <option value='huesca'>Huesca</option>
                                    <option value='illesbalears'>Illes Balears</option>
                                    <option value='jaen'>Jaén</option>
                                    <option value='acoruña'>A Coruña</option>
                                    <option value='larioja'>La Rioja</option>
                                    <option value='leon'>León</option>
                                    <option value='lleida'>Lleida</option>
                                    <option value='lugo'>Lugo</option>
                                    <option value='madrid'>Madrid</option>
                                    <option value='malaga'>Málaga</option>
                                    <option value='melilla'>Melilla</option>
                                    <option value='murcia'>Murcia</option>
                                    <option value='navarra'>Navarra</option>
                                    <option value='ourense'>Ourense</option>
                                    <option value='palencia'>Palencia</option>
                                    <option value='pontevedra'>Pontevedra</option>
                                    <option value='salamanca'>Salamanca</option>
                                    <option value='segovia'>Segovia</option>
                                    <option value='sevilla'>Sevilla</option>
                                    <option value='soria'>Soria</option>
                                    <option value='tarragona'>Tarragona</option>
                                    <option value='santacruztenerife'>Santa Cruz de Tenerife</option>
                                    <option value='teruel'>Teruel</option>
                                    <option value='toledo'>Toledo</option>
                                    <option value='valencia'>Valencia/Valéncia</option>
                                    <option value='valladolid'>Valladolid</option>
                                    <option value='vizcaya'>Vizcaya</option>
                                    <option value='zamora'>Zamora</option>
                                    <option value='zaragoza'>Zaragoza</option>
                                </select>
                                </div>
                                <div className="form-group col-md-4">
                                <label for="inputZip">C.Postal</label>
                                <input type="text" class="form-control" id="postCode" name="postCode" value={postCode} onChange={this.handleChange}/>
                                </div>
                            </div>      
                        </div>
                        <div className='col-md-8'>                       
                        <div>                                                         
                                <h5 className='mt-4  card-header'>Resumen del pedido</h5>                                
                                <div className='border border-top-0'>
                                    <div className='row'>
                                        <div className="col-md-6">
                                            <ul>
                                                <li className='points'>Descripcion</li>
                                                <li className='points'><h4>{this.state.bono.title}</h4></li>
                                            </ul>
                                        </div>
                                        <div className="col-md-3">
                                            <ul>
                                                <li className='points'>Creditos</li>
                                                <li className='points'><h4>{this.state.bono.credit}</h4></li>
                                            </ul>
                                        </div>
                                        <div className="col-md-3">
                                            <ul>
                                                <li className='points'>Precio</li>
                                                <li className='points'><h4>{this.state.bono.price}</h4></li>
                                            </ul>
                                        </div>                                        
                                    </div>  
                                </div>                           
                        </div>
                            <div className='mt-4 mb-4 text-right'><h4>{`Total de tu compra: ${this.state.bono.price} €`}</h4></div>                           
                        </div>    
                </div>
                <Payment   idBono ={this.props.match.params.id}
                           title ={this.state.bono.title}
                           price ={this.state.bono.price}  
                           credits = {this.state.bono.credit}
                           idInstancia = {this.props.match.params.idInstancia} 
                           name = {this.state.nif}
                           full_name = {`${this.state.full_name}, ${this.state.name}`}
                           nif = {this.state.nif}
                           country = {this.state.country}
                           city = {this.state.city}
                           adress = {this.state.adress}
                           provincia = {this.state.provincia}
                           postCode = {this.state.postCode}  
                           control = {control}
                           publicKey = {this.state.publicKey}                                              
                  />
             </div>
            <Footer />
         </div>                  
     )
   }
 }
 export default PayForm;