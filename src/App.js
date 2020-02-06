import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import './styles/App.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import Join from './pages/Join'
import Intro from './pages/Intro'
import Prueba1 from './pages/Prueba1'
import Prueba2 from './pages/Prueba2'
import Prueba3 from './pages/Prueba3'
import Prueba4 from './pages/Prueba4'
import Prueba5 from './pages/Prueba5'
import Prueba6 from './pages/Prueba6'
import Prueba7 from './pages/Prueba7'
import Final from './pages/Final'
import NotFound from './pages/NotFound'
import { connect } from 'react-redux'
import { setServerConnected, setName, setTeam, restartPoints } from './js/actions/index'
import socketIOClient from "socket.io-client";

const config = require('./config.json');
const endpoint = config.server
const socket = socketIOClient(endpoint);

/** [Redux function] selecciona los datos del store que el componente "connect" necesita*/
const mapStateToProps = state => {
  return {
    serverConnected: state.serverConnected,
    game: state.game,
    team: state.team,
    player: state.name
  }
}

/** Redux function. Sirve para enviar (dispatch) acciones al store */
const mapDispatchToProps = (dispatch) => {
  return {
      setServerConnected: x => dispatch(setServerConnected(x)),
      setName: name => dispatch(setName(name)),
      setTeam: team => dispatch(setTeam(team)),
      restartPoints: points => dispatch(restartPoints())
  }
}

function App({ game, team, player, setName, setTeam, setServerConnected }) {

  socket.on('connect', () => {
    console.log("socket connected "+socket.id)
    setServerConnected(true)
  });

  socket.on('connect_error', (error) => {
    console.log("connect_error "+error);
  });

  socket.on('disconnect', (reason) => {
    console.log("disconnect "+reason);
  });
  
  const redirectToHomePageIfNecessary = () => {
    const path = document.location.pathname
    if(path !== "/" && !game) {
      document.location.href="/"
    }
    else if((path !== "/join" && path !== "/intro") && player) {
      axios.post(endpoint+"/checkPlayerInDB", {player: player})
      .then(res => {
        console.log(res)
        if(res === 0) {
          setName(null)
          setTeam(null)
          document.location.href="/"
        }   
      })
      .catch(error => console.log("error en checkPlayerInDB"));
    }
  }

  redirectToHomePageIfNecessary()

  const sendPosition = () => {
    function geo_success(position) {
      var coordenadas = {
          nombre: player,
          equipo: team,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
      }
      //TODO descomentar socket.emit("coordenadas", coordenadas);
    }
    function geo_error(error) {
      console.error("error "+error.message)
      //socket.emit("error", error.message);
    }
    if (team) navigator.geolocation.getCurrentPosition(geo_success, geo_error, {timeout:10000})
  }

  if (player) setInterval(sendPosition, 3000)

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/join" component={Join} />
          <Route exact path="/intro" component={Intro} />
          <Route exact path="/prueba1" component={Prueba1} />
          <Route exact path="/prueba2" component={Prueba2} />
          <Route exact path="/prueba3" component={Prueba3} />
          <Route exact path="/prueba4" component={Prueba4} />
          <Route exact path="/prueba5" component={Prueba5} />
          <Route exact path="/prueba6" component={Prueba6} />
          <Route exact path="/prueba7" component={Prueba7} />
          <Route exact path="/final" component={Final} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
   
  );
}

const appConnected = connect(mapStateToProps, mapDispatchToProps)(App)

export default appConnected;
