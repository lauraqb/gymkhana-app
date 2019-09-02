import React from 'react';
import { connect } from 'react-redux'
import { setTeam, restartPoints } from '../js/actions/index'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//import { Link } from 'react-router-dom';

function mapDispatchToProps(dispatch) {
    return {
        setTeam: team => dispatch(setTeam(team)),
        restartPoints: points => dispatch(restartPoints())
    }
}

class Inicio extends React.Component {

    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        if("geolocation" in navigator) {

        }
        navigator.geolocation.getCurrentPosition((position)=> {
            debugger;
        })


        this.textoIntro = "Os disponeis a empezar la aventura más emocionante que ha ocurrido nunca en esta ciudad. "+
        "La *** debe escoger el mejor equipo "+
        "Solo el equipo que consiga demostrar mayor liderazgo, creatividad e ingenio, será digno de merecer este puesto al más valiente. "+
        "Para demostrarlo tendreis que consiguir encontrar la herradura sagrada y tener el mayor número de puntos. "+
        "Tu objetivo será seguir las pistas hasta encontrar la herradura escondida. "+
        "Por el camino irás acumulando puntos."
    }
    
    handleSubmit(e){
        e.preventDefault();
        this.props.restartPoints()
        let codigo = document.getElementById('inputCodigo').value.toLowerCase()
        switch(codigo) {
            case "b2345": 
                this.props.setTeam("rojo")
                this.props.history.push('/intro')
            case "1o345":
                this.props.setTeam("azul")
                this.props.history.push('/intro')
            case "1o345":
                this.props.setTeam("verde")
                this.props.history.push('/intro')
                break
            default:
                alert("código incorrecto")
                break
        }
    }
     render() {
        return  <div className="App">
            <header className="App-header">
                <p>
                    Bienvenido a la <code>Gymkhana de Urbanita</code>.
                </p>
                <p>{this.textoIntro}</p> 
                <p></p>
                <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="text" placeholder="Nombre" id="inputCodigo" />
                                <Form.Text className="text-muted">Introduce el código</Form.Text>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Entrar
                            </Button>
                        </Form>
                
            </header>
        </div>
    }
}

const inicioConnected = connect(null, mapDispatchToProps)(Inicio)
export default inicioConnected;


//<Link to="./prueba1" className="App-link"><h1>Empieza el juego</h1></Link>