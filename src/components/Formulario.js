import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Cryptomoneda from './Cryptomoneda';
import Error from './Error';

function Formulario({guardarMoneda, guardarCryptomoneda}){

    const [cryptomonedas, guardarCryptomonedas] = useState([]);
    const [monedaCotizar, guardarMonedaCotizar] = useState('');
    const [criptoCotizar, guardarCriptoCotizar] = useState('');
    const [error, guardarError] = useState(false);

    useEffect(
        ()=>{
            const consultarAPI = async () => {
                const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=15&tsym=USD`;

                const resultado = await axios.get(url);    
                
                guardarCryptomonedas(resultado.data.Data);
            }

            consultarAPI();

        }, []
    )

    const cotizarMoneda = e =>{
        e.preventDefault();

        if(monedaCotizar === '' || criptoCotizar === ''){
            guardarError(true);
            return;
        }

        guardarMoneda(monedaCotizar);
        guardarCryptomoneda(criptoCotizar);
        guardarError(false);

    }

    const componente = (error) ? <Error mensaje="Ambos campos son obligatorios"/> : null;

    return(
        
        <form className="row"
             onSubmit={cotizarMoneda}
            >
        {componente}        
        <div className="row">
            <label>Elige tu Monera</label>
            <select 
                className="u-full-width"
                onChange={e=>guardarMonedaCotizar(e.target.value)}    
                >
                <option value="">Elige tu Monera</option>
                <option value="USD">Dolar Estadounidence</option>
                <option value="ARS">Peso Argentino</option>
                <option value="EUR">Euro</option>
            </select>
        </div>        

        <div className="row">
            <label>Elige tu Criptomoneda</label>
            <select 
               className="u-full-width"
               onChange={e=>guardarCriptoCotizar(e.target.value)} 
               >
                <option value="">Elige tu Criptomoneda</option>   
                {
                    cryptomonedas.map(cryptomoneda =>(
                        <Cryptomoneda
                            key={cryptomoneda.CoinInfo.Id}
                            cryptomoneda = {cryptomoneda}
                        />
                    ))
                }    
            </select>    
        </div>

        <input type="submit" className="button-primary u-full-width"  value="Calcular"/>

        </form>
    )
}

export default Formulario;