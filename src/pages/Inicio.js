import React from 'react';
import "../styles/inicio.css";
import { connect } from 'react-redux'
import { setTeam, restartPoints } from '../js/actions/index'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import brujula from '../images/brujula.png';

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
        this.textoIntro = "Estás a punto de empezar la aventura más emocionante que ha ocurrido nunca en esta ciudad. "+
        "Un tesoro se esconde en estas tierras. Para poder encontrarlo, antes debéis demostrar que sois verdaderos piratas."
        //"Solo el equipo que consiga demostrar mayor liderazgo, creatividad e ingenio, será digno de merecer este puesto al más valiente. "
    }

    componentWillMount() {
        this.props.setTeam(null)
    }
    
    handleSubmit(e){
        e.preventDefault();
        this.props.restartPoints()
        let codigo = document.getElementById('inputCodigo').value.toLowerCase()
        switch(codigo) {
            case "b2345": 
                this.props.setTeam("rojo")
                this.props.history.push('/intro')
                break
            case "1o345":
                this.props.setTeam("azul")
                this.props.history.push('/intro')
                break
            case "12r45":
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
                <div className="inicio-content">
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
                </div>
                <div className="g-brujula"><img src={brujula} width={150} height={150}/></div>
                
            </header>
        </div>
    }
}

const inicioConnected = connect(null, mapDispatchToProps)(Inicio)
export default inicioConnected;


//<Link to="./prueba1" className="App-link"><h1>Empieza el juego</h1></Link>