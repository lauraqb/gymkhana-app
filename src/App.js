import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './styles/App.css'
import Home from './pages/Home'
import Join from './pages/Join'
import Prueba0 from './pages/Prueba0'
import Prueba1 from './pages/Prueba1'
import Prueba2 from './pages/Prueba2'
import Prueba3 from './pages/Prueba3'
import Prueba4 from './pages/Prueba4'
import Prueba5 from './pages/Prueba5'
import Prueba6 from './pages/Prueba6'
import Prueba7 from './pages/Prueba7'
import Final from './pages/Final'
import { connect } from 'react-redux'
import { setName, setTeam, restartPoints } from './js/actions/index'
import socketIOClient from "socket.io-client";

const config = require('./config.json');
const endpoint = config.server
const socket = socketIOClient(endpoint);

/** [Redux function] selecciona los datos del store que el componente "connect" necesita*/
const mapStateToProps = state => {
  return { 
    game: state.game,
    equipo: state.team,
    jugador: state.name
  };
}

/** Redux function. Sirve para enviar (dispatch) acciones al store */
const mapDispatchToProps = (dispatch) => {
  return {
      setName: name => dispatch(setName(name)),
      setTeam: team => dispatch(setTeam(team)),
      restartPoints: points => dispatch(restartPoints())
  }
}

function App({ game, equipo, jugador, setName, setTeam }) {
  if (!socket.connected) {
    return (<div>Error de conexión con el servidor {config.server}</div>)
  }
  const path = document.location.pathname
  if(path !== "/" && !game) {
    document.location.href="/"
  }
  else if((path !== "/join" && path !== "/intro") && jugador) {
      socket.emit("isPlayerInDB", jugador, (data) => {
        if(data === 0) {
          setName(null)
          setTeam(null)
          document.location.href="/"
        }    
      })
  }
alert("Hola")
  const sendPosition = () => {
    function geo_success(position) {
      var coordenadas = {
          nombre: jugador,
          equipo: equipo,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
      }
      socket.emit("coordenadas", coordenadas);
    }
    function geo_error(error) {
      console.error("error "+error.message)
      socket.emit("error", error.message);
    }
    if (equipo) navigator.geolocation.getCurrentPosition(geo_success, geo_error, {timeout:10000})
  }

  setInterval(sendPosition, 3000)

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/join" component={Join} />
        <Route exact path="/intro" component={Prueba0} />
        <Route exact path="/prueba1" component={Prueba1} />
        <Route exact path="/prueba2" component={Prueba2} />
        <Route exact path="/prueba3" component={Prueba3} />
        <Route exact path="/prueba4" component={Prueba4} />
        <Route exact path="/prueba5" component={Prueba5} />
        <Route exact path="/prueba6" component={Prueba6} />
        <Route exact path="/prueba7" component={Prueba7} />
        <Route exact path="/final" component={Final} />
      </Switch>
    </BrowserRouter>
   
  );
}

const appConnected = connect(mapStateToProps, mapDispatchToProps)(App)

export default appConnected;
