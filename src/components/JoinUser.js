import React from 'react'
import { connect } from 'react-redux'
import { setUsername, setUserId, restartPoints } from '../js/actions/index'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import { FaExclamationCircle} from 'react-icons/fa/'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Loading from '../components/Loading'
import { SERVER_ENDPOINT  } from '../api-config'

/** Redux function. Sirve para enviar (dispatch) acciones al store */
function mapDispatchToProps(dispatch) {
    return {
        setUsername: username => dispatch(setUsername(username)),
        setUserId: userid => dispatch(setUserId(userid)),
        restartPoints: points => dispatch(restartPoints())
    }
}

const mapStateToProps = state => {
    return { 
        game: state.game,
        username: state.username,
        // team: state.team
    }
}

class Inicio extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            error: null,
            duplicatedName: false,
            username: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        // this.textoIntro = "Estás a punto de empezar la aventura más emocionante que ha ocurrido nunca en esta ciudad. "+
       // "Un tesoro se esconde en estas tierras. Para poder encontrarlo, antes debéis demostrar que sois verdaderos piratas."
        //"Solo el equipo que consiga demostrar mayor liderazgo, creatividad e ingenio, será digno de merecer este puesto al más valiente. "
    }
    
    handleChange(event) {
        const value = event.target.value
        const name = event.target.name
        this.setState({
          [name]: value,
          duplicatedName: false,
          emptyInput: false,
          error: null,
        });
    }

    handleSubmit(e){
        e.preventDefault()
        this.props.restartPoints()
        const username = this.state.username
        if(!username) {
            this.setState({ emptyInput: true })
        }
        else {
            this.setState({ loading: true })
            axios.post(`${SERVER_ENDPOINT}/joinUser`, {username: username, game_id: this.props.game })
            .then(res => {
                this.setState({ loading: false, error: false })
                if(res.data.duplicated) {
                    this.setState({ duplicatedName: true })
                }
                else {
                    this.props.setUserId(res.data.result.id)
                    this.props.setUsername(username) //esto provocará que se actualice el state y se renderice la página co joinTeam
                }
            })
            .catch(error => this.setState({ loading: false, error: error.message })) 
        }
    }

    render() {
        const inputError = (this.state.duplicatedName || this.state.emptyInput) ? true : false
        const inputErrorClassName = inputError ? "g-input-error" : ""

        return  <React.Fragment>
            {this.state.loading && <Loading/>}
            {this.state.error && <Alert variant="danger">Error: {this.state.error}</Alert>}
            <p className="g-welcome-message">{this.props.welcomeMessage}</p>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control className={"g-input "+ inputErrorClassName} type="text" placeholder="Nickname" name="username" value={this.state.username} onChange={this.handleChange} />
                    { this.state.duplicatedName && <Form.Text className="g-invalid-input-warning"><FaExclamationCircle/> Ups! Este nombre ya existe</Form.Text>}
                    { this.state.emptyInput && <Form.Text className="g-invalid-input-warning"><FaExclamationCircle/> Ey! No olvides poner tu nombre</Form.Text>}
                </Form.Group>
                <Button className="g-btn" variant="primary" type="submit">Siguiente</Button>
            </Form>
        </React.Fragment>
    }
}

const inicioConnected = connect(mapStateToProps, mapDispatchToProps)(Inicio)
export default inicioConnected;
