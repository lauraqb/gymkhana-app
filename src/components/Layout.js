import React from 'react'
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
    if (background === 2) {
        backgroundClassName = "App-bg-corona"
    }
    return (
        <React.Fragment>
            <div className={"App "+backgroundClassName}>
                {props.children}
            </div>
        </React.Fragment>
    )
}

const layoutConnected = connect(mapStateToProps)(Layout);
export default layoutConnected





/****import React from 'react'
import Navbar from './Navbar'
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return { 
      game: state.game
    }
}
function Layout(Child) {
    function _layout(props) {
        debugger
        let backgroundClassName = ""
        const background = props.game //TODO cambiar por this.props.background
        if (background === 1) {
            backgroundClassName = "App-bg-wood"
        }
        return (
            <React.Fragment>
                <div className={"App "+backgroundClassName}>
                    <Navbar/>
                    <Child {...props} />
                </div>
            </React.Fragment>
        )
    }
    return _layout
}


const layoutConnected = connect(mapStateToProps)(Layout);
export default layoutConnected
 */