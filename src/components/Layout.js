import React from 'react'
import Navbar from './Navbar'
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return { 
      game: state.game
    }
}
function Layout(props) {
    let backgroundClassName = ""
    const background = props.game //TODO cambiar por this.props.background
    if (background === 1) {
        backgroundClassName = "App-bg-wood"
    }
    return (
        <React.Fragment>
            <div className={"App "+backgroundClassName}>
                <Navbar/>
                {props.children}
            </div>
        </React.Fragment>
    )
}

const layoutConnected = connect(mapStateToProps)(Layout);
export default layoutConnected