import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../config/client'


const NuevoAmenaza = () => {

    const navigate = useNavigate();
    const Tipo = ['Hardware', 'Software', 'Error de uso', 'Desastre Natural'];
    //clasificaciones
    const Origen = ['Entorno', 'Humano', 'Software', 'Soporte'];
    //nivel
    const Dimension = ['Disponibilidad', 'Integridad', 'Confidencionalidad'];

    const [nombreS, setNombreS] = useState('');
    const [descripcionS, setDescripcionS] = useState('');
    const [TipoS, setTipoS] = useState(Tipo[0]);
    const [OrigenS, setOrigenS] = useState(Origen[0]);
    const [DimensionS, setDimensionS] = useState(Dimension[0]);

    const handleSubmitAmenaza = async () => {

        //setValorTotalS ((valor1S+ valor2S + valor3S)/3.0);
        let code = Math.floor(Math.random() * 1000);
        const res = await addDoc(collection(db, "Amenazas"), {
            "codigo": "AMZ-" + code,
            "nombre": nombreS,
            "descripcion": descripcionS,
            "tipo": TipoS,
            "origen": OrigenS,
            "dimensiones": DimensionS

        });
        console.log(res);
        navigate('/Amenazas')
    }


    return (
        <div className="w-80% m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl" style={{ width: '200em' }}>
            <Header category="Page" title="Agregar Amenaza" />

            <form onSubmit={() => { handleSubmitAmenaza() }}>
                <label>Nombre
                <br /> <input
                        className='w-96 m-200 border-solid border-sky-400 border-2'
                        value={nombreS}
                        type="text" onChange={event => setNombreS(event.target.value)
                        }></input>
                </label>
                <br /><br />
                <label>Descripción
                <br /> <input
                        className='w-96 m-200 border-solid border-sky-400 border-2'
                        value={descripcionS}
                        type="text" onChange={e => setDescripcionS(e.target.value)}></input>
                </label><br /><br />

                <label>Tipo <br />
                    <select defaultValue={Tipo[0]} id='tipoSelect' onChange={e => setTipoS(e.target.value)}>
                        {Tipo.map(et => <>
                            <option value={et}>{et}</option>
                        </>)}
                    </select>
                </label><br /><br />
                <label>Origen <br />
                    <select defaultValue={Origen[0]} id='origenSelect' onChange={e => setOrigenS(e.target.value)}>
                        {Origen.map(et => <>
                            <option value={et}>{et}</option>
                        </>)}
                    </select>
                </label><br /><br />


                <label>Dimensiones <br />
                    <select defaultValue={Dimension[0]} id='dimensionSelect' onChange={e => setDimensionS(e.target.value)}>
                        {Dimension.map(et => <>
                            <option value={et}>{et}</option>
                        </>)}
                    </select>
                </label><br />

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
                    onClick={() => { handleSubmitAmenaza() }}></input>

            </form>


        </div>
    );
};

export default NuevoAmenaza;