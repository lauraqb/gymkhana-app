import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import JoinTeam from './components/JoinTeam'
import JoinUser from './components/JoinUser'
import "./Join.css"
import { setUsername, setUserId, setTeam, setTeamId } from 'js/actions/index'

/** Redux function. Sirve para enviar (dispatch) acciones al store */
function mapDispatchToProps(dispatch) {
    return {
        setUserId: userid => dispatch(setUserId(userid)),
        setUsername: username => dispatch(setUsername(username)),
        setTeamId: teamId => dispatch(setTeamId(teamId)),
        setTeam: team => dispatch(setTeam(team)), //TODO cambiar a teamname
    }
}
const mapStateToProps = state => {
    return {
        gameid: state.game,
        gameInfo: state.gameInfo,
        userid: state.userid,
        username: state.username,
        team: state.team
    }
}

export class Join extends React.Component {

    constructor(props) {
        super(props)
        this.setUser = this.setUser.bind(this)
        this.setTeam = this.setTeam.bind(this)
        const gameData = this.props.gameInfo ? this.props.gameInfo[0] : null
        this.welcomeMessage = gameData ? gameData.welcomeMessage : "Welcome"
        this.joinTeamMessage = gameData ? gameData.joinTeamMessage : ""
        this.image1 = gameData && gameData.joinPage ? this.tryRequire(gameData.joinPage[0]) : null
        this.image2 = gameData && gameData.joinPage ? this.tryRequire(gameData.joinPage[1]) : null
     }

    tryRequire(image) {
        try {
         return require('images/'+image);
        } catch (err) {
         return null;
        }
    }

    setUser(userid, username) {
        this.props.setUserId(userid)
        this.props.setUsername(username) //esto provocará que se actualice el state y se renderice la página con joinTeam
    }

    setTeam(teamid, teamname) {
        this.props.setTeamId(teamid)
        this.props.setTeam(teamname)
    }

    render() {
        const userSetted = (this.props.userid && this.props.username) ? true : false
        if(userSetted && this.props.team) {
            return <Redirect to='/intro' />
        }
        return (
            <React.Fragment>
                <div className="join-container">
                    {!userSetted && 
                        <JoinUser   welcomeMessage={this.welcomeMessage} 
                                    gameid={this.props.gameid} 
                                    setUser={this.setUser}/>  }
                    {userSetted && 
                        <JoinTeam   message = {this.joinTeamMessage} 
                                    gameid = {this.props.gameid} 
                                    username = {this.props.username}
                                    userid = {this.props.userid}
                                    setTeam = {this.setTeam}/> }
                </div>
                <div>
                    {this.image1 && <div className="join-img-left"><img src={this.image1} alt={this.image1}/></div>}
                    {this.image2 && <div className="g-img-right"><img src={this.image2} alt={this.image2}/></div>}
                </div>
            </React.Fragment>
        )
    }
}

const inicioConnected = connect(mapStateToProps, mapDispatchToProps)(Join)
export default inicioConnected;
