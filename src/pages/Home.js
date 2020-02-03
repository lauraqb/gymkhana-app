import React from 'react';
import { connect } from 'react-redux'
import { setGame, setName, setTeam, restartPoints } from '../js/actions/index'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import socketIOClient from "socket.io-client";

const config = require('../config.json');
const endpoint = config.server
const socket = socketIOClient(endpoint);

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
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillMount() {
        //Si el usuario ya ha entrado, omitimos esta pantalla
        if(this.props.game)  
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
                socket.emit("validateGamePin", {pin: gamePin}, (result)=> {
                    if(result.length === 0) alert("PIN no válido")
                    else {
                        this.startGame(result.id)
                    }
                });     

        }
        // if(!gamePin) {
        //     alert("Rellene el campo")
        // }
        // else {
        //     socket.emit("validateGamePin", {pin: gamePin}, (result)=> {
        //         if(result.length === 0) alert("PIN no válido")
        //         else {
        //             this.props.setGame(result.id)
        //             this.props.history.push('/join')
        //         }
        //     });     
        // }
    }
    startGame(gameId) {
        this.props.setGame(gameId)
        this.props.history.push('/join')
    }

    render() {
        return  <div className="App">
            <header className="App-content">
                <div className="inicio-content">
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Control className="g-input" type="text" placeholder="Game PIN" id="gamePin" />
                        </Form.Group>
                        <Button className="g-btn" variant="primary" type="submit">
                            Entrar
                        </Button>
                    </Form>
                </div>           
            </header>
        </div>
    }
}

const inicioConnected = connect(mapStateToProps, mapDispatchToProps)(Inicio)
export default inicioConnected;
