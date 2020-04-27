import { SET_GAME, SET_GAME_INFO, SET_USERNAME, SET_USERID, SET_TEAM, SET_TEAMID, SET_CHALLENGE_COMPLETED } from "../constants/action-types"
import { SET_POINTS } from "../constants/action-types"
import { SET_TIME } from "../constants/action-types"

const initialState = {
    game: null,
    gameInfo: null,
    username: null,
    userid: null,
    team: null,
    teamId: null,
    points: 0,
    time: 9,
    challengeCompleted: {}
}

function rootReducer(state=initialState, action) {

    switch(action.type) {
        case SET_GAME:
            return {
                ...state, game : action.payload
            }
        case SET_GAME_INFO:
            return {
                ...state, gameInfo : action.payload
            }
        case SET_USERNAME:
            return {
                ...state, username : action.payload
            }
        case SET_USERID:
            return {
                ...state, userid : action.payload
            }
        case SET_TEAM:
            return {
                ...state, team : action.payload
            }
        case SET_TEAMID:
            return {
                ...state, teamId : action.payload
            }
        case SET_POINTS:
            return {
                ...state, points : action.payload
            }
        case  SET_TIME:
            return {
                ...state, time : action.payload
            }
        case  SET_CHALLENGE_COMPLETED:
            return {
                ...state, challengeCompleted : action.payload
            }
        default: return state
    }
}

export default rootReducer