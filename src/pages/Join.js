import React from 'react'
import { connect } from 'react-redux'
import { setUsername, setTeam, restartPoints } from '../js/actions/index'
import JoinTeam from '../components/JoinTeam'
import JoinUser from '../components/JoinUser'
import brujula from '../images/brujula.png'
import "./styles/Join.css"

/** Redux function. Sirve para enviar (dispatch) acciones al store */
function mapDispatchToProps(dispatch) {
    return {
        setUsername: username => dispatch(setUsername(username)),
        setTeam: team => dispatch(setTeam(team)),
        restartPoints: points => dispatch(restartPoints())
    }
}

const mapStateToProps = state => {
    return { 
        game: state.game,
        username: state.username,
        team: state.team
    }
}

class Inicio extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            step: 1,
            username: null,
            userId: null
        }
        this.handleStepChange = this.handleStepChange.bind(this)

        // this.textoIntro = "Estás a punto de empezar la aventura más emocionante que ha ocurrido nunca en esta ciudad. "+
       // "Un tesoro se esconde en estas tierras. Para poder encontrarlo, antes debéis demostrar que sois verdaderos piratas."
        //"Solo el equipo que consiga demostrar mayor liderazgo, creatividad e ingenio, será digno de merecer este puesto al más valiente. "
    }

    componentWillMount() {
        if(this.props.username)  {
            this.setState({step: 2})
        }
        //Si el usuario ya se ha registrado, omitimos esta pantalla
        // if(this.props.username && this.props.team)  
        //     this.props.history.push('/intro')
        //this.props.setTeam(null)
    }
    //TODO pendiente manejar refresco pagina
    componentDidMount() {
        window.addEventListener('beforeunload', this.beforeunload.bind(this))
    }
    beforeunload(e) {
        const confirmationMessage = 'Some message'
        e.returnValue = confirmationMessage
        return confirmationMessage;  
    }


    handleStepChange() {
        this.setState({ step: 2 })
    }

    render() {
        return <React.Fragment>
            {this.state.step===1 && 
                <JoinUser gameId={this.props.game} onChangeStep={this.handleStepChange}/> 
            }
            {this.state.step===2 && 
                <JoinTeam gameId={this.props.game}/> 
            }
            <div className="g-brujula"><img src={brujula} width={150} height={150} alt=""/></div>
        </React.Fragment>
    }
}

const inicioConnected = connect(mapStateToProps, mapDispatchToProps)(Inicio)
export default inicioConnected;
