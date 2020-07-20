import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import {withRouter} from 'react-router-dom';


toast.configure();

class Payment extends React.Component { 


 render() { 
      
       const {history,idInstancia,publicKey}=this.props
       let style;
       let userLog = JSON.parse(localStorage.getItem("user"))

       const product = {
          title: this.props.title,
          price: this.props.price,   
          bonoId: this.props.idBono,
          userData: {
            name: this.props.name,
            full_name:this.props.full_name,
            email:userLog? userLog.email: "",
            //country:this.props.country,
            address:this.props.adress,
            field_1:this.props.provincia,
            field_2:this.props.postCode         
            }
        }; 
        
        if(this.props.control){
          style = {  
            opacity: "1",
            disabled : false
          };  
        }else{
          style = {
            pointerEvents: "none", 
            opacity: "0.4",
            disabled : true
          };  
        }
              
       async function handleToken(token) {
         
          const url = process.env.REACT_APP_RUTA_CHECKOUT;
          product.userData.email = token.email;
          const response = await axios.post(`${url}${idInstancia}`,{token, product}); 
          const { status } = response.data;
          console.log("Response:", response.data);
          if (status === "success") {
            toast("Compra realizada con éxito!!!", { type: "success" });
            history.push(`/${idInstancia}`);
          } else {
            toast("Error en la compra!!!", { type: "error" });
          }     
      };

      console.log(publicKey)
       return (         
        <div style={style} >   
          <StripeCheckout
            stripeKey="pk_test_4WAw3i1QHZJVrCXbwKROnmVA00ddoTVBHX"
            token={handleToken}                
            amount={product.precio* 100}
            name={product.title}
            currency="EUR"
            email= {product.userData.email}            
          >
            <button  className="btn btn-block btn-primary" >Comprar</button>
          </StripeCheckout>
         </div>       
      );
 } 
}
export default withRouter (Payment)