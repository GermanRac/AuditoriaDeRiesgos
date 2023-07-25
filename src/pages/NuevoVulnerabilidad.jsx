import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter, registerEventHandlers } from '@syncfusion/ej2-react-grids';
//import { activosData } from '../data/dummy';
import { Header } from '../components';

import { addDoc, collection } from 'firebase/firestore';
import { db } from '../config/client'


const NuevoVulnerabilidad = () => {

  const navigate = useNavigate();
  const ambitos = ['Procesos y procedimientos', 'Rutinas de gestión y documentación', 'Recursos humanos', 'Instalaciones físicas y prediales.', 'Configuración de los sistemas '];

  const severidad = ['Ninguna', 'Baja', 'Media', 'Alta', 'Critica'];
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [especificacionS, setEspecificacionS] = useState('');
  const [calificacionS, setCalificacionS] = useState(0);

  const [severidadS, setSeveridadS] = useState(severidad[0]);
  const [ambitoS, setAmbitoS] = useState(ambitos[0]);
  const [amenazaS, ] = useState('')

  const handleSubmitVulnerabilidad = async () => {

    //setValorTotalS ((valor1S+ valor2S + valor3S)/3.0);
    let catNivel = ""
    console.log(severidadS);
    console.log(catNivel);
    
    if (calificacionS > 8.9) {
      catNivel = severidad[4]
    } else if (calificacionS > 6.9) {
      catNivel = severidad[3]
    } else if (calificacionS > 3.9) {
      catNivel = severidad[2]
    } else if (calificacionS > 0.1) {
      catNivel = severidad[1]
    } else {
      catNivel = severidad[0]
    }

    let code = Math.floor(Math.random() * 100);
    const res = await addDoc(collection(db, "Vulnerabilidades"), {
      "fecha" : fechaSeleccionada,
      "codigo": code,
      "ambitos": ambitoS,
      "amenazas": amenazaS,
      "calificacion": calificacionS,
      "especificacion": especificacionS,
      "severidad": severidadS,
    });
    console.log(res);
    navigate('/Vulnerabilidades')
  }


  return (
    <div className="w-80% m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl" style={{ width: '200em' }}>
      <Header category="Page" title="Agregar vulnerabilidad" />

      <form onSubmit={() => { handleSubmitVulnerabilidad() }}>
      
      <label>Fecha 
          <br /><input
            className='w-96 m-200 border-solid border-sky-400 border-2'
            value={fechaSeleccionada}
            type="date"
            onChange={event => setFechaSeleccionada(event.target.value)}
            ></input>
        </label><br /><br />
        
        <label>Especificación
          <br /><input
            className='w-96 m-200 border-solid border-sky-400 border-2'
            value={especificacionS}
            type="text" onChange={event => setEspecificacionS(event.target.value)
            }></input>
        </label><br /><br />

        <label>Calificación
          <br /><input
            className='w-96 m-200 border-solid border-sky-400 border-2'
            value={calificacionS}
            type="text" onChange={event => setCalificacionS(event.target.value)
            }></input>
        </label><br /><br />

        <label>Severidad<br />
          <select defaultValue={severidad[0]} id='tipoSelect' onChange={e => setSeveridadS(e.target.value)}>
            {severidad.map(et => <>
              <option value={et}>{et}</option>
            </>)}
          </select>
        </label><br /><br />

        <label>Ambitos<br />
          <select defaultValue={ambitoS[0]} id='tipoSelect' onChange={e => setAmbitoS(e.target.value)}>
            {ambitos.map(et => <>
              <option value={et}>{et}</option>
            </>)}
          </select>
        </label><br /><br />

        <input
          value="Enviar"
          type="button"
          className='
                    mt-8
                    text-2x1 p-2
                    hover:drop-shadow-xl    
                  hover:bg-light-gray
                  text-white'
          style={{
            background: 'purple',
            borderRadius: ''
          }}
          onClick={() => { handleSubmitVulnerabilidad() }}></input>

      </form>


    </div>
  );
};

export default NuevoVulnerabilidad;