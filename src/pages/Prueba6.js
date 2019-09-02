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

class Prueba6 extends React.Component {
    
    constructor(props) {
        super(props)
        this.id = 6
        this.goToNextChallenge = this.goToNextChallenge.bind(this)
    }

    goToNextChallenge(points) {
        this.props.addPoints(points)
        this.props.history.push('/prueba2')
    }

    render() {
        return <div className="g-app">
            <Navbar></Navbar>
            <Prueba id={this.id} onSubmit={this.goToNextChallenge} />
        </div>
    }

}

const prueba6Connected = connect(null, mapDispatchToProps)(Prueba6)
export default prueba6Connected;