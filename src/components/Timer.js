import React from 'react'

class Timer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            seconds: this.props.seconds, 
            minuts: this.props.minutos
        }
        this.startCountDown = this.startCountDown.bind(this);
        this.tick = this.tick.bind(this);
        this.startCountDown();
    }

    tick() {
        var sec =this.state.seconds;
        var min =this.state.minuts;
        this.setState({ seconds: sec })
        if (sec < 10) {
            this.setState({ seconds: "0" + this.state.seconds })
        }
        
        if (sec === 0 && min === 0) {
            clearInterval(this.intervalHandle);
        } 
        else if (sec === 0) {
            this.state.minuts--
            this.state.seconds = 59
            this.props.setTime(this.state.minuts)
        }
        else {
            this.state.seconds--
        }
        
    }
    startCountDown() {
        this.intervalHandle = setInterval(this.tick, 1000);
    }

    render() {
       return (
        <div>
         <code><h1 style={{ fontSize: 100 }} id="timer">{this.props.minuts}:{this.state.seconds}</h1></code>
        </div>
      );
    }
}

export default Timer