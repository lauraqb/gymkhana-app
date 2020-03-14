import { SET_GAME, SET_USERNAME, SET_USERID, SET_TEAM, SET_SERVER_CONNECTED } from "../constants/action-types"
import { ADD_POINT } from "../constants/action-types"
import { RESET_POINTS } from "../constants/action-types"
import { DELETE_POINTS } from "../constants/action-types"
import { SET_TIME } from "../constants/action-types"

const initialState = {
    serverConnected: false,
    game: null,
    username: null,
    userid: null,
    team: null,
    points: 0,
    time: 9
}

function rootReducer(state=initialState, action) {
    if(action.type === SET_SERVER_CONNECTED) {
        return Object.assign({}, state, {
            serverConnected : action.payload
        })
    }
    if(action.type === SET_GAME) {
        return Object.assign({}, state, {
            game : action.payload
        })
    }
    if(action.type === SET_USERNAME) {
        return Object.assign({}, state, {
            username : action.payload
        })
    }
    if(action.type === SET_USERID) {
        return Object.assign({}, state, {
            userid : action.payload
        })
    }
    if(action.type === SET_TEAM) {
        return Object.assign({}, state, {
            team : action.payload
        })
    }
    if(action.type === ADD_POINT) {
        return Object.assign({}, state, {
            points : state.points + action.payload
        })
    }
    if(action.type === DELETE_POINTS) {
        return Object.assign({}, state, {
            points : state.points - action.payload
        })
    }
    if(action.type === RESET_POINTS) {
        return Object.assign({}, state, {
            points : 0
        })
    }
    if(action.type ===  SET_TIME) {
        return Object.assign({}, state, {
            time : action.payload
        })
    }
    return state
}

export default rootReducer