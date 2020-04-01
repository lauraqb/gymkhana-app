import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return { 
      gameId: state.game,
      gameInfo: state.gameInfo
    }
}
function Layout(props) {
    
    const bg = (props.gameInfo && props.gameInfo[0] && props.gameInfo[0].background) ? props.gameInfo[0].background : ""
    let backgroundClassName = ""
    if (bg === "wood")          backgroundClassName = "App-bg-wood"
    else if (bg === "corona")   backgroundClassName = "App-bg-corona"
    
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


