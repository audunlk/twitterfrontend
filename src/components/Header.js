import React from "react";
import Logo from "../images/logo.svg";
import { Link } from "react-router-dom";

class Header extends React.Component{
    render(){
        return(
            <div className="logoBox">
                <Link to="/">
                <img src={Logo} alt="badge" className="logo"/>
                </Link>
            </div>
        )
    }
}

export default Header