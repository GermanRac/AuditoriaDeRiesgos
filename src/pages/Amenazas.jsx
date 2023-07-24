import React, {useState } from 'react';
import { Header, AmenazasTabla } from '../components';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/client';


const Amenazas = () => {
 
  const amenazasGrid = [{field:'codigo', headerName:'Codigo', width:'100'},
  {field:'nombre', headerName:'Nombre', width:'150'},
  {field:'descripcion', headerName:'Descripcion', width:'150'},
  {field:'tipo', headerName:'Tipo', width:'150'},
  {field:'origen', headerName:'Origen', width:'150'},
  {field:'dimensiones', headerName:'Dimension', width:'150'},
  ]
  
  const [amenazasList, setAmenazasList] = useState([]);
   
  const cargarAmenazas = async () => {
    const querySnapshot = await getDocs(collection(db, 'Amenazas'));
    var amenazasL = [];
    
    querySnapshot.docs.forEach(doc => {
      var tmpData  = doc.data();
      var key = doc.id;
      amenazasL.push({key,
        ...tmpData});
    });
  
    setAmenazasList(amenazasL);
    console.log(amenazasList);
  }
 
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Página" title="Amenazas " />
      <button type='button'
                className='text-2x1 p-2
          hover:drop-shadow-xl
          hover:bg-light-gray
          text-white'
                style={{
                    background: 'green',
                    borderRadius: ''
                }}
                onClick={() => { cargarAmenazas() }}>
                Actualizar
            </button>
      <AmenazasTabla data={amenazasList} columns = {amenazasGrid} />
      

    </div>
  );
};

export default Amenazas;