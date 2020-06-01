import React from "react"
import { connect } from 'react-redux'
import { resetValues, setGame, fetchPoints } from 'js/actions/index'
import "./Navbar.css"
import Navbar from 'react-bootstrap/Navbar'
import { FaSignOutAlt} from 'react-icons/fa/'

/** Redux function. Sirve para enviar (dispatch) acciones al store */
function mapDispatchToProps(dispatch) {
  return {
      resetValues: data => dispatch(resetValues(data)),
      setGame: game => dispatch(setGame(game)),
      fetchPoints: data => dispatch(fetchPoints(data))
  }
}

const mapStateToProps = state => {
  return { 
    userid: state.userid,
    gameId: state.game,
    username: state.username,
    team: state.team,
    points: state.points
  }
}

class Menu extends React.Component {

  constructor(props) {
    super(props)
    this.logOut = this.logOut.bind(this)
    this.getPoints()
  }


  getPoints() {
    this.props.fetchPoints({gameId: this.props.gameId, userId: this.props.userid})
  }
  
  logOut(e) {
    var r = window.confirm("¿Confirmas que deseas salir?")
    if (!r) return
    this.props.setGame(null)
    this.props.resetValues()
    this.props.history.push('/')
  }

  render() {
    return (
      <Navbar variant="light" bg="light" className="g-navbar" fixed="bottom">
        <Navbar.Brand className="font-weight-bold">
          {/* {this.props.team} */}
          {this.props.username}
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Brand className="g-navbar-points">
            {this.props.points}
          </Navbar.Brand>
          <Navbar.Brand >
            <FaSignOutAlt className="g-navbar-logout" onClick={this.logOut}/>
          </Navbar.Brand>
            {/* <a href="https://wa.me/34670356948" target="_blank" rel="noopener noreferrer" className="App-link g-logo">
              <img src={helpIcon} alt="help" width={35} height={35}/>
            </a> */}
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

const menuConnected = connect(mapStateToProps, mapDispatchToProps)(Menu);
export default menuConnected;
