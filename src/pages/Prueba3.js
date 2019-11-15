import React from 'react'
import { connect } from 'react-redux'
import Navbar from '../components/Navbar';
import Prueba from '../components/Prueba'
import { addPoints } from '../js/actions/index'


function mapDispatchToProps(dispatch) {
    return {
        addPoints: points => dispatch(addPoints(points))
    }
}

/**Prueba del tanque */
class Prueba3 extends React.Component {
    constructor(props) {
        super(props)
        this.id = 3
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

const prueba3Connected = connect(null, mapDispatchToProps)(Prueba3)
export default prueba3Connected;