import React from "react"
import GridLoader from "react-spinners/GridLoader"

class Loading extends React.Component {
    render() {
        return (
            <div className="">
                <GridLoader
                    size={15}
                    color={"#36D7B7"}
                    //margin=
                    // loading={this.state.loading}
                />
            </div>
        )
    }
 }

 export default Loading

 