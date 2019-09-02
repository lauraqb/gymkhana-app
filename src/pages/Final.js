import React from 'react'
import { connect } from 'react-redux'
import Navbar from '../components/Navbar';

import horseGif from '../images/horse-gif.gif';



const mapStateToProps = state => {
    return { 
      team: state.team,
      points: state.points
    };
  };

class Final extends React.Component {
    
    constructor(props) {
        super(props)
        this.textoPrueba = "Has sido nombrado nuevo miembro de la Orden de Los Caballeros Templarios."
        this.textoIngles = ""
    }

    render() {
        return <div className="g-app">
        <Navbar></Navbar>
        <div className="container g-body">
            <div className="row">
                <div className="col-12" align="center">
                    <h2 className="g-prueba-title">¡Felicidades!</h2>
                    <p>{this.textoPrueba}</p>
                    <p className="g-english" >{this.textoIngles}</p>
                    
                    <img src={horseGif} className="g-imagen"></img>
                </div>
            </div>
        </div>
    </div>

    }
}

//<code><div className="g-final-points"><p style={{ fontSize: 80 }}>{this.props.points}</p>points</div></code>
const finalConnected = connect(mapStateToProps)(Final)
export default finalConnected;