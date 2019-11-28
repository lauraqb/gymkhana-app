import React from "react";
import { connect } from 'react-redux'
import "../styles/navbar.css";
import Navbar from 'react-bootstrap/Navbar';
import pirateIcon from '../images/pirataLogo.png';

const mapStateToProps = state => {
  return { 
    team: state.team,
    points: state.points
  };
};

class Menu extends React.Component {
    render() {
        return <Navbar variant="light" bg="light" className="g-navbar ">
        <Navbar.Brand className="">
          Equipo {this.props.team}
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="justify-content-end">
            Puntos: {this.props.points}
              <a href="https://wa.me/34670356948" target="_blank" rel="noopener noreferrer" className="App-link g-logo">
                <img src={pirateIcon} alt="help" width={50} height={50}/></a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    }
}
//<Navbar bg="light" variant="light" className="ec-navbar">

const menuConnected = connect(mapStateToProps)(Menu);
export default menuConnected;
