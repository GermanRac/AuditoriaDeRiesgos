import React, { useState } from 'react';
//import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';

import { collection, getDocs } from 'firebase/firestore';
//import { useEffect } from 'react';
import { db } from '../config/client';
import { Header, ReporteTabla } from '../components';


function Reporte() {

  const reporteGrid = [
    { field: 'fecha', headerName: 'Fecha', width: '100' },
    { field: 'riesgo', headerName: 'Riesgo', width: '100' },
    { field: 'especificacion', headerName: 'Especificacion', width: '200' },
    { field: 'activo', headerName: 'Activo', width: '150' },
    { field: 'vulnerabilidad', headerName: 'Vulnerabilidad', width: '150' },
    { field: 'amenaza', headerName: 'Amenaza', width: '150' },
    { field: 'probabilidad', headerName: 'Probabilidad', width: '150' },
    { field: 'ponderacion', headerName: 'Ponderacion', width: '150' }]




  const [reporteList, setReporteList] = useState([]);


  const cargarReporte = async () => {
    const querySnapshot = await getDocs(collection(db, 'Riesgos'));
    var reporteL = [];

    querySnapshot.docs.forEach(doc => {
      var tmpData = doc.data();
      var key = doc.id;
      reporteL.push({
        key,
        ...tmpData
      });
    });
    setReporteList(reporteL);
    console.log(reporteList);
  }


  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Página" title="Reporte" />
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
          cargarReporte();
          
        }}>
        Actualizar
      </button>


      <ReporteTabla data={reporteList} columns={reporteGrid} />
    </div>
  );
}

export default Reporte