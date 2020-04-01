import React from 'react'
import { connect } from 'react-redux'
import { restartPoints } from '../js/actions/index'
import JoinTeam from '../components/JoinTeam'
import JoinUser from '../components/JoinUser'
import "./styles/Join.css"

/** Redux function. Sirve para enviar (dispatch) acciones al store */
function mapDispatchToProps(dispatch) {
    return {
        restartPoints: points => dispatch(restartPoints())
    }
}

const mapStateToProps = state => {
    return {
        game: state.game,
        gameInfo: state.gameInfo,
        username: state.username,
    }
}

class Inicio extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            step: 1,
        }
        const gameData = this.props.gameInfo ? this.props.gameInfo[0] : null
        this.welcomeMessage = gameData ? gameData.welcomeMessage : "Welcome"
        this.joinTeamMessage = gameData ? gameData.joinTeamMessage : ""
        this.image1 = gameData && gameData.joinPage ? this.tryRequire(gameData.joinPage[0]) : null
        this.image2 = gameData && gameData.joinPage ? this.tryRequire(gameData.joinPage[1]) : null
     }

    componentWillMount() {
        if(this.props.username)  {
            this.setState({step: 2})
        }
    }

    tryRequire(image) {
        try {
         return require('../images/'+image);
        } catch (err) {
         return null;
        }
    }

    render() {
        return <React.Fragment>
            <div className="join-container">
                {!this.props.username &&
                    <JoinUser welcomeMessage={this.welcomeMessage}/>
                }
                {this.props.username &&
                    <JoinTeam message={this.joinTeamMessage}/>
                }
            </div>
            <div>
            {this.image1 && <div className="join-img-left"><img src={this.image1} alt={this.image1}/></div>}
            {this.image2 && <div className="g-img-right"><img src={this.image2} alt={this.image2}/></div>}
            </div>

        </React.Fragment>
    }
}

const inicioConnected = connect(mapStateToProps, mapDispatchToProps)(Inicio)
export default inicioConnected;
