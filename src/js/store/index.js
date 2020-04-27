import { createStore, applyMiddleware } from "redux"
import rootReducer from "../reducers/index"
import thunk from "redux-thunk"

function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem("state", serializedState)
    } catch(e) {
        console.log(e)
    }
}

function loadFromLocalStorage() {
    try{
        const serializedState = localStorage.getItem("state")
        if (!serializedState) return undefined
        return JSON.parse(serializedState)
    } catch(e) {
        console.log(e)
        return undefined
    }
}

const persistedState = loadFromLocalStorage()
// const store = createStore(
//     rootReducer,
//     persistedState
// )

const store = createStore(
    rootReducer, 
    persistedState,
    applyMiddleware(thunk)
)

store.subscribe( () => saveToLocalStorage(store.getState()) )
export default store
