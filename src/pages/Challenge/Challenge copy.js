import React from 'react'
import { connect } from 'react-redux'
import { setPoints } from '../../js/actions/index'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Loading from '../../components/Loading/Loading'
import axios from 'axios'
import { FaExclamationCircle} from 'react-icons/fa/'
import Timer from './Components/Timer'
import "./Challenge.css";
import { SERVER_ENDPOINT  } from '../../api-config'
//import NotFound from '../pages/NotFound'
//import socketIOClient from "socket.io-client"

//TODO usar socket de App.js
// const socket = socketIOClient(SERVER_ENDPOINT)
/** Redux function. Sirve para enviar (dispatch) acciones al store */
function mapDispatchToProps(dispatch) {
    return {
        setPoints: points => dispatch(setPoints(points)),
    }
}

const mapStateToProps = state => {
    return { 
        gameId: state.game,
        gameInfo: state.gameInfo,
        username: state.username,
        userId: state.userid,
        teamId: state.teamId
    }
}

export class Challenge extends React.Component {

    constructor(props) {

        super(props)
        this.state = {
            passed : false,
            answer : "",
            wrongAnswer : false,
            challengeData : null,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.showClue = this.showClue.bind(this)
        this.goToNextLevel = this.goToNextLevel.bind(this)
        this.handleChange = this.handleChange.bind(this)

        //const This = this
        if (this.props.socket) {
            this.props.socket.on("server/challengePassed", function(data) {
                debugger
                // if(data.teamId === id && data.teamId === this.props.teamId){
                //     This.setState({ passed: true });
                // }
            })
        }
    }

    componentDidMount() {
        this.getChallengeData()
    }

    getChallengeData() { 
        this.setState({ loading: true })
        axios.post(`${SERVER_ENDPOINT}/challengeData`, { gameId: this.props.gameId, userId: this.props.userId }, {timeout: 10000})
            .then(res => {
                this.setState({ loading: false })
                if(res.data.error) {
                    this.setState({ error: res.data.error.detail })
                }
                else {
                    const result = res.data.result
                    result.image = result.image ? this.tryRequire(result.image) : null
                    result.decorativeImage = result.decorativeImage ? this.tryRequire(result.decorativeImage) : null
                    this.setState({ challengeData: res.data.result });
                }
            })
            .catch(error => {
                this.setState({ loading: false, error: error.message })
            }) 
    }
    
    tryRequire(imageFile) {
        try {
            return require('../../images/'+imageFile);
        } catch (err) {
            return null;
        }
    }
    // componentDidUpdate(prevProps) {
    //     if (this.props.match.params.id !== prevProps.match.params.id) {
    //         window.location.reload()
    //     }
    // }

    getPoints() {
        axios.post(`${SERVER_ENDPOINT}/getPoints`, {gameId: this.props.gameId, userId: this.props.userId})
        .then(res => {
            if(typeof res.data.points === "number") {
                this.props.setPoints(res.data.points)
            }
            else {
                alert("error en getPoints")
            }
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const answer = this.state.answer.toLowerCase().trim()
        const solution = this.state.challengeData.solution.toLowerCase().trim()

        if(answer !== solution && answer !== "---") { //TODO 000 temporal
            this.setState({wrongAnswer: true})
        }
        else {
            this.setState({ loading: true, error: false })
//callengeId typo
            axios.post(`${SERVER_ENDPOINT}/challengeCompleted`, { callengeId: this.state.challengeData.id, gameId: this.props.gameId, userId: this.props.userId, teamId: this.props.teamId, speedReward: this.state.challengeData.speedReward })
            .then(res => {
                this.setState({ loading: false })
                if(res.data.error) {
                    this.setState({ error: res.data.error.detail })
                }
                else {
                    this.getPoints()
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
        })
    }

    showClue(e) {
        this.points--
        document.getElementById('pista').innerHTML = this.state.challengeData.clue
    }

    goToNextLevel(e) {
        this.setState({ passed: false, loading: true, challengeData: null })
        this.getChallengeData()
        window.location.reload()
    }

    render() {
        const challengeData = this.state.challengeData
        if(this.state.error) {
            return <div>Error: {this.state.error}</div>
        }
        if(this.state.passed) {
            return <div className="container challenge-container">
                    <p>¡Objetivo superado!</p>
                    {/* <Link to={'./'+this.state.challengeData.id+1} className="App-link"> */}
                    <Button onClick={this.goToNextLevel} className="g-start-btn" type="submit">Siguiente</Button>
                </div>
        }
        if(this.state.loading) {
            return <Loading/>
        }
        
        else if(!challengeData) {
            return <div></div>
        }
        return <React.Fragment>   
            <div data-test="challengeComponent" className="container challenge-container">
                <h2 className="challenge-title">Misión #{challengeData.id}</h2>
                {this.state.error && <Alert variant="danger">Error: {this.state.error}</Alert>}
                <div className="row">
                    <div className="col-12" align="center">
                        <p>{challengeData.challengeText}</p>
                        <p className="challenge-subtext" >{challengeData.textoSecundario}</p>
                        {challengeData.image ? <div className="challenge-main-img"><img src={challengeData.image} alt={challengeData.image}/></div>:"" }
                        <Form id="myForm" onSubmit={this.handleSubmit}>
                            <Form.Group>
                                <Form.Control type="text" placeholder={challengeData.placeholder} name="answer" value={this.state.answer} onChange={this.handleChange} />
                                { this.state.wrongAnswer && <Form.Text className="g-invalid-input-warning"><FaExclamationCircle/> Respuesta incorrecta. ¡Sigue intentándolo!</Form.Text>}
                                <Form.Text className="text-muted">{this.props.textMuted}</Form.Text>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Enviar
                            </Button>
                        </Form>
                        {challengeData.time ? <Timer seconds={challengeData.time} time={challengeData.time}/>:"" }
                        {challengeData.clue ? <div className="g-line">
                            <p className="g-pista">¿Estás atascado? Pide una pista a cambio un punto</p>
                            <Button variant="warning" onClick={this.showClue}>
                                Conseguir pista
                            </Button>
                            <p className="g-pista" id="pista"></p> </div>:"" }
                    </div>
                </div>
            </div>
            {challengeData.decorativeImage ? <div className="challenge-img-right"><img src={challengeData.decorativeImage} alt={challengeData.decorativeImage}/></div>:"" }
        </React.Fragment>
    }
}

const pruebaConnected = connect(mapStateToProps, mapDispatchToProps)(Challenge);
export default pruebaConnected;