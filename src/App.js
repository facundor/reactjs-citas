import React, { useState, useEffect, Fragment } from "react";
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";

function App() {
  const [citas, guardarCitas] = useState(JSON.parse(localStorage.getItem('citas')));

  console.log(citas);

  const crearCita = cita => {
    //copia del state

    const nuevasCitas = [...citas, cita];

    guardarCitas(nuevasCitas);
  };

  const eliminarCita = (index) =>{
    const citasActuales = [...citas];

    citasActuales.splice(index,1);

    guardarCitas(citasActuales);
  }

  useEffect(() => {

    console.log('citasDesdeStorage: ' + localStorage.getItem('citas'))

    var citasIniciales = null;
    if (localStorage.getItem('citas') != null){
       citasIniciales = JSON.parse(localStorage.getItem('citas'));
    }

    console.log('citasIniciales: ' + citasIniciales)


    if(citasIniciales != null){
      localStorage.setItem('citas', JSON.stringify(citas));
    }else{
      localStorage.setItem('citas', JSON.stringify([]));
    }
  },[citas]);

  const titulo = Object.keys(citas).length > 0 ? "Administre sus citas aquí" : "No hay citas";

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map((cita, index) => (
              <Cita key={index} index={index} cita={cita} eliminarCita={eliminarCita} />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
