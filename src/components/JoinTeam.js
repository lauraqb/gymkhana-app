import React from 'react'
import { connect } from 'react-redux'
import { setTeam } from '../js/actions/index'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import { FaExclamationCircle} from 'react-icons/fa/'
import Button from 'react-bootstrap/Button'
import Loading from '../components/Loading'

const config = require('../config.json')
const endpoint = config.server

/** Redux function. Sirve para enviar (dispatch) acciones al store */
function mapDispatchToProps(dispatch) {
    return {
        setTeam: team => dispatch(setTeam(team)),
    }
}

const mapStateToProps = state => {
    return { 
        game: state.game,
        username: state.username,
        userid: state.userid,
        team: state.team
    }
}

class Inicio extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            error: null,
            invalidKeyTeam: false,
            teamKey: null,
            redirect: false
        }
        this.userId = this.props.userid
        this.username = this.props.username
        this.gameId = this.props.gameId
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        const value = event.target.value
        const name = event.target.name
        this.setState({
          [name]: value,
          invalidKeyTeam: false,
          emptyInput: false
        });
    }

    handleSubmit(e){
        e.preventDefault()
        const teamKey = this.state.teamKey
        let team = null
        if(!teamKey) {
            this.setState({ emptyInput: true })
        }
        else if (teamKey === "test") {
            team = "test"
        }
        else {
            this.setState({ loading: true })
            axios.post(endpoint+"/joinTeam", {userId: this.userId, key: teamKey, gameId: this.gameId })
            .then(res => {
                this.setState({ loading: false, error: false })
                if(!res.data.valid) {
                    this.setState({ invalidKeyTeam: true })
                }
                else if(res.data.result) {
                    team = res.data.result.name
                    this.props.setTeam(team)
                    this.setState({ redirect: true })
                }
            })
            .catch(error => this.setState({ loading: false, error: error.message })) 
        }
    }
    render() {
        const inputError = (this.state.duplicatedName || this.state.emptyInput) ? true : false
        if(this.state.error) {
            return <h1>Error: {this.state.error}</h1>
        }
        if(this.state.redirect) {
            return <Redirect to='/intro' />
        }
        return  <React.Fragment>
            <p>¡Hola {this.username}! Bienvenida/o a la Gymkhana de Urbanita.</p>
            {this.state.loading && <Loading/>}
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control className={"g-input "+ `${inputError ? "g-input-error" : ""}`} type="text" placeholder="Clave de tu equipo" name="teamKey" value={this.state.teamKey} onChange={this.handleChange} />
                    { this.state.invalidKeyTeam && <Form.Text className="g-invalid-input-warning"><FaExclamationCircle/> Ups! Esta clave no existe</Form.Text>}
                    { this.state.emptyInput && <Form.Text className="g-invalid-input-warning"><FaExclamationCircle/> Ey! Necesitas indicar la clave</Form.Text>}
                    </Form.Group>
                <Button className="g-btn" variant="primary" type="submit">OK, go!</Button>
            </Form> 
        </React.Fragment>
    }
}

const inicioConnected = connect(mapStateToProps, mapDispatchToProps)(Inicio)
export default inicioConnected;
