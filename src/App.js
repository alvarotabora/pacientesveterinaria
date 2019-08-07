import React, { Component } from 'react';
import './bootstrap.min.css';
import Header from './components/Header';
import NuevaCita from './components/NuevaCita';
import ListaCitas from './components/ListaCitas';

class App extends Component
{
  state = {
    citas: []
  }

  //Cuando la aplicacniion cargar
  componentDidMount()
  {
    const citasLS = localStorage.getItem('citas');

    if (citasLS)
    {
      this.setState({ citas: JSON.parse(citasLS) });
    }
  }
  
  //Cuando eliminamos o agregamos
  componentDidUpdate()
  {
    localStorage.setItem('citas', JSON.stringify(this.state.citas));
  }

  crearNuevaCita = datos =>
  {
    //Copiar State Actual
    const citas = [...this.state.citas, datos];

    //Agregar el nuevo State
    this.setState({ citas });
  }

  //Elimina citas del state
  eliminarCita = id =>
  {
    //Tomar copia del state
    const citasActuales = [...this.state.citas];

    //Utilizar Filter para sacar el id
    const citas = citasActuales.filter(cita => cita.id !== id);

    //Actualziar el state
    this.setState({ citas });
  }

  render()
  {
    return (
      <div className="container">
        <Header
          titulo='Administrador pacientes Veterinaria' />
        
        <div className="row">
          <div className="col-md-10 mx-auto">
            <NuevaCita
              crearNuevaCita={this.crearNuevaCita}
            />

            <div className="mt-5 col-md-10 mx-auto">
              <ListaCitas
                citas={this.state.citas}
                eliminarCita={this.eliminarCita}/>
            </div>
          </div>
        </div>
      </div>);
  }
}
 
export default App;
