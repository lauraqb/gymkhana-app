import React from "react";
import { connect } from 'react-redux'
import "../styles/navbar.css";
import Navbar from 'react-bootstrap/Navbar';
import horseIcon from '../images/horseLogo.png';

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
          Team {this.props.team}
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="justify-content-end">
            Points: {this.props.points}
              <a href="https://wa.me/34670356948" target="_blank" className="App-link">
                <img src={horseIcon} alt="help" width={60} height={50}/></a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    }
}
//<Navbar bg="light" variant="light" className="ec-navbar">

const menuConnected = connect(mapStateToProps)(Menu);
export default menuConnected;
