import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Inicio from './pages/Inicio'
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
import socketIOClient from "socket.io-client";

const endpoint = 'http://localhost:8000' 
const socket = socketIOClient(endpoint);

const mapStateToProps = state => {
  return { team: state.team }
}
function App({ team }) {
  const sendPosition = () => {
    function geo_success(position) {
      var coordenadas = {
              team: team,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
          }
      socket.emit("coordenadas", coordenadas);
      //client.send(JSON.stringify(coordenadas))
    }
    function geo_error(error) {
      console.error("error "+error.message)
      socket.emit("error", error.message);
    }
    
    navigator.geolocation.getCurrentPosition(geo_success, geo_error, {timeout:10000})
  }

  setInterval(sendPosition, 3000)

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Inicio} />
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

const appConnected = connect(mapStateToProps)(App)

export default appConnected;
