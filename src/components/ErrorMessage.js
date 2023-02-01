import React from 'react'

class ErrorMessage extends React.Component {
    render() {
        const { error, reTry } = this.props;
        if(error){
            return (
            <div>
                <div className="main" style={{color: "white", display: "flex", width: "100%", height: "100%", justifyContent: "center", alignItems: "center"}}>
                    <p>Error: {error}</p>
                <button onClick={reTry}>Try again</button>
                </div>
            </div>
            
            );
        }
}
}

export default ErrorMessage
