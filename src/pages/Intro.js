import React from 'react'
import "./styles/Intro.css";
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import pistol from '../images/pistol.png';
import map from '../images/map.png';

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
        this.textoIntro = "¡Busca a tus compañeros y luego haz click en el botón!"
        this.name = this.props.username
        this.team = this.props.team
    }

    render() {
        return ( 
            <React.Fragment>
                    <div className="g-body">
                        <div className="container">
                            <div className="row">
                                <div className="col-12" align="center">
                                    <h2>Eres del equipo {this.team}</h2>
                                    <p>{this.textoIntro}</p>                          
                                        <Link to="./prueba1" className="App-link">
                                            <Button className="" type="submit">Empezar</Button>
                                        </Link>
                                </div>
                            </div>
                        </div>
                        <div className="g-map-img"><img src={map} width={380} alt=""/></div>
                        <div className="g-pistol-img"><img src={pistol} width={220} alt=""/></div>
                    </div>
            </React.Fragment>
        )
    }
}
const introConnected = connect(mapStateToProps)(Intro);

export default introConnected;