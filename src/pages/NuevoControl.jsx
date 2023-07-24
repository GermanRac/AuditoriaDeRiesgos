import React, {useState } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import { Header } from '../components';

import { addDoc, collection } from 'firebase/firestore';
import { db } from '../config/client'


const NuevoControl = () => {

    const location = useLocation();
    const data = location.state.data;
   // console.log(data);
    const navigate = useNavigate();
    const TipoC = ['Prevenir', 'Detectar', 'Corregir', 'Disuadir', 'Recuperar', 'Compensar'];


    const [controlS, setControlS] = useState('');
    const [contextoS, setContextoS] = useState('');
    const [discusionS, setDiscusionS] = useState('');
    
    const [TipoCS, setTipoCS] = useState(TipoC[0]);
 
    const handleSubmitControl = async () =>{

    
       let code = Math.floor(Math.random() * 100);
        const res = await addDoc(collection(db, "Controles"), {
            "codigo":code,
            "control":controlS,
            "contexto":contextoS,
            "discusion":discusionS,
            "tipoC":TipoCS,
            "riesgo":data != null ?data.riesgo: ""
            
         });
         console.log(res);
         navigate('/Controles')
    }


    return (
        <div className="w-80% m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="Agregar Control" />
            <label >{data != null ?data.riesgo: "riesgo"}</label>
            <form onSubmit={()=>{handleSubmitControl()}}>
                <label>Control
                    <input
                        className='w-96 m-200 border-solid border-sky-400 border-2'
                        value={controlS}
                        type="text" onChange={event => setControlS(event.target.value)
                        }></input>
                </label>
                <br />
                <label>Contexto
                    <input
                        className='w-96 m-200 border-solid border-sky-400 border-2'
                        value={contextoS}
                        type="text" onChange={e => setContextoS(e.target.value)}></input>
                </label><br />
                
                <label>Discusion
                    <input
                        className='w-96 m-200 border-solid border-sky-400 border-2'
                        value={discusionS}
                        type="text" onChange={e => setDiscusionS(e.target.value)}></input>
                </label><br />

                

                <label>TipoC <br />
                    <select defaultValue={TipoC[0]} id='tipoCSelect' onChange={e => setTipoCS(e.target.value)}>
                        {TipoC.map(et=><>
                            <option  value={et}>{et}</option>
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
                    onClick={()=>{handleSubmitControl()}}></input>

            </form>


        </div>
    );
};

export default NuevoControl;