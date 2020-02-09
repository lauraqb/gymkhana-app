import React from 'react'
import { connect } from 'react-redux'
import { setName, setTeam, restartPoints } from '../js/actions/index'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import brujula from '../images/brujula.png'
import "./styles/join.css"

const config = require('../config.json')
const endpoint = config.server

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
        game: state.game,
        player: state.name,
        team: state.team
    }
}

class Inicio extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            error: null,
            invalidKeyTeam: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        // this.textoIntro = "Estás a punto de empezar la aventura más emocionante que ha ocurrido nunca en esta ciudad. "+
       // "Un tesoro se esconde en estas tierras. Para poder encontrarlo, antes debéis demostrar que sois verdaderos piratas."
        //"Solo el equipo que consiga demostrar mayor liderazgo, creatividad e ingenio, será digno de merecer este puesto al más valiente. "
    }

    componentWillMount() {
        //Si el usuario ya se ha registrado, omitimos esta pantalla
        if(this.props.player && this.props.team)  
            this.props.history.push('/intro')
        //this.props.setTeam(null)
    }
    //TODO pendiente manejar refresco pagina
    componentDidMount() {
        window.addEventListener('beforeunload', this.beforeunload.bind(this))
      }
     beforeunload(e) {
        debugger
        const confirmationMessage = 'Some message'
        e.returnValue = confirmationMessage

        return confirmationMessage;  
      }
    
    handleSubmit(e){
        e.preventDefault();
        this.props.restartPoints()
        const player = document.getElementById('inputNombre').value
        const codigo = document.getElementById('inputCodigo').value.toLowerCase()
        let team = null
        if(!player) {
            return alert("Rellene el campo nombre")
        }
        else if (codigo=== "test") {
            team = "test"
            this.playerJoined(player, team)
        }
        else {
            axios.post(endpoint+"/joinTeam", {player: player, key: codigo, game_id: this.props.game })
            .then(res => {
                this.setState({ loading: false, error: false })
                console.log(res.data);
                debugger
                if(res.data === "No existe") {
                    this.setState({ invalidKeyTeam: true })
                }
                else {
                    team = res.data
                    this.playerJoined(player, team)
                }
            })
            .catch(error => this.setState({ loading: false, error: error.message })) 
        }
        
    }
    playerJoined(player, team) {
        this.props.setName(player)
        this.props.setTeam(team)
        this.props.history.push('/intro')
    }
    render() {
        return  <div className="App">
            <header className="App-header">
                <div className="inicio-content">
                    {/*<p> Bienvenido a la <code>Gymkhana de Urbanita</code>.
                    </p>
                     <p>{this.textoIntro}</p>  
                     */}
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control className="g-input" type="text" placeholder="Nickname" id="inputNombre" />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control className="g-input" type="text" placeholder="Código Equipo" id="inputCodigo" />
                        </Form.Group>
                        <Button className="g-btn" variant="primary" type="submit">OK, go!</Button>
                    </Form>
                </div>
                <div className="g-brujula"><img src={brujula} width={150} height={150} alt=""/></div>
            </header>
        </div>
    }
}

const inicioConnected = connect(mapStateToProps, mapDispatchToProps)(Inicio)
export default inicioConnected;
