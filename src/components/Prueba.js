import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Timer from './Timer'
import tanque from '../images/dios-neptuno.jpg'; /**Crear un componente para las imagenes */

let pruebasObject = require('../resources/pruebas.json')

class Prueba extends React.Component {

    constructor(props) {
        super(props)
        const id = this.props.id //número de prueba
        this.challengeText = pruebasObject[id].challengeText
        //this.challengeText = this.challengeText.replace(/\n/g, "<br>")
        this.textoSecundario = pruebasObject[id].textoSecundario
        this.placeholder = pruebasObject[id].placeholder
        this.points = pruebasObject[id].points
        this.solution = pruebasObject[id].solution
        this.images = pruebasObject[id].images
        this.clue = pruebasObject[id].clue
        this.time = pruebasObject[id].time
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClick = this.handleClick.bind(this) //renombrar a pista
    }

    handleSubmit(e) {
        const input = document.getElementById("inputText").value.toLowerCase()
        const solution = this.solution.toLowerCase()
        const timer = document.getElementById("timer") ? document.getElementById("timer").innerHTML : "00"
        if(input === solution) {
            if (timer !== "0:00") {
                if(this.points === 0) alert("¡Muy bien! No has ganado ningún punto pero desbloqueas la siguiente prueba.")
                else if(this.points === 1) alert("¡Muy bien! Habéis ganado "+this.points+" punto.")
                else alert("¡Muy bien! Habéis ganado "+this.points+" puntos.")
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
                    <p className="g-english" >{this.textoSecundario}</p>
                    {this.images ? <img src={tanque} alt="tanque" className="g-imagen"/>:"" }
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Control type="text" placeholder={this.placeholder} id="inputText" />
                            <Form.Text className="text-muted">{this.props.textMuted}</Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Enviar
                        </Button>
                    </Form>
                    {this.time ? <Timer seconds={this.time} time={this.time}/>:"" }
                    {this.clue ? <div className="g-line">
            <p className="g-pista">¿Estás atascado? Pide una pista a cambio un punto</p>
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
