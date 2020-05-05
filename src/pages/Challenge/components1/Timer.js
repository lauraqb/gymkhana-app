import React from 'react'

class Timer extends React.Component {

    constructor(props) {
        super(props)
        let min, sec;
        const parts = this.props.time.split(':');
        if (parts.length === 2) {
            min = parseInt(parts[0])
            sec = parseInt(parts[1])
        } else {
            min = 0;
            sec = parts[0];
        }
        this.state = {
            seconds: sec, 
            minuts: min
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
            this.setState({
                minuts: this.state.minuts-1,
                seconds: 59
            })
            // this.state.minuts--
            // this.state.seconds = 59
        }
        else {
            this.setState({
                seconds: this.state.seconds-1
            })
            // this.state.seconds--
        }
        
    }
    startCountDown() {
        this.intervalHandle = setInterval(this.tick, 1000);
    }

    render() {
       return (
        <div>
         <code><h1 style={{ fontSize: 100 }} id="timer">{this.state.minuts}:{this.state.seconds}</h1></code>
        </div>
      );
    }
}

export default Timer