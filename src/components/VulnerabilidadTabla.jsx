import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, deleteDoc } from "firebase/firestore";
import { DataGrid } from '@mui/x-data-grid';
import { db } from '../config/client';


export default function VulnerabilidadTabla(props) {

    const [selectionModel, setSelectionModel] = useState();

    const eliminarVulnerabilidad = async () => {
        if (selectionModel != null) {
            await deleteDoc(doc(db, "Vulnerabilidades", selectionModel.row.key));
        }
        console.log(selectionModel.row);
        window.location.reload();
    }


    const navigate = useNavigate();
    return (
        <div style={{ height: 400, width: '70em' }}>
            <button type='button'
                className='text-2x1 p-2
          hover:drop-shadow-xl
          hover:bg-light-gray
          text-white'
                style={{
                    background: 'purple',
                    borderRadius: ''
                }}
                onClick={() => { navigate('/NuevoVulnerabilidad') }}>
                Agregar
            </button>

            <button type='button'
                className='text-2x1 p-2
          hover:drop-shadow-xl
          hover:bg-light-gray
          text-white'
                style={{
                    background: 'blue',
                    borderRadius: ''
                }}
                onClick={() => { selectionModel !=null ? navigate('/EditarVulnerabilidad', { state: { data: selectionModel.row } }) : console.log("error")}}>
                Editar
            </button>

            <button type='button'
                className='text-2x1 p-2
          hover:drop-shadow-xl
          hover:bg-light-gray
          text-white'
                style={{
                    background: 'red',
                    borderRadius: ''
                }}
                onClick={() => { selectionModel != null ? eliminarVulnerabilidad(): console.log("error") }}>
                Eliminar
            </button>

            <DataGrid
                rows={props.data}
                columns={props.columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                onRowClick={(rowData) => {
                    setSelectionModel(rowData);
                }}
                getRowId={(row) => row.codigo}
            />
            {console.log(selectionModel)}
        </div>
    );

}