import React, {useState } from 'react';
import { Header, ActivosTabla } from '../components';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/client';


const Activos = () => {
 
  const activosGrid = [{field:'codigo', headerName:'Codigo', width:'70'},
  {field:'nombre', headerName:'Nombre', width:'100'},
  {field:'descripcion', headerName:'Descripción', width:'200'},
  {field:'categoria', headerName:'Categoría', width:'100'},
  {field:'etiqueta', headerName:'Etiqueta', width:'100'},
  {field:'clasificacion', headerName:'Clasificacion', width:'100'},
  {field:'nivel', headerName:'Nivel', width:'100'},
  {field:'valorGlobal', headerName:'Valor Global', width:'100'}]
 
  const [activosList, setActivosList] = useState([]);
   
  const cargarActivos = async () => {
    const querySnapshot = await getDocs(collection(db, 'Activos'));
    var activosL = [];
    
    querySnapshot.docs.forEach(doc => {
      var tmpData  = doc.data();
      var key = doc.id;
      activosL.push({key,
        ...tmpData});
    });
  
    setActivosList(activosL);
    console.log(activosList);
  }
 
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Página" title="Activos " />
      <button type='button'
                className='text-2x1 p-2
          hover:drop-shadow-xl
          hover:bg-light-gray
          text-white'
                style={{
                    background: 'green',
                    borderRadius: ''
                }}
                onClick={() => { cargarActivos() }}>
                Actualizar
            </button>
      <ActivosTabla data={activosList} columns = {activosGrid} />
      

    </div>
  );
};

export default Activos;