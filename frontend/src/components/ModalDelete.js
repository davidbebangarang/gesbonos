import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
//import {storageRef} from '../firebase';


const  ModalDelete= (props) => {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleAcept = () => {

    const url = process.env.REACT_APP_RUTA_ADMIN;
    var myHeaders = new Headers();
    var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
    };
  
    fetch(`${url}${props.idInstancia}/${props.idBono}`, requestOptions)
    .then(response => response.text())
    .then(result => 
          console.log(props.idInstancia,props.idBono, 'campos recibidos'),
          /**
           * var url = props.urlCardImages
        //var name = url.pathname;
        console.log(url, "esto devuelve pathname");
          //eliminamos las imagenes
          // Create a reference to the file to delete
          /*var desertRef = storageRef.child('images/1.png');
            desertRef.delete().then(function() {
              console.log('imagen eliminada')
            }).catch(function(error) {
              console.log("fallo al eliminar imagen")
            });
           */
         
        )
    .catch(error => console.log('error', error));
    setOpen(false); 
  };

  return (
    <div>
      <button className="btn btn-outline-danger my-2 my-sm-0"  onClick={handleClickOpen}> 
        ELIMINAR
      </button>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"ESTA APUNTO DE ELIMINAR UN BONO"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            El Bono sera eliminado de su cuenta definitivamente.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button className="btn btn-outline-success my-2 my-sm-0 mr-3" onClick={handleCancel} color="primary" autoFocus>
            Cancelar
          </button>
          <button className="btn btn-outline-danger my-2 my-sm-0 mr-3" onClick={handleAcept} color="primary" >
            Aceptar
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default ModalDelete ;