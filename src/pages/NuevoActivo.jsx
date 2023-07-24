import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter, registerEventHandlers } from '@syncfusion/ej2-react-grids';
//import { activosData } from '../data/dummy';
import { Header } from '../components';

import { addDoc, collection } from 'firebase/firestore';
import { db } from '../config/client'


const NuevoActivo = () => {

    const navigate = useNavigate();
    /*const selectionsettings = { persistSelection: true };
    const toolbarOptions = ['Delete'];
    const editing = { allowDeleting: true, allowEditing: true };*/
    const categorias = ['Doc', 'Per', 'Ser', 'Cli', 'AM', 'Sup'];
    const etiquetas = ['Con', 'Lis', 'SerP', 'SerPV', 'JA', 'EAI', 'EAE', 'IA', 'PE', 'HaW', 'SoW'];
    const clasificaciones = ['Confidencial', 'Restringido', 'Publico'];
    const nivel = ['Bajo', 'Medio', 'Alto'];

    const [nombreS, setNombreS] = useState('');
    const [descripcionS, setDescripcionS] = useState('');
    const [categoriaS, setCategoriaS] = useState(categorias[0]);
    const [etiquetaS, setEtiquetaS] = useState(etiquetas[0]);
    const [clasificacionS, setClasificacionS] = useState(clasificaciones[0]);
    const [valor1S, setValor1S] = useState(0.1);
    const [valor2S, setValor2S] = useState(0.1);
    const [valor3S, setValor3S] = useState(0.1);
    // const [valorTotalS, setValorTotalS] = useState(0.1);
    //

    const handleSubmitActivo = async () => {

        //setValorTotalS ((valor1S+ valor2S + valor3S)/3.0);
        let valorGlobal = (parseFloat(valor1S) + parseFloat(valor2S) * 1.0 + parseFloat(valor3S) * 1.0) / 3.0
        let catNivel = ""
        if (valorGlobal > 2.4) {
            catNivel = nivel[2]
        } else if (valorGlobal > 1.4) {
            catNivel = nivel[1]
        } else {
            catNivel = nivel[0]
        }

        let code = Math.floor(Math.random() * 100);
        const res = await addDoc(collection(db, "Activos"), {
            "codigo": categoriaS + code,
            "categoria": categoriaS,
            "clasificacion": clasificacionS,
            "descripcion": descripcionS,
            "etiqueta": etiquetaS,
            "nivel": catNivel,
            "nombre": nombreS,
            "confidencialidad": valor1S,
            "integridad": valor2S,
            "disponibilidad": valor3S,
            "valorGlobal": valorGlobal
        });
        console.log(res);
        navigate('/Activos')
    }


    return (
        <div className="w-80% m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl" style={{ width: '200em' }}>
            <Header category="Page" title="Agregar activo" />

            <form onSubmit={() => { handleSubmitActivo() }}>
                <label>Nombre
                <br /><input
                        className='w-96 m-200 border-solid border-sky-400 border-2'
                        value={nombreS}
                        type="text" onChange={event => setNombreS(event.target.value)
                        }></input>
                </label>
                <br /><br />
                <label>Descripción
                <br /><input
                        className='w-96 m-200 border-solid border-sky-400 border-2'
                        value={descripcionS}
                        type="text" onChange={e => setDescripcionS(e.target.value)}></input>
                </label><br /><br />
                <label>Categoría <br />
                    <select defaultValue={categorias[0]} id='categoriaSelect' onChange={e => setCategoriaS(e.target.value)}>
                        <option value={categorias[0]}>{categorias[0]}</option>
                        <option value={categorias[1]}>{categorias[1]}</option>
                        <option value={categorias[2]}>{categorias[2]}</option>
                        <option value={categorias[3]}>{categorias[3]}</option>
                        <option value={categorias[4]}>{categorias[4]}</option>
                        <option value={categorias[5]}>{categorias[5]}</option>
                    </select>
                </label><br /><br />
                <label>Etiqueta <br />
                    <select defaultValue={categorias[0]} id='etiquetaSelect' onChange={e => setEtiquetaS(e.target.value)}>
                        <option value={etiquetas[0]}>{etiquetas[0]}</option>
                        <option value={etiquetas[1]}>{etiquetas[1]}</option>
                        <option value={etiquetas[2]}>{etiquetas[2]}</option>
                        <option value={etiquetas[3]}>{etiquetas[3]}</option>
                        <option value={etiquetas[4]}>{etiquetas[4]}</option>
                        <option value={etiquetas[5]}>{etiquetas[5]}</option>
                        <option value={etiquetas[6]}>{etiquetas[6]}</option>
                        <option value={etiquetas[7]}>{etiquetas[7]}</option>
                        <option value={etiquetas[8]}>{etiquetas[8]}</option>
                        <option value={etiquetas[9]}>{etiquetas[9]}</option>
                        <option value={etiquetas[10]}>{etiquetas[10]}</option>

                    </select>
                </label><br /><br />

                <label>Clasificación <br />
                    <select defaultValue={clasificaciones[0]} id='clasificacionSelect' onChange={e => setClasificacionS(e.target.value)}>
                        <option value={clasificaciones[0]}>{clasificaciones[0]}</option>
                        <option value={clasificaciones[1]}>{clasificaciones[1]}</option>
                        <option value={clasificaciones[2]}>{clasificaciones[2]}</option>
                    </select>

                </label><br /><br />
                <label>Confidencialidad</label>
                <br /><input
                    className='w-96 m-200 border-solid border-sky-400 border-2'
                    type="number" onChange={e => setValor1S(parseFloat(e.target.value))}></input><br /><br />
                <label>
                    Integridad</label>
                    <br /><input
                    className='w-96 m-200 border-solid border-sky-400 border-2'
                    type="number" onChange={e => setValor2S(parseFloat(e.target.value))}></input><br /><br />
                <label>Disponibilidad</label>
                <br /><input
                    className='w-96 m-200 border-solid border-sky-400 border-2'
                    type="number" onChange={e => setValor3S(parseFloat(e.target.value))}></input><br />
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
                    onClick={() => { handleSubmitActivo() }}></input>

            </form>


        </div>
    );
};

export default NuevoActivo;