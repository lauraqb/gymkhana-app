import React from 'react'
import { connect } from 'react-redux'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'

//import IosIonic from 'react-ionicons/lib/MdWalk'
import IosCheckmarkCircleOutline from 'react-ionicons/lib/IosCheckmarkCircleOutline'
import Timer from './Timer'
import tanque from '../images/dios-neptuno.jpg' /**TODO Crear un componente para las imagenes */
import socketIOClient from "socket.io-client"

const config = require('../config.json')
const endpoint = config.server
const socket = socketIOClient(endpoint)

let pruebasObject = require('../resources/pruebas.json')

const mapStateToProps = state => {
    return { 
        serverConnected: state.serverConnected,
        nombre: state.name,
        team: state.team
    }
}

//TODO resolver el problema de:
// Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
class Prueba extends React.Component {

    constructor(props) {
        
        super(props)
        this.state = {
            serverConnected: this.props.serverConnected,
            modal: false,
            textoModal: " "
        }
        const id = this.props.id //número de prueba
        this.challengeText = pruebasObject[id].challengeText
        this.textoSecundario = pruebasObject[id].textoSecundario
        this.placeholder = pruebasObject[id].placeholder
        this.points = pruebasObject[id].points
        this.solution = pruebasObject[id].solution
        this.images = pruebasObject[id].images
        this.clue = pruebasObject[id].clue
        this.time = pruebasObject[id].time
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClick = this.handleClick.bind(this) //TODO renombrar a pista

        const This = this
        //jugadoresRestantesPorCompletarLaPrueba
        socket.on("server/playersLeftToComplete", function(data) {
            if(data === 0){
                This.setState({
                    textoModal: "¡Pasáis a la siguiente prueba!"
                });
                //Esperamos 1 segundo para cambiar la pantalla
                setTimeout(function () {
                    This.props.onSubmit(This.points)
                }, 1000);
            }
        })
    }
    jugadoresPruebaCompletada(options) {
        const data = {
            pruebaId: options.pruebaId, 
            nombre: options.nombre, 
            team: options.equipo
        }
        return new Promise(function(resolve, reject) {
            socket.emit("app/challengeDone", data, function(jugadoresRestantes) {
                resolve(jugadoresRestantes)
            })
        })
    }
    handleSubmit(event) {
        event.preventDefault();
        const input = document.getElementById("inputText").value.toLowerCase()
        const solution = this.solution.toLowerCase()
        //const timer = document.getElementById("timer") ? document.getElementById("timer").innerHTML : "00"
        if(input === solution) {
            // if (timer !== "0:00") {
            //     if(this.points === 0) alert("¡Muy bien! No has ganado ningún punto pero desbloqueas la siguiente prueba.")
            //     else if(this.points === 1) alert("¡Muy bien! Habéis ganado "+this.points+" punto.")
            //     else alert("¡Muy bien! Habéis ganado "+this.points+" puntos.")
            // }
            // else {
            //     alert("Has acertado pero estás fuera de tiempo. No has ganado ningún punto pero desbloqueas la siguiente prueba.")
            // }
            const This = this
            const data = {
                pruebaId: this.props.id, 
                nombre: this.props.nombre, 
                equipo: this.props.team
            }
            this.jugadoresPruebaCompletada(data).then(function(jugadoresRestantes) {
                if(jugadoresRestantes === 0) {
                    This.setState({
                        textoModal: "¡Pasáis a la siguiente prueba!"
                    })
                    //Esperamos 2 segundos para cambiar la pantalla
                    setTimeout(function () {
                        This.props.onSubmit(This.points)
                    }, 2000)
                }
                else {
                    This.setState({
                        textoModal: "Esperando a tus compañeros. (Faltan: "+jugadoresRestantes+")"
                    })
                }
            })
            this.setState({
                modal: true
            })
        }
        else {
            event.preventDefault();
            alert("Sigue intentándolo")
        }
    }

    handleClick(e) {
        this.points--
        document.getElementById('pista').innerHTML = this.clue
    }

    render() {
        return <div className="container g-body g-prueba-body">
            <div className="row">
                <div className="col-12" align="center">
                    <h2 className="g-prueba-title">Prueba #{this.props.id}</h2>
                    <p>{this.challengeText}</p>
                    <p className="g-english" >{this.textoSecundario}</p>
                    {this.images ? <img src={tanque} alt="tanque" className="g-imagen"/>:"" }
                    <Form id="myForm" onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Control type="text" placeholder={this.placeholder} id="inputText" />
                            <Form.Text className="text-muted">{this.props.textMuted}</Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Enviar
                        </Button>
                    </Form>
                    <Modal show={this.state.modal} aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Header>
                            <Modal.Title><IosCheckmarkCircleOutline fontSize="60px" color="green" />¡Correcto!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {!this.state.serverConnected && <p>server disconnected</p>}
                            {this.state.serverConnected && <center><div class="loader"></div></center>}
                            <br></br>
                            {this.state.textoModal} 
                            {/* <IosIonic fontSize="55px" color="#969ca2" /> */}
                        </Modal.Body>
                    </Modal>

                    {this.time ? <Timer seconds={this.time} time={this.time}/>:"" }
                    {this.clue ? <div className="g-line">
            <p className="g-pista">¿Estás atascado? Pide una pista a cambio un punto</p>
            <Button variant="warning" onClick={this.handleClick}>
                Conseguir pista
            </Button>
            <p className="g-pista" id="pista"></p> </div>:"" }
                </div>
                
            </div>
        </div>
    }
}

//export default Prueba
const pruebaConnected = connect(mapStateToProps)(Prueba);
export default pruebaConnected;