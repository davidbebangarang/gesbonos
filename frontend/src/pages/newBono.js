import React, { Component } from 'react';
import Footer from '../components/Footer';
import { toast } from "react-toastify";
import { withRouter } from 'react-router-dom';
import { storage } from '../firebase';
import Nav from "../components/Nav";

toast.configure();

class newBono extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            value: '',
            price: '',
            location: '',
            expiration: '',
            description: '',
            terms: '',
            cardImages: '',
            images: [],
            networkLinks: '',
            maxBonos: '',
            credit: '',
            classBono: '',
            image: null,
            url: '',
            url2: '',
            style: [],
            styleButton: { display: 'none' },
            styleButtonSubir: { display: 'none' },
            styleButtonSubir2: { display: 'none' },
            bono: [],
            bononew: []
        }
        this.handleChangeImage = this
            .handleChangeImage
            .bind(this);
        this.handleUpload = this.handleUpload.bind(this);

        this.handleChangeImage2 = this
            .handleChangeImage2
            .bind(this);
        this.handleUpload2 = this.handleUpload2.bind(this);

    }
    componentDidMount() {

    }

    updateBono() {
        const { history } = this.props;
        if (this.requirecamps()) {

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "bono": {
                    title: document.getElementById("title").value,
                    value: document.getElementById("value").value,
                    price: document.getElementById("price").value,
                    location: document.getElementById("location").value,
                    expiration: document.getElementById("expiration").value,
                    description: document.getElementById("description").value,
                    terms: document.getElementById("terms").value,
                    cardImages: this.state.url,
                    images: [this.state.url2],
                    networkLinks: document.getElementById("networkLinks").value,
                    maxBonos: document.getElementById("maxBonos").value,
                    credit: document.getElementById("credit").value,
                    classBono: document.getElementById("inputClassBono").value
                }
            });
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            const url = process.env.REACT_APP_RUTA_ADMIN;
            fetch(`${url}${this.props.match.params.idInstancia}`, requestOptions)
                .then(response => response.text())
                .then(result => {
                    toast("BONO CREADO CON EXITO!", { type: "success" })
                    history.push(`/adminPanel/${this.props.match.params.idInstancia}`)
                }
                )
                .catch(error =>
                    toast("ERROR AL CREAR EL BONO", { type: "error" })
                );
        } else {
            let color = {
                color: 'red',
                borderColor: 'red'
            };
            this.setState({ style: color })
            toast("CAMPOS REQUERIDOS", { type: "error" });
        }
    }
    requirecamps() {

        let controlCamp = true;

        if (document.getElementById("title").value === '') controlCamp = false;
        if (document.getElementById("price").value === '') controlCamp = false;
        if (document.getElementById("maxBonos").value === '') controlCamp = false;
        if (document.getElementById("credit").value === '') controlCamp = false;
        if (document.getElementById("inputClassBono").value === '') controlCamp = false;

        if (controlCamp) {

            return controlCamp;

        } else {

            return controlCamp;
        }
    }
    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleChangeImage = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState(() => ({ image }));
            //cambiad style boton
            let dip = {
                diplay: 'inline',
            };
            this.setState({ styleButtonSubir: dip })
        }
    }
    handleChangeImage2 = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState(() => ({ image }));
            //cambiad style boton
            let dip = {
                diplay: 'inline',
            };
            this.setState({ styleButtonSubir2: dip })
        }
    }
    handleUpload = () => {
        const { image } = this.state;
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on('state_changed',
            () => {
                // complete function ....
                storage.ref('images').child(image.name).getDownloadURL().then(url => {
                    console.log(url);
                    this.setState({ url });
                })
            });
    }
    handleUpload2 = () => {
        const { image } = this.state;
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on('state_changed',
            () => {
                // complete function ....
                storage.ref('images').child(image.name).getDownloadURL().then(url2 => {
                    console.log(url2);
                    this.setState({ url2 });
                })
            });
    }

    render() {

        const { title } = this.state;
        const { value } = this.state;
        const { price } = this.state;
        const { location } = this.state;
        const { expiration } = this.state;
        const { description } = this.state;
        const { terms } = this.state;
        const { networkLinks } = this.state;
        const { maxBonos } = this.state;
        const { credit } = this.state;
        const { inputClassBono } = this.state;

        return (
            <div>
                <Nav
                    idInstancia={this.props.match.params.idInstancia} />
                <div className="form-row">
                    <div className="form-group col-md-4 mt-3">
                        <label style={this.state.style}>TITULO</label>
                        <input type="text" className="form-control" id="title" name="title" value={title} onChange={this.handleChange} />
                    </div>
                    <div class="form-group col-md-4 mt-3">
                        <label >VALOR</label>
                        <input type="text" className="form-control" id="value" name="value" value={value} onChange={this.handleChange} />
                    </div>
                    <div class="form-group col-md-4 mt-3">
                        <label style={this.state.style}>PRECIO</label>
                        <input type="text" className="form-control" id="price" name="price" value={price} onChange={this.handleChange} />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-4">
                        <label >LUGAR</label>
                        <input type="text" className="form-control" id="location" name="location" value={location} onChange={this.handleChange} />
                    </div>
                    <div class="form-group col-md-4">
                        <label >TIEMPO CADUCIDAD (DIAS)</label>
                        <input type="text" className="form-control" id="expiration" name="expiration" value={expiration} onChange={this.handleChange} />
                    </div>
                    <div class="form-group col-md-4">
                        <label style={this.state.style}>NUMERO DE SESIONES</label>
                        <input type="text" className="form-control" id="credit" name="credit" value={credit} onChange={this.handleChange} />
                    </div>
                </div>
                <div class="form-row">
                    <label >DESCRIPCION</label>
                    <input type="text" className="form-control" id="description" name="description" value={description} onChange={this.handleChange} />
                </div>
                <div class="form-row">
                    <label >TERMINOS</label>
                    <input type="text" className="form-control" id="terms" name="terms" value={terms} onChange={this.handleChange} />
                </div>
                <div class="form-row">
                    <div class="form-group col-md-4">
                        <label >RED SOCIAL</label>
                        <input type="text" className="form-control" id="networkLinks" name="networkLinks" value={networkLinks} onChange={this.handleChange} />
                    </div>
                    <div class="form-group col-md-4">
                        <label style={this.state.style}>MAXIMO DE BONOS</label>
                        <input type="text" className="form-control" id="maxBonos" name="maxBonos" value={maxBonos} onChange={this.handleChange} />
                    </div>
                    <div class="form-group col-md-4">
                        <label style={this.state.style}>CLASE DE BONOS</label>
                        <input type="text" className="form-control" id="inputClassBono" name="inputClassBono" value={inputClassBono} onChange={this.handleChange} />
                    </div>
                </div>
                <div className="row">
                            <div className="col-6">
                                <label>IMAGEN PRINCIPAL</label>
                                <input type="file" onChange={this.handleChangeImage}/>
                                <button className="btn btn-secondary btn-sm" onClick={this.handleUpload} style={this.state.styleButtonSubir}>SUBIR</button>
                                <img className="imgTamMax" src={this.state.url}/>
                            </div>
                            <div className="col-6">
                                <label>IMAGEN SECUNDARIA</label>
                                <input type="file" onChange={this.handleChangeImage2}/>
                                <button className="btn btn-secondary btn-sm" onClick={this.handleUpload2} style={this.state.styleButtonSubir2}>SUBIR</button>
                                <img className="imgTamMax" src={this.state.url2}/>
                            </div>
                        </div> 
                <button className="btn btn-primary mt-3" onClick={() => { this.updateBono() }}>GUARDAR CAMBIOS</button>
                <Footer />
            </div>
        )
    }
}
export default withRouter(newBono);