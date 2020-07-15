import React, {Component} from 'react';


class ShowBonosConsumo extends Component {
    constructor(props){
        super(props);
        this.state={apiResponse:'',structedResponse:''};
        this.url = process.env.REACT_APP_RUTA_USERS;
        this.classes=["fisioterapia","baile","yoga","e. funcional"];
    }
    
    callAPI(userId,idInstance){
        
        fetch(this.url, {
            "method": "POST",
            "body": JSON.stringify({"userId":userId,
                                    "idInstance": "fisioproyectos"
                                    }),
            "headers": {
            "content-type": "application/json"
            }
        })
        .then(res=>res=this.structResponse(res))//[{"A":1},{"B":4}]
        .then(res=>this.setState({apiResponse:res}))
        .catch(err=>this.setState({apiResponse:"No se han encontrado bonos de: "+userId}))
    }

    consumeBono(userId,actividad){
        fetch(this.url, {
            "method": "PATCH",
            "body": JSON.stringify({userId,actividad}),
            "headers": {
            "content-type": "application/json"
            }
        })

        .then(res=>res=this.structResponse(res))
        .then(res=>this.setState({apiResponse:res}))
        .catch(err=>this.setState({apiResponse:"No se han encontrado bonos de: "+userId}))
    }
    
    async structResponse(res){
        
        return new Promise((resolve,reject)=>
        {
            /*for (var clave in json){
            }*/
          res.text()
          .then(data=>{
            console.log(data);
            const bonos=JSON.parse(data).body;
            let card=[]
            let solution=[]            
            for(let i=0;i<bonos.length;i++){
                for(let clave in bonos[i]){
                    if(bonos[i][clave]!==0 && bonos[i][clave]!=='0'){
                        solution.push( 
                          <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">   
                                  <div class="card tarjeta mb-3 item-centrado">
                                      <img className="card-img-top" alt="Imagen" src="https://thumbs.subefotos.com/06d5c633285f1dc69fa200d0d56d7171o.jpg"/>
                                      <div class="card-body">
                                          <h5 class="card-title">{clave}</h5>
                                          <h6 class="card-text mt-4 mb-4">Disponibles <span class="badge badge-success badge-pill">{bonos[i][clave]}</span></h6>
                                          <button className="btn btn-primary" onClick={()=>this.consumeBono(this.props.userId,clave)}>
                                              Comsumir
                                          </button>
                                      </div>
                                  </div>
                          </div>                   
                        );
                    }
                }
            }
            card.push(<div className="row justify-content-left mt-5">{solution}</div>)
            resolve(card);
          })
        });
    }
    componentDidMount(){
        this.callAPI(this.props.userId);
    }
    render() {
        return (
            <div className="container">
                <h3 className="centrado mt-3">Bonos disponibles:</h3>               
                {this.state.apiResponse}
                <div className="row">
                    <div className="col-4"></div>
                    <div className="col-4"><a className="btn btn-lg btn-block btn-primary" href={`/${this.props.idInstancia}`}>Comprar más bonos</a></div>
                    <div className="col-4"></div>
                </div>
                
            </div>
        );
    }
}

export default ShowBonosConsumo;