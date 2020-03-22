import React from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import "./styles/Intro.css"

const gameData = require('../resources/data.json')
/**[Redux function] mapStateToProps se usa para seleccionar la parte de los datos del store que the connected component needs */
const mapStateToProps = state => {
    return { 
        team: state.team,
        username: state.username,
    }
}

class Intro extends React.Component {
    constructor(props) {
        super(props)
        this.textoIntro = gameData.introText
        this.name = this.props.username
        this.team = this.props.team
        console.log(props)
    }

    render() {
        return ( 
            <React.Fragment>
                <div className="g-body">
                    <h2 className="g-intro-text">¡Eres del equipo {this.team}!</h2>
                    <p className="g-intro-text">{this.textoIntro}</p>                          
                    <Link to="./challenge/1" className="App-link">
                        <Button className="g-start-btn" type="submit">START</Button>
                    </Link>
                    <div className="g-img-intro"><img src={require("../images/"+gameData.introPage[0])} alt=""/></div>
                </div>
            </React.Fragment>
        )
    }
}
const introConnected = connect(mapStateToProps)(Intro);

export default introConnected;