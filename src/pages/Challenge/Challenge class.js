import React from 'react'
import { connect } from 'react-redux'
import { addChallengeCompleted } from '../../js/actions/index'
import Loading from '../../components/Loading/Loading'
import axios from 'axios'
import ChallengeDescription from './components/ChallengeDescription'
import ChallengeCompleted from './components/ChallengeCompleted'
import "./Challenge.css";
import { SERVER_ENDPOINT  } from 'api-config'

/** Redux function. Sirve para enviar (dispatch) acciones al store */
function mapDispatchToProps(dispatch) {
    return {
        addChallengeCompleted: data => dispatch(addChallengeCompleted(data))
    }
}

const mapStateToProps = state => {
    return { 
        gameId: state.game,
        gameInfo: state.gameInfo,
        username: state.username,
        userid: state.userid,
        teamId: state.teamId,
        challengeCompleted: state.challengeCompleted
    }
}

export class ChallengePage extends React.Component {

    constructor(props) {

        super(props)
        this.state = {
            passed : false,
            answer : "",
            challengeData : null,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.validateAnswer = this.validateAnswer.bind(this)
        this.goToNextLevel = this.goToNextLevel.bind(this)

        if (this.props.socket) {
            this.props.socket.on("server/challengePassed", function(data) {
                debugger
            })
        }
    }

    componentDidMount() {
        this.getChallengeData()
    }

    getChallengeData() {
        this.setState({ loading: true })
        axios.post(`${SERVER_ENDPOINT}/game/challengeData`, { gameId: this.props.gameId, userId: this.props.userid }, {timeout: 10000})
        .then(res => {
            this.setState({ loading: false })
            if(res.data.error) {
                this.setState({ error: res.data.error.detail })
            }
            else {
                const result = res.data.result
                result.image = result.image ? this.tryRequire(result.image) : null
                result.decorativeImage = result.decorativeImage ? this.tryRequire(result.decorativeImage) : null
                this.setState({ challengeData: res.data.result });
            }
        })
        .catch(error => {
            this.setState({ loading: false, error: error.message })
        }) 
    }
    
    tryRequire(imageFile) {
        try {
            return require('../../images/'+imageFile);
        } catch (err) {
            return null;
        }
    }

    validateAnswer(answer) {
        return axios.post(`${SERVER_ENDPOINT}/game/validateAnswer`, { gameId: this.props.gameId, challengeId: this.state.challengeData.id, answer: answer }, {timeout: 10000})
    }

    handleSubmit() {
        this.props.addChallengeCompleted({ challengeId: this.state.challengeData.id, gameId: this.props.gameId, userId: this.props.userid, teamId: this.props.teamId, speedReward: this.state.challengeData.speedReward })
    }

    goToNextLevel(e) {
        this.setState({ loading: true, challengeData: null })
        this.getChallengeData()
        window.location.reload()
    }

    render() {
        const currentChallengeCompleted = this.state.challengeData && this.props.challengeCompleted && (this.props.challengeCompleted.id === this.state.challengeData.id) ? this.props.challengeCompleted: null
        
        if(this.state.error) {
            return <div>Error: {this.state.error}</div>
        }
        if(this.state.loading) {
            return <Loading/>
        }
        if(this.state.challengeData && !currentChallengeCompleted) {   
            return (
                <ChallengeDescription 
                    challengeData={this.state.challengeData}
                    validateAnswer={this.validateAnswer}
                    onChallengeSubmit={this.handleSubmit} 
                />
            )
        }
        if (currentChallengeCompleted) {
            return <ChallengeCompleted 
                        currentChallengeCompleted={currentChallengeCompleted}
                        onGoNextButton={this.goToNextLevel}
                    />
        }
        else
            return null
    }
}

const pruebaConnected = connect(mapStateToProps, mapDispatchToProps)(ChallengePage);
export default pruebaConnected;