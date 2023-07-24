import React, { useState } from 'react';
import { Header, ControlesTabla } from '../components';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/client';


const Controles = () => {

  const controlesGrid = [{ field: 'codigo', headerName: 'Codigo', width: '70' },
  { field: 'control', headerName: 'Control', width: '100' },
  { field: 'contexto', headerName: 'Contexto', width: '100' },
  { field: 'discusion', headerName: 'Discusion', width: '100' },
  { field: 'tipoC', headerName: 'Tipo de control', width: '100' },
  { field: 'riesgo', headerName: 'Riesgo', width:'100'}]

  const [controlesList, setControlesList] = useState([]);

  const cargarControles = async () => {
    const querySnapshot = await getDocs(collection(db, 'Controles'));
    var controlesL = [];

    querySnapshot.docs.forEach(doc => {
      var tmpData = doc.data();
      var key = doc.id;
      controlesL.push({
        key,
        ...tmpData
      });
    });

    setControlesList(controlesL);
    console.log(controlesList);
  }

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Página" title="Controles " />
      <button type='button'
        className='text-2x1 p-2
          hover:drop-shadow-xl
          hover:bg-light-gray
          text-white'
        style={{
          background: 'green',
          borderRadius: ''
        }}
        onClick={() => { cargarControles() }}>
        Actualizar
      </button>
      <ControlesTabla data={controlesList} columns={controlesGrid} />


    </div>
  );
};

export default Controles;