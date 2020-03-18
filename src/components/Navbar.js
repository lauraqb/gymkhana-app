import React from "react"
import { connect } from 'react-redux'
import "./styles/Navbar.css"
import Navbar from 'react-bootstrap/Navbar'
import helpIcon from '../images/question_icon.svg'

const mapStateToProps = state => {
  return { 
    team: state.team,
    points: state.points
  }
}

class Menu extends React.Component {

  render() {
    return (
      <Navbar variant="light" bg="light" className="g-navbar ">
        <Navbar.Brand className="font-weight-bold">
          Equipo {this.props.team}
        </Navbar.Brand>
        <Navbar.Brand className="">
          Puntos: {this.props.points}
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="justify-content-end">
            
              <a href="https://wa.me/34670356948" target="_blank" rel="noopener noreferrer" className="App-link g-logo">
                <img src={helpIcon} alt="help" width={35} height={35}/>
      </a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
//<Navbar bg="light" variant="light" className="ec-navbar">

const menuConnected = connect(mapStateToProps)(Menu);
export default menuConnected;
