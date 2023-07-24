import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from '../components';

import { setDoc, doc } from 'firebase/firestore';
import { db } from '../config/client'



const EditarReporte = () => {

    const location = useLocation();
    const data = location.state.data;
    const navigate = useNavigate();
    const Riesgo = ['aplicación web (SPA)', 'Niveles de autenticación', 'Configuración del servidor', 'Actualizaciones y parches de seguridad','Configuración del firewall y del router'];
    const especificacion = ['Vulnerabilidades de software', 'Falta de actualizaciones y parches', 'Contraseñas débiles', 'Acceso no autorizado','Malware y ransomware'];
    const Activo = ['Servicios', 'Datos e información', 'Aplicaciones Software.', 'Equipos informáticos','Personal'];
    const Vulnerabilidad = ['inyección de SQL', 'cross-site scripting', 'desbordamiento de búfer', 'servicios innecesarios que se ejecutan en el servidor','puertos abiertos'];
    const Amenaza = ['Entorno', 'Humano', 'Software', 'Soporte'];
    const Probabilidad = ['Bajo', 'Medio', 'Alto'];
    const Ponderacion = ['1','2','3','4','5'];

    const [RiesgoS, setRiesgoS] = useState(Riesgo[0]);
    const [especificacionS, setEspecificacionS] = useState(especificacion[0]);
    const [ActivoS, setActivoS] = useState(Activo[0]);
    const [VulnerabilidadS, setVulnerabilidadS] = useState(Vulnerabilidad[0]);
    const [AmenazaS, setAmenazaS] = useState(Amenaza[0]);
    const [ProbabilidadS, setProbabilidadS] = useState(Probabilidad[0]);
    const [PonderacionS, setPonderacionS] = useState(Ponderacion[0]); //cambiar a contexto ? 

    const handleSubmitReporte = async () => {
        let code = Math.floor(Math.random() * 100);

        const res = await setDoc(doc(db, "Riesgos", data.key), {
            riesgo: Riesgo,
            especificacion: especificacion,
            activo: Activo,
            vulnerabilidad: Vulnerabilidad,
            amenaza : Amenaza,
            probabilidad: Probabilidad,
            fecha: new Date(),
            ponderacion : Ponderacion
        });
        console.log(res);
        navigate('/Amenazas')
    }


    return (
        <div className="w-80% m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl" style={{ width: '200em' }}>
            <Header category="Página" title="Editar Amenaza" />

            <form onSubmit={() => { handleSubmitReporte() }}>
                
              

                <label>Riesgo <br />
                    <select defaultValue={data.riesgo} id='riesgoSelect' onChange={e => setRiesgoS(e.target.value)}>
                        {Riesgo.map(et => <>
                            <option key = {data.codigo} value={et}>{et}</option>
                        </>)}
                    </select>
                </label><br /><br />

                <label>Especificacion <br />
                    <select defaultValue={data.especificacion} id='especificacionSelect' onChange={e => setEspecificacionS(e.target.value)}>
                        {especificacion.map(et => <>
                            <option key = {data.codigo} value={et}>{et}</option>
                        </>)}
                    </select>
                </label><br /><br />

                <label>Activo <br />
                    <select defaultValue={data.activo} id='activoSelect' onChange={e => setActivoS(e.target.value)}>
                        {Activo.map(et => <>
                            <option key = {data.codigo} value={et}>{et}</option>
                        </>)}
                    </select>
                </label><br /><br />

                <label>Vulnerabilidad <br />
                    <select defaultValue={data.vulnerabilidad} id='vulnerabilidadSelect' onChange={e => setVulnerabilidadS(e.target.value)}>
                        {Vulnerabilidad.map(et => <>
                            <option key = {data.codigo} value={et}>{et}</option>
                        </>)}
                    </select>
                </label><br /><br />

                <label>Amenaza <br />
                    <select defaultValue={data.amenaza} id='amenazaSelect' onChange={e => setAmenazaS(e.target.value)}>
                        {Amenaza.map(et => <>
                            <option key = {data.codigo} value={et}>{et}</option>
                        </>)}
                    </select>
                </label><br /><br />

                <label>Probabilidad <br />
                    <select defaultValue={data.probabilidad} id='probabilidadSelect' onChange={e => setAmenazaS(e.target.value)}>
                        {Probabilidad.map(et => <>
                            <option key = {data.codigo} value={et}>{et}</option>
                        </>)}
                    </select>
                </label><br /><br />

                <label>Ponderacion<br/>
                <select defaultValue={data.ponderacion} id='ponderacionSelect' onChange={e => setPonderacionS(e.target.value)}>
                        {Ponderacion.map(et => <>
                            <option key = {data.codigo} value={et}>{et}</option>
                        </>)}
                    </select>
                </label><br /><br />

                <input
                    value="Guardar"
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
                    onClick={() => { handleSubmitReporte() }}></input>

            </form> <br /><br />

            <br /> <br />


        </div>

    );
};

export default EditarReporte;