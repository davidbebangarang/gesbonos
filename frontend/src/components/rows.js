import React from 'react'
import {withRouter} from 'react-router-dom';
import { GoLocation } from "react-icons/go";
import ModalDelete from './ModalDelete';
   
const rows=(props)=> {

    const{history}=props
    return(
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-4">   
            <nav className="navbar navbar-expand-lg navbar-light bg-light">                   
            <div className="navbar-collapse" id="navbarSupportedContent">
            <p className="navbar-brand">{props.titulo}</p>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active ml-6">
                        <p className="navbar-brand">  {props.precio}€</p>   
                    </li>
                    <li className="nav-item active ml-6">
                        <p className="navbar-brand"><GoLocation/> {props.ubicacion}</p> 
                    </li>
                </ul>  
                <button className="btn btn-outline-success my-2 my-sm-0 mr-3" type="submit" onClick={()=>history.push(`/editBono/${props.idInstancia}/${props.id}`)}>EDITAR</button>   
                <ModalDelete  idInstancia = {props.idInstancia} 
                              idBono = {props.id}
                              />
            </div>
            </nav>          
    </div>                          
    )
} 

export default withRouter(rows) ;