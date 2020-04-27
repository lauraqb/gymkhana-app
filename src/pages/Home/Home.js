import React from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { setGame, setUserId, setUsername, setTeam, setTeamId, setPoints } from 'js/actions/index'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Loading from 'components/Loading/Loading'
import { FaExclamationCircle} from 'react-icons/fa/'
import "./Home.css"
import { SERVER_ENDPOINT  } from 'api-config'

/** Redux function. Sirve para enviar (dispatch) acciones al store */
function mapDispatchToProps(dispatch) {
    return {
        setGame: game => dispatch(setGame(game)),
        setUserId: name => dispatch(setUserId(name)),
        setUsername: name => dispatch(setUsername(name)),
        setTeam: team => dispatch(setTeam(team)),
        setTeamId: teamId => dispatch(setTeamId(teamId)),
        setPoints: points => dispatch(setPoints(points))
    }
}

const mapStateToProps = state => {
    return { 
      gameId: state.game,
      userId: state.userid,
      teamId: state.teamId
    }
}

export class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            error: null,
            gamePin: "",
            invalidPinGame: false,
            emptyInput: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
        
    handleChange(event) {
        const value = event.target.value
        const name = event.target.name
        this.setState({
          [name]: value,
          invalidPinGame: false,
          emptyInput: false
        })
    }
    
    handleSubmit(e) {
        e.preventDefault()
        const gamePin = this.state.gamePin

        if(!gamePin || gamePin === "") {
            this.setState({ emptyInput: true })
        }
        else {
            this.setState({ loading: true }, () => {                    
                axios.post(`${SERVER_ENDPOINT}/validateGame`, {pin: gamePin})
                .then(res => {
                    this.setState({ loading: false, error: false })
                    console.log(res.data);
                    if(!res.data.valid) {
                        this.setState({ invalidPinGame: true })
                    }
                    else {
                        this.startGame(res.data.result.id)
                    }
                })
                .catch(error => this.setState({ loading: false, error: error.message }))
            })
        }
    }

    startGame(gameId) {
        this.props.setGame(gameId)
    }

    render() {
        const inputError = (this.state.invalidPinGame || this.state.emptyInput) ? true : false
        const inputErrorClassName = inputError ? "g-input-error" : ""
        if(this.props.gameId && this.props.userId && this.props.teamId) {
            return <Redirect to='/challenge/current' />
        } 
        else if(this.props.gameId) {
            return <Redirect to='/join' />
        }
        else {
            this.props.setUsername(null)
            this.props.setTeam(null)
        }
        return <React.Fragment>
            {this.state.loading && <Loading/>}
            {this.state.error && <Alert variant="danger">Error: {this.state.error}</Alert>}
            <p className="g-gymkhana">Gymkhana!</p>
            <Form onSubmit={this.handleSubmit} id="home-form">
                <Form.Group>
                    <Form.Control className={"g-input "+ inputErrorClassName} type="text" placeholder="Game PIN" name="gamePin" value={this.state.gamePin} onChange={this.handleChange}/>
                    { this.state.invalidPinGame && <Form.Text className="g-invalid-input-warning" id="g-invalid-pin"><FaExclamationCircle/> ¡PIN inválido!</Form.Text>}
                    { this.state.emptyInput && <Form.Text className="g-invalid-input-warning" id="g-empty-input"><FaExclamationCircle/> Ups! Necesitas indicar el PIN</Form.Text>}
                </Form.Group>
                <Button className="g-btn" variant="primary" type="submit" id="home-btn">
                    Entrar
                </Button>
            </Form>     
        </React.Fragment>
    }
}

const homeConnected = connect(mapStateToProps, mapDispatchToProps)(Home)
export default homeConnected;
