import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { toast } from "react-toastify";

const  ModalBook= (props) => {  

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleAcept = () => {

    const url2 = process.env.REACT_APP_RUTA_BOOK;
    const idInstance = props.idInstance;
    const idBono = props.idBono;
    const email = props.email;
    const dni = props.dni;

    var formdata = new FormData();
    formdata.append("bonoId", idBono);
    formdata.append("email", email);
    formdata.append("name", dni);

    var requestOptions = {
       method: 'POST',
       body: formdata,
       redirect: 'follow'
    };

    console.log('isntanvia en el componente ',idInstance)
    fetch(`${url2}${idInstance}`, requestOptions)
       .then(response => response.json())
       .then(result => {
          console.log(result)
          if (result.status === 'failure') {
             toast("FALLO EN LA RESERVA", { type: "error" })
          } else {
             toast("RESERVA REALIZADA CON EXITO!", { type: "success" })
            
          }
       }
       )
       .catch(error =>
          toast("FALLO EN LA RESERVA", { type: "error" })
       );


    setOpen(false); 
  };

  return (
    <div className="col-12 mt-2">
      <button className="btn btn-success todoAncho"  onClick={handleClickOpen}> 
        Reserva
      </button>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Reserva de bono."}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Desea reserver este bono?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button className="btn btn-outline-danger my-2 my-sm-0 mr-3" onClick={handleCancel} color="primary" autoFocus>
            Cancelar
          </button>
          <button className="btn btn-outline-success my-2 my-sm-0 mr-3" onClick={handleAcept} color="primary" >
            Aceptar
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default ModalBook ;