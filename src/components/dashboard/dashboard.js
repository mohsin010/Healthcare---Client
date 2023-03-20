import React from "react";
import { Link } from "react-router-dom";
import DataTable from "../dataTable/dataTable"; 
import image from '../../assets/user.png';
import './style.css';
function Dashboard(props) {
    return (
        <div>
            {/* <!-- Navbar --> */}
            <nav class="navbar navbar-expand-lg navbar-light " style={{ backgroundColor: "#0097a3" }}>
                {/* <!-- Container wrapper --> */}
                <div class="container-fluid">

                    {/* <!-- Collapsible wrapper --> */}
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        {/* <!-- Navbar brand --> */}
                        <Link class="navbar-brand mt-2 mt-lg-0 " to="/home" style={{ color: "#ffffff", marginLeft: 60 }}>
                            Healthcare Aid
                        </Link>
                        
                        {/* <!-- Left links --> */}
                        <ul class="navbar-nav  me-auto mb-2 mb-lg-0 ">
                            <li class="nav-item ">
                                <Link class="nav-link font-white " to="/home">Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link font-white" to="/mypage">My Page</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link font-white" to="/devices">Devices</Link>
                            </li>
                            {/* <li class="nav-item">
                                <a class="nav-link" href="#">Projects</a>
                            </li> */}
                        </ul>
                        {/* <!-- Left links --> */}
                    </div>
                    {/* <!-- Collapsible wrapper --> */}

                    {/* <!-- Right elements --> */}
                    <div class="d-flex align-items-center " style={{ marginRight: 40 }}>
                        {/* <!-- Icon --> */}
                        {/* <!-- Avatar --> */}
                        <div class="dropdown pro-img">
                            <a
                                class="data-toggle d-flex align-items-center hidden-arrow"
                                href="#"
                                id="navbarDropdownMenuAvatar" 
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <img
                                    src={image}
                                    class="rounded-circle"
                                    height="25"
                                    alt="Black and White Portrait of a Man"
                                    loading="lazy"
                                />
                            </a>
                            <ul
                                class="dropdown-menu dropdown-menu-end"
                                aria-labelledby="navbarDropdownMenuAvatar"
                            >
                                <li>
                                    <Link to="#" class="dropdown-item disabled" aria-expanded="false">Org Name</Link>
                                    {/* <a class="dropdown-item" href="#">My profile</a> */}
                                </li>
                                {/* <li>
                                    <Link to="#" class="dropdown-item">My Settings</Link>
                                </li> */}
                                <li>
                                    <Link to="/" class="dropdown-item">Logout</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* <!-- Right elements --> */}
                </div>
                {/* <!-- Container wrapper --> */}
            </nav>
            {/* <!-- Navbar --> */}
        </div>
    );
}

export default Dashboard;