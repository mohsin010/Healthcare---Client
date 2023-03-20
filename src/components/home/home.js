import React from "react";
import Dasboard from "../dashboard/dashboard";
import DataTable from "../dataTable/dataTable";

function Home() {
    return (
        <div>
            <Dasboard />

            <div style={{ width: '80%', marginTop: '5%', marginLeft: '10%' }} className="card shadow py-3">
                <div className="card-body">
                    <div className="mb-20 " ><h4 className="card-title">All Records</h4></div>

                    <DataTable />

                </div>
            </div>
        </div> 
    )
}


export default Home;