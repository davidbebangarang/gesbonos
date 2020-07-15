import React  from 'react'
import SwiftSlider from 'react-swift-slider'

  class CaruselClass extends React.Component{

    img() {
      var data2 = this.props.imagen;
      //console.log(data2, "estas son las imagenes")
      var arr = [];
        for (var key in data2) {
        arr.push(data2[key]);
      }
      var data = [];
      for (var i =0;i<arr.length;i++){
        data.push({'id':`${i+1}`,'src':arr[i]})
      }
        return data;
    }
    componentDidMount() {  
      this.img();    
    }

    render() {  
      return(
        <div> 
        <div className="container">                                       
            <SwiftSlider data={this.img()}/>                 
        </div>
      </div>   
      );
    }

  }
  export default CaruselClass;