import React, {useState, useEffect} from 'react'
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

export const ChallengePage = (props) => {
    //const [passed, setPassed] = useState(false)
    const [challengeData, setChallengeData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    if (props.socket) {
        props.socket.on("server/challengePassed", function(data) {
            debugger
        })
    }

    const tryRequire = (imageFile) => {
        try {
            return require('../../images/'+imageFile);
        } catch (err) {
            return null;
        }
    }

    const validateAnswer = (answer) => {
        return axios.post(`${SERVER_ENDPOINT}/game/validateAnswer`, { gameId: props.gameId, challengeId: challengeData.id, answer: answer }, {timeout: 10000})
    }

    const handleSubmit = () => {
        props.addChallengeCompleted({ challengeId: challengeData.id, gameId: props.gameId, userId: props.userid, teamId: props.teamId, speedReward: challengeData.speedReward })
    }

    const goToNextLevel = (e) => {
        setLoading(true)
        setChallengeData(null)
        //getChallengeData()
        window.location.reload()
    }

    useEffect(() => {
        const getChallengeData = () => {
            setLoading(true)
            axios.post(`${SERVER_ENDPOINT}/game/challengeData`, { gameId: props.gameId, userId: props.userid }) //, {timeout: 2000}
            .then(res => {
                setLoading(false)
                if(res.data.error) {
                    setError(res.data.error.detail)
                }
                else {
                    const result = res.data.result
                    result.image = result.image ? tryRequire(result.image) : null
                    result.decorativeImage = result.decorativeImage ? tryRequire(result.decorativeImage) : null
                    setChallengeData(res.data.result)
                }
            })
            .catch(error => {
                setLoading(false)
                setError(error.message)
            }) 
        }

        if(!challengeData) {
            getChallengeData()
        }

    }, [props, challengeData])

    const currentChallengeCompleted = challengeData && props.challengeCompleted && (props.challengeCompleted.id === challengeData.id) ? props.challengeCompleted: null
    
    if(error) {
        return <div>Error: {error}</div>
    }
    if(loading) {
        return <Loading/>
    }
    if(challengeData && !currentChallengeCompleted) {   
        return (
            <ChallengeDescription 
                challengeData={challengeData}
                validateAnswer={validateAnswer}
                onChallengeSubmit={handleSubmit} 
            />
        )
    }
    if (currentChallengeCompleted) {
        return <ChallengeCompleted 
                    currentChallengeCompleted={currentChallengeCompleted}
                    onGoNextButton={goToNextLevel}
                />
    }
    else
        return null

}

const pruebaConnected = connect(mapStateToProps, mapDispatchToProps)(ChallengePage);
export default pruebaConnected;