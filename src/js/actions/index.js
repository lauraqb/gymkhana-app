import { SET_GAME, SET_GAME_INFO, SET_USERNAME, SET_USERID, SET_TEAM, SET_TEAMID } from "../constants/action-types"
import { ADD_POINT } from "../constants/action-types"
import { RESET_POINTS } from "../constants/action-types"
import { DELETE_POINTS } from "../constants/action-types"
import { SET_TIME } from "../constants/action-types"


export function setGame(payload) {
    return { type: SET_GAME, payload }
}
export function setGameInfo(payload) {
    return { type: SET_GAME_INFO, payload }
}
export function setUsername(payload) {
    return { type: SET_USERNAME, payload }
}
export function setUserId(payload) {
    return { type: SET_USERID, payload }
}
export function setTeam(payload) {
    return { type: SET_TEAM, payload }
}
export function setTeamId(payload) {
    return { type: SET_TEAMID, payload }
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