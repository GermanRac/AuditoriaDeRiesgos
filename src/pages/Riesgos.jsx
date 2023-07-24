import React, { useState } from 'react';
//import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';

import { collection, getDocs } from 'firebase/firestore';
//import { useEffect } from 'react';
import { db } from '../config/client';
import { Header, RiesgosTabla } from '../components';


function Riesgos() {

  const riesgosGrid = [
    { field: 'riesgo', headerName: 'Riesgo', width: '100' },
    { field: 'especificacion', headerName: 'Especificacion', width: '200' },
    { field: 'activo', headerName: 'Activo', width: '150' },
    { field: 'vulnerabilidad', headerName: 'Vulnerabilidad', width: '150' },
    { field: 'amenaza', headerName: 'Amenaza', width: '150' },
    { field: 'contexto', headerName: 'Contexto', width: '150' },
    { field: 'probabilidad', headerName: 'Probabilidad', width: '150' }]




  const [riesgosList, setRiesgosList] = useState([]);


  const cargarRiesgos = async () => {
    const querySnapshot = await getDocs(collection(db, 'Riesgos'));
    var riesgosL = [];

    querySnapshot.docs.forEach(doc => {
      var tmpData = doc.data();
      var key = doc.id;
      riesgosL.push({
        key,
        ...tmpData
      });
    });
    setRiesgosList(riesgosL);
    console.log(riesgosList);
  }


  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Página" title="Riesgos" />
      <button type='button'
        className='text-2x1 p-2
          hover:drop-shadow-xl
          hover:bg-light-gray
          text-white'
        style={{
          background: 'green',
          borderRadius: ''
        }}
        onClick={() => {
          cargarRiesgos();
          
        }}>
        Actualizar
      </button>


      <RiesgosTabla data={riesgosList} columns={riesgosGrid} />
    </div>
  );
}

export default Riesgos