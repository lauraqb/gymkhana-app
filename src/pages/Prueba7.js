import React from 'react'
import { connect } from 'react-redux'
import Navbar from '../components/Navbar';
import Prueba from '../components/Prueba'
import { addPoints, deletePoints, setTime } from '../js/actions/index'

const mapStateToProps = state => {
    return { 
      team: state.team,
      time: state.time
    };
};

function mapDispatchToProps(dispatch) {
    return {
        addPoints: points => dispatch(addPoints(points)),
        deletePoints: points => dispatch(deletePoints(points)),
        setTime: time => dispatch(setTime(time))
    }
}

// const pista11 = "Pista 3: Tranquilízate. Es solo un juego."
// const pista22 = "Pista 4: Un caballo amigo suyo está escondido en un lugar que da mucho calor"
// const desbloqueoText = "Obtén una nueva pista a cambio de 3 puntos. "

// function Pista(props) {
//     if (props.team === "Mattea") {
//         return <p><b>Pista 1: </b>Está en una caja</p>
//     }
//     else {
//         return <p><b>Pista 2: </b>Está junto a un caballo</p>
//      }
// }

class Prueba7 extends React.Component {
    
    constructor(props) {
        super(props)
        this.id = 7
        this.goToNextChallenge = this.goToNextChallenge.bind(this)
    }

    goToNextChallenge(points) {
        const nextChallengeId = this.id+1
        this.props.addPoints(points)
        this.props.history.push('/prueba'+nextChallengeId)
    }

    render() {
        return <div className="g-app">
            <Navbar></Navbar>
            <Prueba id={this.id} onSubmit={this.goToNextChallenge} />
        </div>
    }
}


const prueba7Connected = connect(mapStateToProps, mapDispatchToProps)(Prueba7)
export default prueba7Connected;