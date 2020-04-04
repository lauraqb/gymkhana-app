import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Loading from '../components/Loading'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios'
import { FaExclamationCircle} from 'react-icons/fa/'
import NotFound from '../pages/NotFound'
import IosCheckmarkCircleOutline from 'react-ionicons/lib/IosCheckmarkCircleOutline' //TODO cambiarlo por react-icons 
//TODO 2: desinstalar el ionicons este
import Timer from './Timer'
// import socketIOClient from "socket.io-client"
import "./styles/Challenge.css";
import { SERVER_ENDPOINT  } from '../api-config'

//TODO usar socket de App.js
// const socket = socketIOClient(SERVER_ENDPOINT)

const mapStateToProps = state => {
    return { 
        gameId: state.game,
        gameInfo: state.gameInfo,
        username: state.username,
        userId: state.userid,
        teamId: state.teamId
    }
}

//TODO resolver el problema de:
// Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
class Challenge extends React.Component {

    constructor(props) {
   
        super(props)
        this.state = {
            modal : false,
            textoModal : " ",
            passed : false,
            answer : "",
            wrongAnswer : false,
        }
        
        const id = this.props.match.params.id
        if(!this.props.gameInfo || this.props.gameInfo.length <= id) {
            return
        } 
        const challengeInfo = this.props.gameInfo[id]
        this.id = id
        this.nextChallengeId = Number(id)+1
        this.challengeText = challengeInfo.challengeText
        this.textoSecundario = challengeInfo.textoSecundario
        this.placeholder = challengeInfo.placeholder
        this.points = challengeInfo.points
        this.solution = challengeInfo.solution
        this.clue = challengeInfo.clue
        this.time = challengeInfo.time
        this.image = challengeInfo.image ? this.tryRequire(challengeInfo.image) : null
        this.decorativeImage = challengeInfo.decorativeImage ? this.tryRequire(challengeInfo.decorativeImage) : null
        this.speedReward = challengeInfo.speedReward
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClick = this.handleClick.bind(this) //TODO renombrar a pista
        this.handleChange = this.handleChange.bind(this)

        const This = this
        if (this.props.socket) {
            this.props.socket.on("server/challengePassed", function(data) {
                if(data.teamId === id && data.teamId === this.props.teamId){
                    This.setState({ passed: true });
                }
            })
        }
    }
    
    tryRequire(imageFile) {
        try {
         return require('../images/'+imageFile);
        } catch (err) {
         return null;
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            window.location.reload()
        }
      }

    handleSubmit(event) {
        event.preventDefault();
        const answer = this.state.answer.toLowerCase().trim()
        const solution = this.solution.toLowerCase().trim()
        if(answer !== solution && answer !== "000") { //TODO 000 temporal
            this.setState({wrongAnswer: true})
        }
        else {
            this.setState({ loading: true, error: false })
            axios.post(`${SERVER_ENDPOINT}/challengeCompleted`, { callengeId: this.id, gameId: this.props.gameId, userId: this.props.userId, teamId: this.props.teamId, speedReward: this.speedReward })
            .then(res => {
                this.setState({ loading: false })
                debugger
                if(res.data.error) {
                    this.setState({ error: res.data.error.detail })
                }
                else {
                    this.setState({ passed: true });
                }
                
                
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

    handleClick(e) {
        this.points--
        document.getElementById('pista').innerHTML = this.clue
    }

    render() {
        if(!this.id) {
            return <NotFound/>
        }
        if(this.state.passed) {
            return <div className="container challenge-container">
                    <p>¡Objetivo superado!</p>
                    <Link to={'./'+this.nextChallengeId} className="App-link">
                        <Button className="g-start-btn" type="submit">Siguiente</Button>
                    </Link>
                </div>
            // return <Redirect to={'/challenge/'+this.nextChallengeId} />
        }
        return <React.Fragment>
            {this.state.loading && <Loading/>}
            
        <div className="container challenge-container">
            <h2 className="challenge-title">Misión #{this.id}</h2>
            {this.state.error && <Alert variant="danger">Error: {this.state.error}</Alert>}
            <div className="row">
                <div className="col-12" align="center">
                    <p>{this.challengeText}</p>
                    <p className="challenge-subtext" >{this.textoSecundario}</p>
                    {this.image ? <div className="challenge-main-img"><img src={this.image} alt={this.image}/></div>:"" }
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
        {this.decorativeImage ? <div className="challenge-img-right"><img src={this.decorativeImage} alt={this.decorativeImage}/></div>:"" }
        </React.Fragment>
    }
}

//export default Prueba
const pruebaConnected = connect(mapStateToProps)(Challenge);
export default pruebaConnected;