import React from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import { FaExclamationCircle} from 'react-icons/fa/'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Loading from 'components/Loading/Loading'
import { SERVER_ENDPOINT  } from '../../../api-config'


class JoinTeam extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            error: null,
            invalidKeyTeam: false,
            teamKey: "",
        }
        this.userid = this.props.userid
        this.username = this.props.username
        this.gameId = this.props.gameid
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        const value = event.target.value
        const name = event.target.name
        this.setState({
          [name]: value,
          invalidKeyTeam: false,
          emptyInput: false,
          error: null,
        })
    }

    handleSubmit(e){
        e.preventDefault()
        const teamKey = this.state.teamKey
        if(!teamKey) {
            this.setState({ emptyInput: true })
        }
        else {
            this.setState({ loading: true })
            axios.post(`${SERVER_ENDPOINT}/game/joinTeam`, {userid: this.userid, key: teamKey, gameId: this.gameId })
            .then(({data}) => {
                this.setState({ loading: false, error: false })
                if(data.error) {
                    this.setState({ error: data.error.message ? data.error.message : ""+data.error})
                }
                else if(data.invalidKey) {
                    this.setState({ invalidKeyTeam: true })
                }
                else if(data.result) {
                    this.props.setTeam(data.result.id, data.result.name)
                }
            })
            .catch(error => this.setState({ loading: false, error: error.message })) 
        }
    }
    render() {
        const inputError = (this.state.invalidKeyTeam || this.state.emptyInput) ? true : false
        const inputErrorClassName = inputError ? "g-input-error" : ""

        return  <React.Fragment>
                {this.state.loading && <Loading/>}
                {this.state.error && <Alert variant="danger">Error JoinTeam: {this.state.error}</Alert>}
                <div className="join-team-message">
                    <h1>¡Hola {this.username}!</h1>
                    <p>{this.props.message}</p>
                </div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control className={"g-input "+ inputErrorClassName} type="text" placeholder="Clave de tu equipo" name="teamKey" value={this.state.teamKey} onChange={this.handleChange} />
                        { this.state.invalidKeyTeam && <Form.Text className="g-invalid-input-warning"><FaExclamationCircle/> Ups! Esta clave no existe</Form.Text>}
                        { this.state.emptyInput && <Form.Text className="g-invalid-input-warning"><FaExclamationCircle/> Ey! Necesitas indicar la clave</Form.Text>}
                        </Form.Group>
                    <Button className="g-btn" variant="primary" type="submit">OK, go!</Button>
                </Form>
        </React.Fragment>
    }
}

export default JoinTeam
