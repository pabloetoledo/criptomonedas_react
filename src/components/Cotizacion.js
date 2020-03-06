import React from 'react';

const Cotizacion = ({resultado}) => {

    if(Object.keys(resultado).length === 0) return null;

    return (  
        <div className="resultado">
            <h2>Resultado</h2>
            <p className="precio"> El precio es <span>{resultado.PRICE}</span></p>

            <p> El precio mas alto del dias es <span>{resultado.HIGHDAY}</span></p>
            <p> El precio mas bajo del dias es <span>{resultado.LOWDAY}</span></p>
            <p> Variacion ult 24 horas <span>{resultado.CHANGEPCT24HOUR}%</span></p>
            <p> Ultima actualizacion <span>{resultado.LASTUPDATE}</span></p>
        </div>
    );
}
 
export default Cotizacion;