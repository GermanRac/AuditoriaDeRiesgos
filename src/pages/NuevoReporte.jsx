import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter, registerEventHandlers } from '@syncfusion/ej2-react-grids';
//import { activosData } from '../data/dummy';
import { Header } from '../components';

import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../config/client'


const NuevoRiesgo = (props) => {

    //////////////////////////////////

    const [activosList, setActivosList] = useState([{id:1, ejemplo:"ejemplo"}]);
    const cargarActivos = async () => {
        const querySnapshot = await getDocs(collection(db, 'Activos'));
        var activosL = [];

        querySnapshot.docs.forEach(doc => {
            var tmpData = doc.data();
            var key = doc.id;
            activosL.push({
                key,
                ...tmpData
            });
        });

        setActivosList(activosL);
        // console.log(activosList);
    }


  
    const [vulnerabilidadesList, setVulnerabilidadesList] = useState([]);


    const cargarVulnerabilidades = async () => {
        const querySnapshot = await getDocs(collection(db, 'Vulnerabilidades'));
        var vulnerabilidadesL = [];

        querySnapshot.docs.forEach(doc => {
            var tmpData = doc.data();
            var key = doc.id;
            vulnerabilidadesL.push({
                key,
                ...tmpData
            });
        });

        setVulnerabilidadesList(vulnerabilidadesL);
        //  console.log(vulnerabilidadesList);
    }

    /////////////////////////////////


    const navigate = useNavigate();
    /*const selectionsettings = { persistSelection: true };
    const toolbarOptions = ['Delete'];
    const editing = { allowDeleting: true, allowEditing: true };*/
    const contexto = ['Relaciones contractuales y los compromisos',
        'Complejidad de redes y dependencias',
        'Ubicación geográfica.',
        'Estado político y económico de la nación',
        'Visión y misión',
        'Gobernanza y roles',
        'Datos del sistema y flujo de información'];
    const probabilidad = ['Bajo', 'Medio', 'Alto'];
    const amenaza = ['Crossite XXS',
        'Code Injection'];

    const [riesgoS, setRiesgoS] = useState('');
    const [activoS, setActivoS] = useState([{}]);
    const [contextoS, setContextoS] = useState(contexto[0]);
    const [probabilidadS, setProbabilidadS] = useState(probabilidad[0]);
    const [amenazaS, setAmenazaS] = useState(amenaza[0]);
    const [amenaS, setAmenaS] = useState("");
    const [vulneS, setVulneS] = useState("");
    const [vulnerabilidadS, setVulnerabilidadS] = useState([{id:1, value:"1"}]);
    const [especificacionS, setEspecificacionS] = useState("");

    // const [valorTotalS, setValorTotalS] = useState(0.1);
    //

    const handleActivo =() =>{
       // console.log(activoS);
        for(var i = 0; i< activosList.length;i++){
            if(activoS === activosList[i].nombre){
                if(activosList[i].vulnerabilidades != null){
                    let newArray = activosList[i].vulnerabilidades.map((value, index) => {
                        return {
                            id: index,
                            value: value
                        }
                        
                    });
                    setVulnerabilidadS(newArray);
                //console.log(vulnerabilidadS);
                } else {
                    setVulnerabilidadS([{id:1, value:"1"}]);
                    setAmenazaS([{id:1, value:"1"}]);
                }
                
                
                
            }
        }
    }


    
    const handleVulnerabilidad =() =>{
       // console.log(vulneS);
       
        for(var i = 0; i< vulnerabilidadesList.length;i++){
            if(vulneS === vulnerabilidadesList[i].especificacion){
                if(vulnerabilidadesList[i].amenazas != null){
                    let newArray = vulnerabilidadesList[i].amenazas.map((value, index) => {
                        return {
                            id: index,
                            value: value
                        }
                        
                    });
                    setAmenazaS(newArray);
                    console.log(amenazaS);
                    return;
                } else {
                    //setAmenazaS([{id:1, value:"1"}]);
                    
                }
            }
        }
    }
    

    const handleSubmitRiesgo = async () => {

        //setValorTotalS ((valor1S+ valor2S + valor3S)/3.0);

        const res = await addDoc(collection(db, "Riesgos"), {
            activo: activoS,
            amenaza: amenaS,
            contexto: contextoS,
            especificacion: especificacionS,
            probabilidad: probabilidadS,
            riesgo: riesgoS,
            fecha: new Date(),
            vulnerabilidad: vulneS
        });
        console.log(res);

        navigate('/Riesgos')
    }


    return (
        <div className="w-80% m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl" style={{ width: '200em' }}>
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
                    cargarActivos();
                    cargarVulnerabilidades();
                    handleActivo();
                    handleVulnerabilidad();
                   // console.log(vulnerabilidadesList);
                }}>Actualizar</button>
            <Header category="Page" title="Agregar riesgo" />

            <form onSubmit={() => { handleSubmitRiesgo() }}>
                <label>Riesgo
                    <br /><input
                        className='w-96 m-200 border-solid border-sky-400 border-2'
                        value={riesgoS}
                        type="text" onChange={event => setRiesgoS(event.target.value)
                        }></input>
                </label>
                <br /><br />
                <label>Especificacion
                    <br /><input
                        className='w-96 m-200 border-solid border-sky-400 border-2'
                        value={especificacionS}
                        type="text" onChange={e => setEspecificacionS(e.target.value)}></input>
                </label><br /><br />
                <label>Activo
                    <br />

                    <select onChange={e => setActivoS(e.target.value)} >
                        {activosList.map((activos) => (
                            <option key={activos.id}value={activos.nombre}>{activos.nombre}</option>
                        ))}
                    </select>

                </label><br /><br />
                <label>Vulnerabilidad
                    <br />
                    <select onChange={(e)=>setVulneS(e.target.value)} >
                        {vulnerabilidadS.map((vulnerabilidad) => (
                            <option key={vulnerabilidad.id} value={vulnerabilidad.value}>{vulnerabilidad.value}</option>
                        ))}
                    </select>


                </label><br /><br />
                <label>Amenaza
                    <br />
                    <select defaultValue={contexto[0]} id='categoriaSelect' onChange={e => setAmenaS(e.target.value)}>
                        <option value={amenaza[0]}>{amenaza[0]}</option>
                        <option value={amenaza[1]}>{amenaza[1]}</option>

                    </select>

                </label><br /><br />
                <label>Contexto <br />
                    <select defaultValue={contexto[0]} id='categoriaSelect' onChange={e => setContextoS(e.target.value)}>
                        <option value={contexto[0]}>{contexto[0]}</option>
                        <option value={contexto[1]}>{contexto[1]}</option>
                        <option value={contexto[2]}>{contexto[2]}</option>
                        <option value={contexto[3]}>{contexto[3]}</option>
                        <option value={contexto[4]}>{contexto[4]}</option>
                        <option value={contexto[5]}>{contexto[5]}</option>
                        <option value={contexto[6]}>{contexto[6]}</option>
                    </select>
                </label><br /><br />
                <label>Probabilidad<br />
                    <select defaultValue={probabilidad[0]} id='etiquetaSelect' onChange={e => setProbabilidadS(e.target.value)}>
                        <option value={probabilidad[0]}>{probabilidad[0]}</option>
                        <option value={probabilidad[1]}>{probabilidad[1]}</option>
                        <option value={probabilidad[2]}>{probabilidad[2]}</option>
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
                    onClick={() => { handleSubmitRiesgo() }}></input>

            </form>


        </div>
    );
};

export default NuevoRiesgo;