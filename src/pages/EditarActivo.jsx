import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from '../components';

import { setDoc, doc } from 'firebase/firestore';
import { db } from '../config/client'



import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { DataGrid } from '@mui/x-data-grid';



const EditarActivo = () => {

    const location = useLocation();
    const data = location.state.data;
    const [dataVul, ] = useState(data.vulnerabilidades != null ? data.vulnerabilidades: []);

    const navigate = useNavigate();

    const categorias = ['Doc', 'Per', 'Ser', 'Cli', 'AM', 'Sup'];
    const etiquetas = ['Con', 'Lis', 'SerP', 'SerPV', 'JA', 'EAI', 'EAE', 'IA', 'PE', 'HaW', 'SoW'];
    const clasificaciones = ['Confidencial', 'Restringido', 'Publico'];
    const nivel = ['Bajo', 'Medio', 'Alto'];

    const [nombreS, setNombreS] = useState(data.nombre);
    const [descripcionS, setDescripcionS] = useState(data.descripcion);
    const [categoriaS, setCategoriaS] = useState(data.categoria);
    const [etiquetaS, setEtiquetaS] = useState(data.etiqueta);
    const [clasificacionS, setClasificacionS] = useState(data.clasificacion);
    const [valor1S, setValor1S] = useState(data.confidencialidad);
    const [valor2S, setValor2S] = useState(data.integridad);
    const [valor3S, setValor3S] = useState(data.disponibilidad);
    //

    //////////////////////////

    


    /////////////////////////////
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

        const res = await setDoc(doc(db, "Activos", data.key), {
            codigo: categoriaS + code,
            categoria: categoriaS,
            clasificacion: clasificacionS,
            descripcion: descripcionS,
            etiqueta: etiquetaS,
            nivel: catNivel,
            nombre: nombreS,
            confidencialidad: valor1S,
            integridad: valor2S,
            disponibilidad: valor3S,
            valorGlobal: valorGlobal,
            vulnerabilidades: dataVul
        });
        console.log(res);
        navigate('/Activos')
    }


    const [vulDat, setVulDat] = useState();
    let newVul = [
        { id: 1, nombre: 'infraestructura' },
        { id: 2, nombre: 'mantenimiento' }]



  //  const [vulne, setVulne] = useState(data.vulnerabilidades);
   


    const handleVul = (selVul) => {
        setVulDat(selVul.nombre)
    }
    const handleButtonVul = () => {
        //changeVulne(vulDat);
        dataVul.push(vulDat)
        console.log(dataVul);
        newVul = newVul.filter(item => item !== vulDat);
        console.log(newVul);
    }

    return (
        <div className="w-80% m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl" style={{ width: '200em' }}>
            <Header category="Página" title="Editar activo" />

            <form onSubmit={() => { handleSubmitActivo() }}>
                <label>Nombre
                    <br /> <input
                        className='w-96 m-200 border-solid border-sky-400 border-2'
                        value={nombreS}
                        type="text"

                        onChange={event => setNombreS(event.target.value)
                        }></input>
                </label> <br />
                <br />
                <label>Descripción
                    <br /> <input
                        className='w-96 m-200 border-solid border-sky-400 border-2'
                        value={descripcionS}
                        type="text" onChange={e => setDescripcionS(e.target.value)}></input>
                </label><br /><br />
                <label>Categoría <br />
                    <select defaultValue={categoriaS} id='categoriaSelect' onChange={e => setCategoriaS(e.target.value)}>
                        <option value={categorias[0]}>{categorias[0]}</option>
                        <option value={categorias[1]}>{categorias[1]}</option>
                        <option value={categorias[2]}>{categorias[2]}</option>
                        <option value={categorias[3]}>{categorias[3]}</option>
                        <option value={categorias[4]}>{categorias[4]}</option>
                        <option value={categorias[5]}>{categorias[5]}</option>
                    </select>
                </label><br /><br />
                <label>Etiqueta <br />
                    <select defaultValue={etiquetaS} id='etiquetaSelect' onChange={e => setEtiquetaS(e.target.value)}>
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
                    <select defaultValue={clasificacionS} id='clasificacionSelect' onChange={e => setClasificacionS(e.target.value)}>
                        <option value={clasificaciones[0]}>{clasificaciones[0]}</option>
                        <option value={clasificaciones[1]}>{clasificaciones[1]}</option>
                        <option value={clasificaciones[2]}>{clasificaciones[2]}</option>
                    </select>

                </label><br /><br />
                <label>Confidencialidad
                    <br /><input
                        className='w-96 m-200 border-solid border-sky-400 border-2'
                        type="number" defaultValue={data.confidencialidad} onChange={e => setValor1S(parseFloat(e.target.value))}></input><br />

                </label><br />

                <label>
                    Integridad</label>
                <br /><input
                    className='w-96 m-200 border-solid border-sky-400 border-2'
                    type="number" defaultValue={data.integridad} onChange={e => setValor2S(parseFloat(e.target.value))}></input><br />
                <br />
                <label>Disponibilidad</label>
                <br /><input
                    className='w-96 m-200 border-solid border-sky-400 border-2'
                    type="number" defaultValue={data.integridad} onChange={e => setValor3S(parseFloat(e.target.value))}></input><br />
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
                    onClick={() => { handleSubmitActivo() }}></input>

            </form> <br /><br/>
            <Header category="" title="Administrar vulnerabilidades" />
            <div>
                <h2>Vulnerabilidades de este activo</h2>
                <List>
                    {dataVul.map((item) => (
                        <ListItem
                            key={item}>
                            <ListItemText primary={item} />
                        </ListItem>
                    ))}
                </List>
            </div>
            <br /> <br />
           
            <div>
                <h2>Lista de vulnerabilidades</h2>
                <div style={{ height: 400, width: '40em' }}>
                    <DataGrid
                        rows={newVul}
                        columns={[{ field: 'nombre', headerName: 'Nombre', width: '200' }]}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        onRowClick={(rowData) => {
                            handleVul(rowData.row);
                        }}
                        getRowId={(row) => row.id}
                    />

                </div>


                <button type='button'
                    className='text-2x1 p-2
                    hover:drop-shadow-xl
                    hover:bg-light-gray
                    text-white'
                    style={{
                        background: 'red',
                        borderRadius: ''
                    }}
                    onClick={() => { handleButtonVul() }}>
                    Agregar
                </button>
            </div>
        </div>

    );
};

export default EditarActivo;