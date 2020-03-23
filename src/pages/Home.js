import React from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import { setGame, setUserId, setUsername, setTeam, setTeamId, restartPoints } from '../js/actions/index'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Loading from '../components/Loading'
import { FaExclamationCircle} from 'react-icons/fa/'
import "./styles/Home.css"
import { SERVER_ENDPOINT  } from '../api-config'


/** Redux function. Sirve para enviar (dispatch) acciones al store */
function mapDispatchToProps(dispatch) {
    return {
        setGame: game => dispatch(setGame(game)),
        //setBackground: game => dispatch(setBackground(game)),
        setUserId: name => dispatch(setUserId(name)),
        setUsername: name => dispatch(setUsername(name)),
        setTeam: team => dispatch(setTeam(team)),
        setTeamId: teamId => dispatch(setTeamId(teamId)),
        restartPoints: points => dispatch(restartPoints())
    }
}

const mapStateToProps = state => {
    return { 
      game: state.game
    }
}

class Home extends React.Component {

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

    componentWillMount() {
        //Comentamos esto porque de momento no hay botón para salir del juego
        //Si el usuario ya ha entrado en un juego, omitimos esta pantalla
        // if(this.props.game) {
        //     this.props.history.push('/join')
        // }
            
        //reseteamos los valores del estado
        this.props.setGame(null)
        this.props.setUserId(null)
        this.props.setUsername(null)
        this.props.setTeam(null)
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
    
    handleSubmit(e){
        e.preventDefault();
        //this.props.restartPoints()
        const gamePin = this.state.gamePin
        switch(gamePin) {
            case "test":
                this.startGame("test")
                break
            case "" || null:
                this.setState({ emptyInput: true })
                break
            default:
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
        this.props.history.push('/join')
    }

    render() {
        const inputError = (this.state.invalidPinGame || this.state.emptyInput) ? true : false
        const inputErrorClassName = inputError ? "g-input-error" : ""

        // if(this.state.error) {
        //     return <h1>Error: {this.state.error}</h1>
        // }
        return <React.Fragment>
            {this.state.loading && <Loading/>}
            {this.state.error && <Alert variant="danger">Error: {this.state.error}</Alert>}
            <p className="g-gymkhana">Gymkhana!</p>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Control className={"g-input "+ inputErrorClassName} type="text" placeholder="Game PIN" name="gamePin" value={this.state.gamePin} onChange={this.handleChange}/>
                    { this.state.invalidPinGame && <Form.Text className="g-invalid-input-warning"><FaExclamationCircle/> ¡PIN inválido!</Form.Text>}
                    { this.state.emptyInput && <Form.Text className="g-invalid-input-warning"><FaExclamationCircle/> Ups! Necesitas indicar el PIN</Form.Text>}
                </Form.Group>
                <Button className="g-btn" variant="primary" type="submit">
                    Entrar
                </Button>
            </Form>     
        </React.Fragment>
    }
}

const homeConnected = connect(mapStateToProps, mapDispatchToProps)(Home)
export default homeConnected;
