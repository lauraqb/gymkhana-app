import { SET_GAME, SET_GAME_INFO, SET_USERNAME, SET_USERID, SET_TEAM, SET_TEAMID } from "../constants/action-types"
import { SET_POINTS, SET_CHALLENGE_COMPLETED } from "../constants/action-types"
import { SET_TIME } from "../constants/action-types"
import { SERVER_ENDPOINT  } from 'api-config'
import axios from 'axios'

export function setGame(id) {
    return { type: SET_GAME, payload: id }
}
export function setGameInfo(payload) { //TODO cambiarlo por setChallengeData o similar y meter la función que get el challenge
    return { type: SET_GAME_INFO, payload }
}
export function setUsername(username) {
    return { type: SET_USERNAME, payload: username }
}
export function setUserId(userid) {
    return { type: SET_USERID, payload: userid }
}
export function setTeam(teamname) {
    return { type: SET_TEAM, payload: teamname }
}
export function setTeamId(teamid) {
    return { type: SET_TEAMID, payload: teamid }
}
export function setPoints(payload) {
    return { type: SET_POINTS, payload }
}
export function setTime(payload) {
    return { type: SET_TIME, payload }
}
export function setChallengeCompleted(payload) {
    return { type: SET_CHALLENGE_COMPLETED, payload }
}

/** Envía al servidor los datos de la prueba que ha superado el usuario para que lo inserte en la base de datos*/
export function addChallengeCompleted({ challengeId, gameId, userId, teamId, speedReward } ) {
    return dispatch => {
        dispatch(setChallengeCompleted({id: challengeId, loading: true}))
        return axios.post(`${SERVER_ENDPOINT}/game/challengeCompleted`, { challengeId: challengeId, gameId: gameId, userId: userId, teamId: teamId, speedReward: speedReward })
        .then(({ data }) => {
            if(data.error) {
                dispatch(setChallengeCompleted({id: challengeId, error: data.error}))
            }
            else {
                dispatch(setChallengeCompleted({id: challengeId, passed: true}))
                dispatch(fetchPoints({gameId, userId}))
            }
        })
        .catch(error => dispatch(setChallengeCompleted({id: challengeId, error: error.message})))
    }
}

export function fetchPoints({gameId, userId}) {
    return dispatch => {    
        return axios.post(`${SERVER_ENDPOINT}/game/getPoints`, {gameId: gameId, userId: userId})
        .then(({ data }) => {
            dispatch(setPoints(data.points))
        })
    }

}
