import { SET_TEAM } from "../constants/action-types"
import { ADD_POINT } from "../constants/action-types"
import { RESET_POINTS } from "../constants/action-types"
import { DELETE_POINTS } from "../constants/action-types"
import { SET_TIME } from "../constants/action-types"

const initialState = {
    team: null,
    points: 0,
    time: 9
}

function rootReducer(state=initialState, action) {
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