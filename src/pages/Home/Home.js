import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { setGame, resetValues } from 'js/actions/index'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Loading from 'components/Loading/Loading'
import { FaExclamationCircle} from 'react-icons/fa/'
import "./Home.css"
import { SERVER_ENDPOINT  } from 'api-config'

/** Redux function. Sirve para enviar (dispatch) acciones al store */
function mapDispatchToProps(dispatch) {
    return {
        setGame: game => dispatch(setGame(game)),
        resetValues: name => dispatch(resetValues(name)),
    }
}

const mapStateToProps = state => {
    return { 
      gameId: state.game,
      userId: state.userid,
      teamId: state.teamId
    }
}

export const Home = (props) => {
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)
    const [gamePin, setGamePin] = useState("")
    const [invalidGamePin, setInvalidGamePin] = useState(false)
    const [emptyInput, setEmptyInput] = useState(false)

    const handleChange = (event) => {
        setGamePin(event.target.value)
        setInvalidGamePin(false)
        setEmptyInput(false)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if(!gamePin || gamePin === "") {
            setEmptyInput(true)
        }
        else {
            setLoading(true)                   
            axios.post(`${SERVER_ENDPOINT}/game/validateGame`, {pin: gamePin})
            .then(res => {
                debugger
                setLoading(false)
                setError(false)
                if(!res.data.valid) {
                    setInvalidGamePin(true)
                }
                else {
                    props.resetValues()
                    props.setGame(res.data.result.id)
                }
            })
            .catch(error => {
                setLoading(false)
                setError(error.message )
            })
        }
    }

    useEffect(() => {
        if(!props.gameId) {
            props.resetValues()
        }
    })

    const inputErrorClassName = (invalidGamePin || emptyInput) ? "g-input-error" : ""
    if(props.gameId && props.userid && props.username && props.teamId) {
        return <Redirect to='/challenge/current' />
    } 
    else if(props.gameId) {
        return <Redirect to='/join' />
    }
    return (
        <React.Fragment>
            {loading && <Loading/>}
            {error && <Alert variant="danger">Error: [{SERVER_ENDPOINT}] {error}</Alert>}
            <p className="g-gymkhana">Gymkhana!</p>
            <Form onSubmit={handleSubmit} id="home-form">
                <Form.Group>
                    <Form.Control className={"g-input "+ inputErrorClassName} type="text" placeholder="Game PIN" name="gamePin" value={gamePin} onChange={handleChange}/>
                    { invalidGamePin && <Form.Text className="g-invalid-input-warning" data-testid="invalid-pin"><FaExclamationCircle/> ¡PIN inválido!</Form.Text>}
                    { emptyInput && <Form.Text className="g-invalid-input-warning" data-testid="empty-input"><FaExclamationCircle/> Ups! Necesitas indicar el PIN</Form.Text>}
                </Form.Group>
                <Button className="g-btn" variant="primary" type="submit" id="home-btn">
                    Entrar
                </Button>
            </Form>     
        </React.Fragment>
    )
}

const homeConnected = connect(mapStateToProps, mapDispatchToProps)(Home)
export default homeConnected