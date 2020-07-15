import React, {Component} from 'react';
import {
    Link
  } from 'react-router-dom'

var usuario="";
class SearchUser extends Component {
    constructor(props){
        super(props);
        this.state={apiResponse:'',structedResponse:''};
        this.userId='';
        this.setUserId=this.setUserId.bind(this);
        this.getUserId=this.getUserId.bind(this);
    }
    
    setUserId(newUserId){
        console.log("el nuevo user id es: "+newUserId);
        usuario=newUserId;
        console.log("el user id es: "+usuario);
    }
    getUserId(){
        console.log("el user id que se va a enviar es: "+this.userId);
        return this.userId;
    }
    render() {
    return (
        <div>
            <form style={{textAlign:"center", width:"70%", marginLeft: "auto", marginRight: "auto", marginTop: "15%"}}>
                <div className="form-group">
                    <h2 className="block" htmlFor="DNI">Inserte su DNI</h2>
                    <input className="form-control" id="DNI" placeholder="Introduce DNI" onChange={(event)=>this.setUserId(event.target.value)}></input>
                </div>

                <Link to={{pathname:'/showBonos',
                            state:{
                                userId: usuario
                            }}} 
                type="submit" className="btn btn-primary" >Consultar Bonos</Link>
            </form>
        </div>
    );
    }
}

export default SearchUser;
