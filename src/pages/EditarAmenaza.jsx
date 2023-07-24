import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from '../components';

import { setDoc, doc } from 'firebase/firestore';
import { db } from '../config/client'



const EditarAmenaza = () => {

    const location = useLocation();
    const data = location.state.data;
    const navigate = useNavigate();
    const Tipo = ['Hardware', 'Software', 'Error de uso', 'Desastre Natural'];
    const Origen = ['Entorno', 'Humano', 'Software', 'Soporte'];
    const Dimension = ['Disponibilidad', 'Integridad', 'Confidencionalidad'];
    const [nombreS, setNombreS] = useState('');
    const [descripcionS, setDescripcionS] = useState('');
    const [TipoS, setTipoS] = useState(Tipo[0]);
    const [OrigenS, setOrigenS] = useState(Origen[0]);
    const [DimensionS, setDimensionS] = useState(Dimension[0]);

    const handleSubmitAmenaza = async () => {
        let code = Math.floor(Math.random() * 100);

        const res = await setDoc(doc(db, "Amenazas", data.key), {
            codigo: "AMZ-" + code,
            nombre: nombreS,
            descripcion: descripcionS,
            tipo: TipoS,
            origen: OrigenS,
            dimension: DimensionS
        });
        console.log(res);
        navigate('/Amenazas')
    }


    return (
        <div className="w-80% m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl" style={{ width: '200em' }}>
            <Header category="Página" title="Editar Amenaza" />

            <form onSubmit={() => { handleSubmitAmenaza() }}>
                <label>Nombre
                    <br /> <input
                        className='w-96 m-200 border-solid border-sky-400 border-2'
                        defaultValue={data.nombre}
                        type="text"
                        
                        onChange={event => setNombreS(event.target.value)
                        }></input>
                </label> <br />
                <br />
                <label>Descripción
                    <br /> <input
                        className='w-96 m-200 border-solid border-sky-400 border-2'
                        defaultValue={data.descripcion}
                        type="text" 
                        onChange={e => setDescripcionS(e.target.value)}></input>
                </label><br /><br />

                <label>Tipo <br />
                    <select defaultValue={data.tipo} id='tipoSelect' onChange={e => setTipoS(e.target.value)}>
                        {Tipo.map(et => <>
                            <option key = {data.codigo} value={et}>{et}</option>
                        </>)}
                    </select>
                </label><br /><br />

                <label>Origen <br />
                    <select defaultValue={data.origen} id='origenSelect' onChange={e => setOrigenS(e.target.value)}>
                        {Origen.map(et => <>
                            <option key = {data.codigo} value={et}>{et}</option>
                        </>)}
                    </select>
                </label><br /><br />

                <label>Dimension <br />
                    <select defaultValue={data.dimension} id='DimensionSelect' onChange={e => setDimensionS(e.target.value)}>
                        {Dimension.map(et => <>
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
                    onClick={() => { handleSubmitAmenaza() }}></input>

            </form> <br /><br />

            <br /> <br />


        </div>

    );
};

export default EditarAmenaza;