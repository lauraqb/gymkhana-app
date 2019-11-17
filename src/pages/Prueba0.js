import React from 'react'
import { connect } from 'react-redux'
import Navbar from '../components/Navbar';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';


const mapStateToProps = state => {
    return { team: state.team };
};

class Intro extends React.Component {
    constructor(props) {
        super(props)
        this.textoIntro = ""
    }

    render() {
        return ( <div className="App">
                <Navbar></Navbar>
                <div className="g-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-12" align="center">
                                <h1>¡Enhorabuena <code>equipo {this.props.team}</code>!</h1>
                                <p>{this.textoIntro}</p>                          
                                    <Link to="./prueba1" className="App-link">
                                        <Button variant="primary" type="submit">Empezar la primera prueba</Button>
                                    </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        );
    }
}
const introConnected = connect(mapStateToProps)(Intro);

export default introConnected;