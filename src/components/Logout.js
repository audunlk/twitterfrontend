import React from "react";

class Logout extends React.Component{

async componentDidMount(){
    const {history} = this.props

    setTimeout(() => {
    }, 2000);


    localStorage.removeItem("TWITTER_TOKEN");
    history.replace("/");
}


    render(){
        return(
            <div>
                <h1>Logout</h1>
            </div>
        )
    }
}

export default Logout;