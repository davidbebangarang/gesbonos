import React from 'react'
import {withRouter} from 'react-router-dom';
import { GoLocation } from "react-icons/go";
import logo from "../img/logo.jpg";
const Card = (props) => {

    const{history}=props
    let img;

    if(props.imagen===''){
        img=logo;
    }else{
        img=props.imagen;
    }
  
    return(
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">            
        <div className="card tarjeta" onClick={()=>history.push(`/Bono/${props.idInstancia}/${props.id}`)}>
            <img className="card-img-top" src={img} alt="Card cap"/>
            <div className="card-body">
                <h5 className="card-title text-center">{props.titulo}</h5>
                <hr></hr>
                <div className="row">
                    <div className="col-7">                          
                        <p className="card-text text-secondary"><GoLocation/> {props.ubicacion}</p>   
                    </div>
                    <div className="col-5">
                        <p className="card-text text-primary text-right"><h5>{props.precio}€</h5></p> 
                    </div>
                </div>                       
            </div>
        </div>
    </div>                          
    )
} 

export default withRouter(Card) ;