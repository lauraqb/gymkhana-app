import React from 'react';
import "../styles/home.css";
import { connect } from 'react-redux'
import { setGame, restartPoints } from '../js/actions/index'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import socketIOClient from "socket.io-client";

const config = require('../config.json');
const endpoint = config.server
const socket = socketIOClient(endpoint);

/** Redux function. Sirve para enviar (dispatch) acciones al store */
function mapDispatchToProps(dispatch) {
    return {
        setGame: name => dispatch(setGame(name)),
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
        debugger
        //Si el usuario ya ha entrado, omitimos esta pantalla
        if(this.props.game)  
            this.props.history.push('/join')
    }
    
    handleSubmit(e){
        e.preventDefault();
        //this.props.restartPoints()
        const gamePin = document.getElementById('gamePin').value
        if(!gamePin) {
            alert("Rellene el campo")
        }
        else {
            socket.emit("validateGamePin", {pin: gamePin}, (result)=> {
                if(result.length == 0) alert("PIN no válido")
                else {
                    this.props.setGame(result.id)
                    this.props.history.push('/join')
                }
            });     
        }
    }

    render() {
        return  <div className="App">
            <header className="App-header">
                <div className="inicio-content">
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Control className="g-input" type="text" placeholder="Game PIN" id="gamePin" />
                        </Form.Group>
                        <Button className="g-home-btn" variant="primary" type="submit">
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
