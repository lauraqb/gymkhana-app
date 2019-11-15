import React from 'react'
import { connect } from 'react-redux'
import Navbar from '../components/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import chickenIcon from '../images/chicken.png';
import dogIcon from '../images/dog.png';
import horseIcon from '../images/horse.png';
import { addPoints, deletePoints } from '../js/actions/index'

let points = 3;

function mapDispatchToProps(dispatch) {
    return {
        addPoints: points => dispatch(addPoints(points)),
        deletePoints: points => dispatch(deletePoints(points))
    }
}

/** Prueba de la suma GALLINAS + PERROS + CABALLOS = 6+2+4 */
class Prueba5 extends React.Component {
    
    constructor(props) {
        super(props)
        this.textoPrueba = "("+points+" puntos)"
        this.textoIngles = "Por cada intento fallido perderás un punto así que piensa bien tu respuesta."
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(e){
        e.preventDefault();
        const input = document.getElementById('inputText').value
        if(input.toLowerCase() === "12") {
            alert("¡Muy bien! Has ganado "+points+" puntos.")
            this.props.addPoints(points)
            this.props.history.push('/prueba6')
        }
        else {
            this.props.deletePoints(1)
            alert("Acabas de perder un punto. Sigue intentándolo")
        }
    }

    render() {
        return <div className="g-app">
        <Navbar></Navbar>
        <div className="container g-body">
            <div className="row">
                <div className="col-12" align="center">
                    <h2 className="g-prueba-title">Prueba #5</h2>
                    <img src={chickenIcon} className="g-animal-icon" alt="x"></img>+<img src={dogIcon} className="g-animal-icon" alt="x"></img>
                    +<img src={horseIcon} className="g-animal-icon" alt="x"></img> = ?
                    <p></p>
                    <p>{this.textoPrueba}</p>
                    <p className="g-english" >{this.textoIngles}</p>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Control type="text" placeholder="?" id="inputText" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Enviar
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    </div>
    }
}

const prueba5Connected = connect(null, mapDispatchToProps)(Prueba5)
export default prueba5Connected;