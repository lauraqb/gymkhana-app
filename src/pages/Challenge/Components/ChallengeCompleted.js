import React from 'react'
import Button from 'react-bootstrap/Button'
import Loading from 'components/Loading/Loading'

class ChallengeCompleted extends React.Component {

    render() {
        const currentChallengeCompleted = this.props.currentChallengeCompleted
        
        if(currentChallengeCompleted.loading) {
            return <Loading/>
        }
        if(currentChallengeCompleted.error) {
            return <div>Error: {JSON.stringify(currentChallengeCompleted)}</div>
        }
        if(currentChallengeCompleted.passed) {
            return (
                <div className="container challenge-container" data-test="ChallengeCompleted">
                    <p>¡Objetivo superado!</p>
                    <Button onClick={this.props.onGoNextButton} className="g-start-btn" type="submit">Siguiente</Button>
                </div>
            )
        }
        else return null
    }
}

export default ChallengeCompleted