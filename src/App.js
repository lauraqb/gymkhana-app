import React, { useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './styles/App.css'
import Layout from './components/Layout'
import Navbar from './components/Navbar'
import Home from './pages/Home/Home'
import Join from './pages/Join'
import Intro from './pages/Intro'
import Challenge from './pages/Challenge/Challenge'
import NotFound from './pages/NotFound'
import { connect } from 'react-redux'
import socketIOClient from "socket.io-client"
import { SERVER_ENDPOINT  } from './api-config'
//import socket from './socket-config'
const socket = socketIOClient(SERVER_ENDPOINT)//, {transports: ['websocket']})
/** Redux function. Sirve para enviar (dispatch) acciones al store */
const mapDispatchToProps = (dispatch) => {
  return {
      //setUserId: name => dispatch(setUserId(name)),
  }
}
/** [Redux function] selecciona los datos del store que el componente "connect" necesita*/
const mapStateToProps = state => {
  return {
    game: state.game,
    gameInfo: state.gameInfo,
    userid: state.userid,
    username: state.username,
    team: state.team,
  }
}

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
})

const redirectToHomePageIfNecessary = (game) => {
  if(document.location.pathname !== "/" && !game) {
    document.location.href="/"
  }
}

const socketListeners = (socket) => {
  socket.on('connect', () => console.log("socket connected "+socket.id))
  socket.on('connect_error', (error) =>  console.log("connect_error "+error))
  socket.on('disconnect', (reason) => console.log("disconnect "+reason))
}

function App({ game, userid, username, team }) {

  //hooks
  const [error, setError] = useState(null)

  const sendPosition = () => {
    console.log("sendPosition")
    navigator.geolocation.getCurrentPosition(geo_success, geo_error, {timeout:5000})
    function geo_success(position) {
      var coordenadas = {
          userid: userid,
          username: username,
          equipo: team,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
      }
      console.log("geo_success")
      socket.emit("coordenadas", coordenadas);
    }
    function geo_error(error) {
      console.error("geo_error: "+error.message)
      return false
    }
  }

  const sendPositionPolling = () => {
    if (!userid) return
    console.log("sendPositionPolling")
    navigator.geolocation.getCurrentPosition((success)=> {
      setInterval(sendPosition, 4000)
    }, (error)=>{
      console.log("error al intentar getCurrentPosition: "+error.message)
      setError(error.message)
    }, {timeout:5000})
  }


  const init = () => {

    const path = document.location.pathname
    console.log("entra en App en path: "+path)
    socket.emit("prueba", "hi")
    if(path !== "/") {
      redirectToHomePageIfNecessary(game)
      socketListeners(socket)
      sendPositionPolling(socket)
    }
 
  }

  init()

  // if(error) {
  //   return <div>Error {error}</div>
  // }
  return (
    <BrowserRouter>
      <Layout>
        { error && <div>Error {error}</div> }
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/join" component={Join} />
          <React.Fragment> 
            <Navbar/>
            <Switch>
              <Route exact path="/intro" component={Intro} />
              <Route exact path="/challenge/:id" component={Challenge} />
              <Route component={NotFound} />
            </Switch>
          </React.Fragment>
        </Switch>
      </Layout>
    </BrowserRouter>
  )
}

const appConnected = connect(mapStateToProps, mapDispatchToProps)(App)

export default appConnected;
