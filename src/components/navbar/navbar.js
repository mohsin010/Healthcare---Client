import React from "react";
import Login from "../login/login";
import Footer from "../footer/footer";


function Navbar(props) {
    return (
        <div >
            <nav className="navbar navbar-expand-lg " style={{backgroundColor:"#0097a3"}}>
                <div className="container">
                    <a className="navbar-brand" style={{color:"#ffffff"}}>Healthcare Aid</a>
                    {/* <a className="navbar-brand me-2" >
                    </a> */}

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#navbarButtonsExample"
                        aria-controls="navbarButtonsExample"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="fas fa-bars"></i>
                    </button>

                    {/* <!-- Right elements --> */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                </div>
            </nav>
            <Login />
            {/* <Footer />         */}
        </div>
    );
}

export default Navbar;