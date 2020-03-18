import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import './styles/App.css'
import Layout from './components/Layout'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Join from './pages/Join'
import Intro from './pages/Intro'
import Challenge from './components/Challenge'
import Prueba5 from './pages/Prueba5'
import Prueba6 from './pages/Prueba6'
import Prueba7 from './pages/Prueba7'
import Final from './pages/Final'
import NotFound from './pages/NotFound'
import { connect } from 'react-redux'
import { setServerConnected, setUsername, setTeam, restartPoints } from './js/actions/index'
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
      setUsername: name => dispatch(setUsername(name)),
      setTeam: team => dispatch(setTeam(team)),
      restartPoints: points => dispatch(restartPoints())
  }
}

function App({ game, team, player, setUsername, setTeam, setServerConnected }) {

  socket.on('connect', () => {
    console.log("socket connected "+socket.id)
    setServerConnected(true)
  })

  socket.on('connect_error', (error) => {
    console.log("connect_error "+error)
    setServerConnected(false)
  })

  socket.on('disconnect', (reason) => {
    console.log("disconnect "+reason)
    setServerConnected(false)
  })
  
  const redirectToHomePageIfNecessary = () => {
    const path = document.location.pathname
    if(path !== "/" && !game) {
      document.location.href="/"
    }
    else if((path !== "/join" && path !== "/intro") && player && player !== "test") {
      axios.post(endpoint+"/checkPlayerInDB", {player: player})
      .then(res => {
        console.log(res)
        if(res === 0) {
          setUsername(null)
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
          <React.Fragment> 
            <Navbar/>
            <Switch>
              <Route exact path="/intro" component={Intro} />
              <Route exact path="/challenge/:id" component={Challenge} />
              <Route exact path="/prueba5" component={Prueba5} />
              <Route exact path="/prueba6" component={Prueba6} />
              <Route exact path="/prueba7" component={Prueba7} />
              <Route exact path="/final" component={Final} />
              <Route component={NotFound} />
            </Switch>
          </React.Fragment>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

const appConnected = connect(mapStateToProps, mapDispatchToProps)(App)

export default appConnected;
