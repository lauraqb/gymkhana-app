import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import axios from 'axios'
import { FaExclamationCircle} from 'react-icons/fa/'
import NotFound from '../pages/NotFound'
import IosCheckmarkCircleOutline from 'react-ionicons/lib/IosCheckmarkCircleOutline' //TODO cambiarlo por react-icons 
//TODO 2: desinstalar el ionicons este
import Timer from './Timer'
import tanque from '../images/dios-neptuno.jpg' /**TODO Crear un componente para las imagenes */
import socketIOClient from "socket.io-client"
import "./styles/Challenge.css";
import { SERVER_ENDPOINT  } from '../api-config'

//TODO usar socket de App.js
const socket = socketIOClient(SERVER_ENDPOINT)

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
            serverConnected : this.props.serverConnected,
            modal : false,
            textoModal : " ",
            passed : false,
            answer : null,
            wrongAnswer : false,
        }
        const id = this.props.match.params.id
        if(pruebasObject.length <= id) {
            return
        } 
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
        this.handleChange = this.handleChange.bind(this)

        const This = this
        socket.on("server/challengePassed", function(data) {
            if(data.teamId === id && data.teamId === this.props.teamId){
                This.setState({ passed: true });
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
        const answer = this.state.answer
        const solution = this.solution.toLowerCase()
        if(answer !== solution && answer !== "000") { //TODO 000 temporal
            this.setState({wrongAnswer: true})
        }
        else {
            axios.post(`${SERVER_ENDPOINT}/challengeCompleted`, { callengeId: this.id, userId: this.props.userId, teamId: this.props.teamId })
            .then(res => {
                //this.setState({ loading: false, error: false })
                this.setState({ passed: true });
            })
            .catch(error => this.setState({ loading: false, error: error.message })) 
        }
    }

    handleChange(event) {
        const value = event.target.value
        const name = event.target.name
        this.setState({
          [name]: value,
          wrongAnswer: false
        });
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
        if(!this.id) {
            return <NotFound/>
        }
        if(this.state.passed) {
            return <div className="container g-body g-challenge-container">
                    <p>¡Prueba superada!</p>
                    <Link to={'./'+this.nextChallengeId} className="App-link">
                        <Button className="g-start-btn" type="submit">Siguiente reto</Button>
                    </Link>
                </div>
            // return <Redirect to={'/challenge/'+this.nextChallengeId} />
        }
        return <div className="container g-body g-challenge-container">
            <div className="row">
                <div className="col-12" align="center">
                    <h2 className="g-challenge-title">Prueba #{this.id}</h2>
                    <p>{this.challengeText}</p>
                    <p className="g-english" >{this.textoSecundario}</p>
                    {this.images ? <img src={tanque} alt="tanque" className="g-imagen"/>:"" }
                    <Form id="myForm" onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Control type="text" placeholder={this.placeholder} name="answer" value={this.state.answer} onChange={this.handleChange} />
                            { this.state.wrongAnswer && <Form.Text className="g-invalid-input-warning"><FaExclamationCircle/> Respuesta incorrecta. ¡Sigue intentándolo!</Form.Text>}

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