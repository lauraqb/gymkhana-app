import React from "react"
import IconLoader from "react-spinners/MoonLoader" //GridLoader
import "./Loading.css"


class Loading extends React.Component {
    render() {
        return (
            <div className="g-loading">
                <IconLoader
                    size={60}
                    color={"#79fbe1"}
                />
            </div>
        )
    }
 }

 export default Loading

 