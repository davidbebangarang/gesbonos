import React from 'react'
import {withRouter} from 'react-router-dom';

const Tema = (props) => {

    const{history}=props
    

    return(
        <div class="dropdown">
            <button type="button" class="btn btn-outline-success nuevoBono dropdown-toggle" data-toggle="dropdown">
                TEMAS WEB
            </button>
            <div class="dropdown-menu">
                <a class="dropdown-item" >Cosmo</a>
                <a class="dropdown-item" href="#">Darlky</a>
                <a class="dropdown-item" href="#">Flatly</a>
                <a class="dropdown-item" href="#">Journal</a>
                <a class="dropdown-item" href="#">Sandstone</a>
                <a class="dropdown-item" href="#">Solar</a>
                <a class="dropdown-item" href="#">United</a>
            </div>
        </div>                          
    )
} 

export default withRouter(Tema) ;