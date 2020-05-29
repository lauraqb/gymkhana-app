import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './styles/App.css'
import Layout from './components/Layout'
import Navbar from 'components/Navbar/Navbar'
import Home from 'pages/Home/Home'
import Join from 'pages/Join/Join'
import Intro from './pages/Intro'
import Challenge from 'pages/Challenge/Challenge'
import NotFound from './pages/NotFound'
import { connect } from 'react-redux'
import socketIOClient from "socket.io-client"
import { SERVER_ENDPOINT  } from './api-config'
import { resizeWindow } from './utils'
import { getPosition } from './utils/getPosition'


/** [Redux function] selecciona los datos del store que el componente "connect" necesita*/
const mapStateToProps = state => {
    return {
        game: state.game,
        userid: state.userid,
        username: state.username,
        team: state.team,
    }
}

resizeWindow()

function App({ game, userid, username, team }) {

    const [error, setError] = useState(null)

    const socket = socketIOClient(SERVER_ENDPOINT)//, {transports: ['websocket']})
    
    const socketListeners = () => {
        socket.on('connect', () => console.log("socket connected "+socket.id))
        socket.on('connect_error', (error) =>  console.log("connect_error "+error))
        socket.on('disconnect', (reason) => console.log("disconnect "+reason))
    }

    const sendPositionPolling = () => {
        console.log("sendPositionPolling")
        setInterval(()=> {
            getPosition({userid, username, team}).then(res => {
                if(res.error) {
                    setError("Error: "+res.error.message)
                }
                else {
                    setError(null)
                    socket.emit("coordenadas", res);
                }
            })
        }, 5000)
    }

    useEffect(() => {
        const path = document.location.pathname
        console.log("entra en App en path: "+path)
        if(path !== "/") {
            if(!game) document.location.href="/" //redirigimos al home
            socketListeners()
            if (userid) sendPositionPolling()
        }
    })

    return (
        <BrowserRouter>
            <Layout>
            { error && <div>{error}</div> }
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

const appConnected = connect(mapStateToProps)(App)
export default appConnected