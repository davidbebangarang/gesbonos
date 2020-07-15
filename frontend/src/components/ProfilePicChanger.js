import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';

class ProfilePicChanger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      imagesArray: [props.pic1, props.pic2, props.pic3, props.pic4, props.pic5, props.pic6, props.pic7, props.pic8]
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    const imageMapper = this.state.imagesArray.map((image, index)=>{
      return(
        <img src={image} alt="avatar"
          onClick={() => this.props.handleImageChange(image)}
        />
      )
    })
    return (
      <div className="ProfilePicChanger">
        <Button type="primary" className="btn btn-primary" onClick={this.showModal}>
          Mi avatar
        </Button>
        <Modal
          title="Elige tu Avatar"          
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {imageMapper}
        </Modal>
      </div>
    );
  }
}

export default ProfilePicChanger;
