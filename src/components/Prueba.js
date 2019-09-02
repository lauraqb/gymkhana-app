import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Timer from './Timer'
import tanque from '../images/tanque.PNG'; /**Crear un componente para las imagenes */

let pruebasObject = require('../resources/pruebas.json')

class Prueba extends React.Component {

    constructor(props) {
        super(props)
        this.challengeText = pruebasObject[this.props.id].challengeText
        this.textoIngles = pruebasObject[this.props.id].textoIngles
        this.placeholder = pruebasObject[this.props.id].placeholder
        this.points = pruebasObject[this.props.id].points
        this.solution = pruebasObject[this.props.id].solution
        this.images = pruebasObject[this.props.id].images
        this.clue = pruebasObject[this.props.id].clue
        this.timer = pruebasObject[this.props.id].timer
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClick = this.handleClick.bind(this) //renombrar a pista
    }

    handleSubmit(e) {
        const input = document.getElementById("inputText").value.toLowerCase()
        const timer = document.getElementById("timer") ? document.getElementById("timer").innerHTML : "00"
        if(input == this.solution) {
            if (timer != "00") {
                if(this.points == 0) alert("¡Muy bien! No has ganado ningún punto pero desbloqueas la siguiente prueba.")
                else if(this.points == 1) alert("¡Muy bien! Has ganado "+this.points+" punto.")
                else alert("¡Muy bien! Has ganado "+this.points+" puntos.")
            }
            else {
                alert("Has acertado pero estás fuera de tiempo. No has ganado ningún punto pero desbloqueas la siguiente prueba.")
            }
            this.props.onSubmit(this.points)
        }
        else {
            alert("Sigue intentándolo")
        }
    }

    handleClick(e) {
        this.points--
        document.getElementById('pista').innerHTML = this.clue
    }

    render() {
        return <div className="container g-body">
            <div className="row">
                <div className="col-12" align="center">
                    <h2 className="g-prueba-title">Prueba #{this.props.id}</h2>
                    <p>{this.challengeText}</p>
                    <p className="g-english" >{this.textoIngles}</p>
                    {this.images ? <img src={tanque} className="g-imagen"/>:"" }
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Control type="text" placeholder={this.placeholder} id="inputText" />
                            <Form.Text className="text-muted">{this.props.textMuted}</Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Enviar
                        </Button>
                    </Form>
                    {this.timer ? <Timer seconds={this.timer} minuts={this.timer}/>:"" }
                    {this.clue ? <div className="g-line">
            <p className="g-pista">¿Estás atascado porque no encuentras el tanque? Pide una pista a cambio un punto</p>
            <Button variant="warning" onClick={this.handleClick}>
                Conseguir pista
            </Button>
            <p className="g-pista" id="pista"></p> </div>:"" }
                </div>
                
            </div>
        </div>
    }
}

export default Prueba
