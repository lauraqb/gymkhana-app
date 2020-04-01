import React from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import "./styles/Intro.css"

const gameData = require('../resources/data.json')
/**[Redux function] mapStateToProps se usa para seleccionar la parte de los datos del store que the connected component needs */
const mapStateToProps = state => {
    return { 
        gameInfo: state.gameInfo,
        team: state.team,
        username: state.username,
    }
}

class Intro extends React.Component {
    constructor(props) {
        super(props)
        this.name = this.props.username
        this.team = this.props.team

        const gameData = this.props.gameInfo ? this.props.gameInfo[0] : null
        this.textoIntro = gameData ? gameData.introText : ""
        this.image = gameData && gameData.introPage ? this.tryRequire(gameData.introPage[0]) : null
    }
    
    tryRequire(path) {
        try {
         return require(`${path}`);
        } catch (err) {
         return null;
        }
    }

    render() {
        return ( 
            <React.Fragment>
                <div className="g-intro-text">
                    <h2>¡Eres del equipo {this.team}!</h2>
                    <p>{this.textoIntro}</p>                          
                    <Link to="./challenge/1" className="App-link">
                        <Button className="g-start-btn" type="submit">EMPEZAR</Button>
                    </Link>
                    <div className="g-img-intro"><img src={require("../images/"+gameData.introPage[0])} alt=""/></div>
                </div>
            </React.Fragment>
        )
    }
}
const introConnected = connect(mapStateToProps)(Intro);

export default introConnected;