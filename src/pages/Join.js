import React from 'react'
import { connect } from 'react-redux'
import { setUsername, setTeam, restartPoints } from '../js/actions/index'
import JoinTeam from '../components/JoinTeam'
import JoinUser from '../components/JoinUser'
import "./styles/Join.css"

const gameData = require('../resources/data.json')

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

     }

    componentWillMount() {
        if(this.props.username)  {
            this.setState({step: 2})
        }
    }
    //TODO pendiente manejar refresco pagina
    // componentDidMount() {
    //     window.addEventListener('beforeunload', this.beforeunload.bind(this))
    // }
    // beforeunload(e) {
    //     const confirmationMessage = 'Some message'
    //     e.returnValue = confirmationMessage
    //     return confirmationMessage;
    // }

    handleStepChange() {
        this.setState({ step: 2 })
    }

    render() {
        return <React.Fragment>
            {/* <div className="g-join-container"></div> */}
            {this.state.step===1 &&
                <JoinUser  gameId={this.props.game}
                           welcomeMessage={gameData.welcomeMessage}
                           onChangeStep={this.handleStepChange}/>
            }
            {this.state.step===2 &&
                <JoinTeam gameId={this.props.game}/>
            }

            <div className="g-img-left"><img src={require("../images/"+gameData.joinPage[0])} alt=""/></div>
            <div className="g-img-right"><img src={require(`../images/`+gameData.joinPage[1])} alt=""/></div>
            {/* <div className="g-pistol-img"><img src={pistol} width={220} alt=""/></div> */}

        </React.Fragment>
    }
}

const inicioConnected = connect(mapStateToProps, mapDispatchToProps)(Inicio)
export default inicioConnected;
