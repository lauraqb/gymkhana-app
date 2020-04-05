import React from "react"
import { connect } from 'react-redux'
import "./styles/Navbar.css"
import Navbar from 'react-bootstrap/Navbar'

const mapStateToProps = state => {
  return { 
    username: state.username,
    team: state.team,
    points: state.points
  }
}

class Menu extends React.Component {

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
            {/* <a href="https://wa.me/34670356948" target="_blank" rel="noopener noreferrer" className="App-link g-logo">
              <img src={helpIcon} alt="help" width={35} height={35}/>
            </a> */}
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

const menuConnected = connect(mapStateToProps)(Menu);
export default menuConnected;
