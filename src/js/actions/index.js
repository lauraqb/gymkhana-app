import { SET_TEAM } from "../constants/action-types"
import { ADD_POINT } from "../constants/action-types"
import { RESET_POINTS } from "../constants/action-types"
import { DELETE_POINTS } from "../constants/action-types"
import { SET_TIME } from "../constants/action-types"

export function setTeam(payload) {
    return { type: SET_TEAM, payload }
}

export function addPoints(payload) {
    return { type: ADD_POINT, payload }
}

export function deletePoints(payload) {
    return { type: DELETE_POINTS, payload }
}

export function restartPoints() {
    return { type: RESET_POINTS }
}

export function setTime(payload) {
    return { type: SET_TIME, payload }
}