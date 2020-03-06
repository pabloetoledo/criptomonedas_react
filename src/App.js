import React, {useState, useEffect} from 'react';
import axios from 'axios';

import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Spinner from './components/Spinner';
import Cotizacion from './components/Cotizacion';

function App() {

  const [moneda, guardarMoneda] = useState('');
  const [cryptomoneda, guardarCryptomoneda] = useState('');
  const [cargando, guardarCargando] = useState(false);
  const [resultado, guardarResultado] = useState({})

  useEffect(
    () => {
      const cotizarCriptomoneda = async() => {

        //si no hay moneda no ejecutar
        if(moneda === '') return;

        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptomoneda}&tsyms=${moneda}`;

        const resultado = await axios.get(url);
        
        //mostrar spinner
        guardarCargando(true);

        setTimeout(() => {
            guardarCargando(false);
            guardarResultado(resultado.data.DISPLAY[cryptomoneda][moneda]);
        }, 3000);

      }

      cotizarCriptomoneda();
    }, [cryptomoneda, moneda]
  )

  //mostrar spinner

  const componente = (cargando) ? <Spinner/> : <Cotizacion resultado={resultado}/>;

  return (
    <div className="container">
      <div className="row">
        <div className="one-half column">
          <img src={imagen} alt="imagen cryptomoneda" className="logotipo"/>
        </div>
        <div className="one-half column">
          <h1>Cotiza Criptomonedas al instante</h1>
          <Formulario
            guardarMoneda = {guardarMoneda}
            guardarCryptomoneda = {guardarCryptomoneda}
          />
          {componente}
        </div>
      </div>      
    </div>
  );
}

export default App;
