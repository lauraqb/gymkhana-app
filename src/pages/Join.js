import React from 'react';
import "../styles/join.css";
import { connect } from 'react-redux'
import { setName, setTeam, restartPoints } from '../js/actions/index'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import brujula from '../images/brujula.png';
import socketIOClient from "socket.io-client";

const config = require('../config.json');
const endpoint = config.server
const socket = socketIOClient(endpoint);

/** Redux function. Sirve para enviar (dispatch) acciones al store */
function mapDispatchToProps(dispatch) {
    return {
        setName: name => dispatch(setName(name)),
        setTeam: team => dispatch(setTeam(team)),
        restartPoints: points => dispatch(restartPoints())
    }
}

const mapStateToProps = state => {
    return { 
      jugador: state.name,
      team: state.team
    };
};

class Inicio extends React.Component {

    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        // this.textoIntro = "Estás a punto de empezar la aventura más emocionante que ha ocurrido nunca en esta ciudad. "+
       // "Un tesoro se esconde en estas tierras. Para poder encontrarlo, antes debéis demostrar que sois verdaderos piratas."
        //"Solo el equipo que consiga demostrar mayor liderazgo, creatividad e ingenio, será digno de merecer este puesto al más valiente. "
    }

    componentWillMount() {
        //Si el usuario ya se ha registrado, omitimos esta pantalla
        if(this.props.jugador && this.props.team)  
            this.props.history.push('/intro')
        //this.props.setTeam(null)
    }
    
    handleSubmit(e){
        e.preventDefault();
        this.props.restartPoints()
        const jugador = document.getElementById('inputNombre').value
        const codigo = document.getElementById('inputCodigo').value.toLowerCase()
        let equipo = null
        let datosValidos = true
        if(!jugador) {
            datosValidos = false
            alert("Rellene el campo nombre")
        }
        //TODO validar que nombre no tenga ningun espacio, acento o símbolo
        switch(codigo) {
            case "b2345": 
                equipo = "rojo"
                break
            case "1o345":
                equipo = "azul"
                break
            case "12r45":
                equipo = "verde"
                break
            default:
                datosValidos = false
                alert("código incorrecto")
                break
        }
        if (datosValidos) {
            this.props.setName(jugador)
            this.props.setTeam(equipo)
            socket.emit("nuevoJugador", {jugador: jugador, equipo: equipo});
            this.props.history.push('/intro')
        }
        
    }
     render() {
        return  <div className="App">
            <header className="App-header">
                <div className="inicio-content">
                    {/*<p>
                        Bienvenido a la <code>Gymkhana de Urbanita</code>.
                    </p>
                     <p>{this.textoIntro}</p>  
                     */}

                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Nombre" id="inputNombre" />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Código" id="inputCodigo" />
                            {/* <Form.Text className="text-muted">Introduce el código</Form.Text> */}
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Entrar
                        </Button>
                    </Form>
                </div>
                <div className="g-brujula"><img src={brujula} width={150} height={150} alt=""/></div>
                
            </header>
        </div>
    }
}

const inicioConnected = connect(mapStateToProps, mapDispatchToProps)(Inicio)
export default inicioConnected;


//<Link to="./prueba1" className="App-link"><h1>Empieza el juego</h1></Link>