import React from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import { setGame, setName, setTeam, restartPoints } from '../js/actions/index'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Loading from '../components/Loading'

const config = require('../config.json')
const endpoint = config.server

/** Redux function. Sirve para enviar (dispatch) acciones al store */
function mapDispatchToProps(dispatch) {
    return {
        setGame: game => dispatch(setGame(game)),
        setName: name => dispatch(setName(name)),
        setTeam: team => dispatch(setTeam(team)),
        restartPoints: points => dispatch(restartPoints())
    }
}

const mapStateToProps = state => {
    return { 
      game: state.game
    };
};

class Inicio extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            error: null,
            invalidPinGame: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillMount() {
        //Si el usuario ya ha entrado, omitimos esta pantalla
        if(this.props.game && this.props.name)  
            this.props.history.push('/join')
        else {
            //reseteamos los valores del estado
            this.props.setGame(null)
            this.props.setName(null)
            this.props.setTeam(null)
        }
    }
    
    handleSubmit(e){
        e.preventDefault();
        //this.props.restartPoints()
        const gamePin = document.getElementById('gamePin').value
        switch(gamePin) {
            case "test":
                this.startGame("test")
                break
            case "":
                alert("Rellene el campo")
                break
            default:
                this.setState({ loading: true }, () => {                      
                    axios.post(endpoint+"/validateGame", {pin: gamePin})
                    .then(res => {
                        this.setState({ loading: false, error: false })
                        if(res.data === "No existe") {
                            this.setState({ invalidPinGame: true })
                        }
                        console.log(res.data);
                    })
                    .catch(error => this.setState({ loading: false, error: error.message }));
                })
        }
    }
    startGame(gameId) {
        this.props.setGame(gameId)
        this.props.history.push('/join')
    }

    render() {
        if(this.state.loading) {
            return <Loading/>
        }
        if(this.state.error) {
            return <h1>Error: {this.state.error}</h1>
        }
        return <div className="App">
                <div className="inicio-content">
                    <Form onSubmit={this.handleSubmit}>
                        {this.state.invalidPinGame && <div>We didn't recognize that game PIN. Please check and try again.</div>}
                        <Form.Group>
                            <Form.Control className="g-input" type="text" placeholder="Game PIN" id="gamePin" />
                        </Form.Group>
                        <Button className="g-btn" variant="primary" type="submit">
                            Entrar
                        </Button>
                    </Form>
                </div>           
        </div>
    }
}

const inicioConnected = connect(mapStateToProps, mapDispatchToProps)(Inicio)
export default inicioConnected;
