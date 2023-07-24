import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, deleteDoc } from "firebase/firestore";
import { DataGrid } from '@mui/x-data-grid';
import { db } from '../config/client';


export default function RiesgosTabla(props) {


    

    const [selectionModel, setSelectionModel] = useState();

    const eliminarRiesgos = async () => {
        if (selectionModel != null) {
            await deleteDoc(doc(db, "Riesgos", selectionModel.row.key));
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
                onClick={() => { navigate('/NuevoRiesgo')}}>
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
                onClick={() => { }}>
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
                onClick={() => { selectionModel != null ? eliminarRiesgos(): console.log("error") }}>
                Eliminar
            </button>

            <button type='button'
                className='text-2x1 p-2
          hover:drop-shadow-xl
          hover:bg-light-gray
          text-white'
                style={{
                    background: 'orange',
                    borderRadius: ''
                }}
                onClick={() => { selectionModel !=null ? navigate('/NuevoControl', { state: { data: selectionModel.row } }) : console.log("error")}}>
                Gestionar
            </button>


            <DataGrid
                rows={props.data}
                columns={props.columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                onRowClick={(rowData) => {
                    setSelectionModel(rowData);
                }}
                getRowId={(row) => row.riesgo}
            />
            {console.log(selectionModel)}
        </div>
    );

}