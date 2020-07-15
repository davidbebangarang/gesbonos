import React, {Component} from 'react';
import {
    Redirect
  } from 'react-router-dom'

class SearchUserConsumo extends Component {
    constructor(props){
        super(props);
        this.state={apiResponse:'',structedResponse:''};
        this.userId='';
        this.state.submited=false;
        this.setUserId=this.setUserId.bind(this);
        this.getUserId=this.getUserId.bind(this);

    }

    setUserId(newUserId){
        console.log("el nuevo user id es: "+newUserId);
        this.userId=newUserId;
        console.log("el user id es: "+this.userId);
    }

    getUserId(){
        console.log("el user id que se va a enviar es: "+this.userId);
        return this.userId;
    }

    redirection(){
        this.setState(()=>({
            submited: true
        }))
    }

    render() {
        if(this.state.submited===true){
            return <Redirect to={{pathname:'/consumo',
                            state:{
                                userId: this.userId
                            }}}/>
        }
        return (
            <div>
                <form style={{textAlign: "center", marginLeft:"auto",marginRight:"auto",width:"70%", marginTop: "15%"}} onSubmit={()=>{this.redirection()}}>
                    <div className="form-group">
                        <h2 className="block" htmlFor="DNI" >Inserte su DNI:</h2>
                        <input className="form-control" id="DNI" placeholder="Introduce DNI" onChange={(event)=>this.setUserId(event.target.value)}></input>
                    </div>

                    <button type="submit" className="btn btn-primary" >Consultar Bonos</button>
                </form>
            </div>
        );
    }
}

export default SearchUserConsumo;

