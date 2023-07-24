import React, {useState } from 'react';
import { Header, VulnerabilidadTabla } from '../components';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/client';


const Vulnerabilidades = () => {
 
  const vulnerabilidadesGrid = [{field:'codigo', headerName:'Codigo', width:'70'},
  {field:'especificacion', headerName:'Especificacion', width:'100'},
  {field:'ambitos', headerName:'Ambito', width:'100'},
  {field:'calificacion', headerName:'Calificacion', width:'100'},
  {field:'severidad', headerName:'Severidad', width:'100'}]

  const [vulnerabilidadesList, setVulnerabilidadesList] = useState([]);
   
  const cargarVulnerabilidades = async () => {
    const querySnapshot = await getDocs(collection(db, 'Vulnerabilidades'));
    var vulnerabilidadesL = [];
    
    querySnapshot.docs.forEach(doc => {
      var tmpData  = doc.data();
      var key = doc.id;
      vulnerabilidadesL.push({key,
        ...tmpData});
    });
  
    setVulnerabilidadesList(vulnerabilidadesL);
    console.log(vulnerabilidadesList);
  }
 
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Página" title="Vulnerabilidades " />
      <button type='button'
                className='text-2x1 p-2
          hover:drop-shadow-xl
          hover:bg-light-gray
          text-white'
                style={{
                    background: 'green',
                    borderRadius: ''
                }}
                onClick={() => { cargarVulnerabilidades() }}>
                Actualizar
            </button>
            <VulnerabilidadTabla data={vulnerabilidadesList} columns = {vulnerabilidadesGrid} Tabla='Vulnerabilidades' crear='NuevoVulnerabilidad'/>
      

    </div>
  );
};

export default Vulnerabilidades;