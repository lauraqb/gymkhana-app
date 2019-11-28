import React from 'react'
import "../styles/prueba0.css";
import { connect } from 'react-redux'
import Navbar from '../components/Navbar';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import pistol from '../images/pistol.png';
import map from '../images/map.png';

const mapStateToProps = state => {
    return { team: state.team };
};

class Intro extends React.Component {
    constructor(props) {
        super(props)
        this.textoIntro = "¡Busca a tus compañeros y luego haz click en el botón!"
    }

    render() {
        return ( <div className="App">
                <Navbar></Navbar>
                <div className="g-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-12" align="center">
                                <h1>Eres del equipo {this.props.team}</h1>
                                <p>{this.textoIntro}</p>                          
                                    <Link to="./prueba1" className="App-link">
                                        <Button className="g-round-btn" type="submit">Empezar</Button>
                                    </Link>
                            </div>
                        </div>
                    </div>
                    <div className="g-map-img"><img src={map} width={380}/></div>
                    <div className="g-pistol-img"><img src={pistol} width={220}/></div>
                    
                </div>
            </div> 
        );
    }
}
const introConnected = connect(mapStateToProps)(Intro);

export default introConnected;