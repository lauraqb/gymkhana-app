import socketIOClient from "socket.io-client"
import { SERVER_ENDPOINT  } from './api-config'

const socket = socketIOClient(SERVER_ENDPOINT)

export default socket


// module.exports = socket