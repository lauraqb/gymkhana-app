import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import axios from 'axios'
import IosCheckmarkCircleOutline from 'react-ionicons/lib/IosCheckmarkCircleOutline' //TODO cambiarlo por react-icons 
//TODO 2: desinstalar el ionicons este
import Timer from './Timer'
import tanque from '../images/dios-neptuno.jpg' /**TODO Crear un componente para las imagenes */
import socketIOClient from "socket.io-client"
import "./styles/Challenge.css";

const config = require('../config.json')
const endpoint = config.server
const socket = socketIOClient(endpoint)

const pruebasObject = require('../resources/pruebas.json')

const mapStateToProps = state => {
    return { 
        serverConnected: state.serverConnected, //TODO
        username: state.username,
        userId: state.userId,
        teamId: state.teamId
    }
}

//TODO resolver el problema de:
// Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
class Challenge extends React.Component {

    constructor(props) {
   
        super(props)
        this.state = {
            serverConnected: this.props.serverConnected,
            modal: false,
            textoModal: " ",
            passed: false,
        }
        const id = this.props.match.params.id
        this.id = id
        this.nextChallengeId = Number(id)+1
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
        socket.on("server/challengePassed", function(data) {
            if(data.teamId === id && data.teamId === this.props.teamId){
                This.setState({ passed: true });
                //Esperamos 1 segundo para cambiar la pantalla
                setTimeout(function () {
                    This.props.onSubmit(This.points)
                }, 1000);
            }
        })
    }
    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            window.location.reload()
        }
      }

    handleSubmit(event) {
        event.preventDefault();
        const input = document.getElementById("inputText").value.toLowerCase()
        const solution = this.solution.toLowerCase()
        if(input !== solution && input !== "000") { //TODO 000 temporal
            //hacer que salga el texto de error de respuesta incorrecta
            alert("Sigue intentándolo")
        }
        else {
            axios.post(endpoint+"/challengeCompleted", { callengeId: this.id, userId: this.props.userId, teamId: this.props.teamId })
            .then(res => {
                //this.setState({ loading: false, error: false })
                this.setState({ passed: true });
                //this.props.history.push('/challenge/'+this.nextChallengeId)
            })
            .catch(error => this.setState({ loading: false, error: error.message })) 
        }
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
            this.setState({
                modal: true
            })
        }
    }
//TODO borar
    goToNextChallenge(points) {
        const nextChallengeId = this.id+1
        this.props.addPoints(points)
        this.props.history.push('/prueba'+nextChallengeId)
    }

    handleClick(e) {
        this.points--
        document.getElementById('pista').innerHTML = this.clue
    }

    render() {
        if(this.state.passed) {
            return <div className="container g-body g-challenge-container">
                    <p>¡Prueba superada!</p>
                    <Link to={'/challenge/'+this.nextChallengeId} className="App-link">
                        <Button className="g-start-btn" type="submit">Siguiente reto</Button>
                    </Link>
                </div>
            // return <Redirect to={'/challenge/'+this.nextChallengeId} />
        }
        return <div className="container g-body g-challenge-container">
            <div className="row">
                <div className="col-12" align="center">
                    <h2 className="g-prueba-title">Prueba #{this.id}</h2>
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
const pruebaConnected = connect(mapStateToProps)(Challenge);
export default pruebaConnected;