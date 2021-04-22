import React, { Component } from 'react';
class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 'motivational'
        }
    }

    render() {
        return (
            <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Motivation Journal</a>    
                </div>
            </nav>
            </>
        );
    };
}
export default NavBar;