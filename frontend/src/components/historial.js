import React from 'react'

export default function HistorialTable(props) {
        
    return (
        <div className="container">                
            
            <table className="table table-hover mt-4">
                <thead>
                    <tr className="table-primary">
                        <th scope="col">Fecha</th>                        
                        <th scope="col">Precio</th>                        
                        <th scope="col">Estado</th>                      
                        <th scope="col">Tarjeta</th>                      
                    </tr>
                </thead>
                <tbody>
                    {
                        props.datos.map(row => (
                            <tr className="table-light">
                                <td>{row.fecha}</td>                                
                                <td>{row.precio/100} €</td>                                
                                <td>{row.estado}</td>
                                <td>** {row.tarjeta}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}