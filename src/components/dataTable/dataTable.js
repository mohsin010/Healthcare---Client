import React, { useState } from "react";
import './tablestyle.css';


function DataTable(props) {
 
    const [success, setSuccess] = useState();
    const [class_, setClass_] = useState("btn tbl-btn-color font-white- btn-cstm1");

    const [data, setData] = useState([
        [{ owner: 'Org1' }, { title: 'Test Data1' }, { description: 'Test Data Description1' }],
        [{ owner: 'Org2' }, { title: 'Test Data2' }, { description: 'Test Data Description2' }],
        [{ owner: 'Org3' }, { title: 'Test Data3' }, { description: 'Test Data Description3' }],
        [{ owner: 'Org4' }, { title: 'Test Data4' }, { description: 'Test Data Description4' }],
        [{ owner: 'Org5' }, { title: 'Test Data5' }, { description: 'Test Data Description5' }],
        [{ owner: 'Org6' }, { title: 'Test Data5' }, { description: 'Test Data Description5' }],
        [{ owner: 'Org5' }, { title: 'Test Data5' }, { description: 'Test Data Description5' }],
        [{ owner: 'Org5' }, { title: 'Test Data5' }, { description: 'Test Data Description5' }],
        [{ owner: 'Org5' }, { title: 'Test Data5' }, { description: 'Test Data Description5' }],
        [{ owner: 'Org5' }, { title: 'Test Data5' }, { description: 'Test Data Description5' }],
        [{ owner: 'Org5' }, { title: 'Test Data5' }, { description: 'Test Data Description5' }],
        [{ owner: 'Org5' }, { title: 'Test Data5' }, { description: 'Test Data Description5' }],
        [{ owner: 'Org5' }, { title: 'Test Data5' }, { description: 'Test Data Description5' }],
        [{ owner: 'Org5' }, { title: 'Test Data5' }, { description: 'Test Data Description5' }],
        [{ owner: 'Org5' }, { title: 'Test Data5' }, { description: 'Test Data Description5' }],
    ], [])

    const deleteRecord = () => {
        return;
    }

    const download = (d) => {
        // if (success == d) {
        setSuccess(d);
        setClass_("btn tbl-btn-color font-white- btn-cstm1 disabled");
        console.log('class applied', success, d)

        // } else {
        // setSuccess(d);
        // setClass_("btn tbl-btn-color font-white- btn-cstm")
        // console.log('class removed', success, d)
        // }
        setTimeout(() => {
            setSuccess()
            setClass_("btn tbl-btn-color font-white- btn-cstm1")
            console.log('class removed', success, d)
        }, 3000);
    }
    const showindex = () => {
        console.log(success)
    }


    return (
        <div>
            <div class="loading" style={{ display: success >= 0 ? '' : 'none' }}>
                <div class="spinner">
                    <div class="rect1"></div>
                    <div class="rect2"></div>
                    <div class="rect3"></div>
                    <div class="rect4"></div>
                    <div class="rect5"></div>
                </div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col" className="fw-no">#</th>
                        <th scope="col" className="fw-al">Owner</th>
                        <th scope="col" className="fw-at">Title</th>
                        <th scope="col" className="fw-dec" >Description</th>
                        <th scope="col" className="fw-action-t">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return <tr>
                            {/* {item.forEach(element => (
                                <> */}
                            <th scope="row">{index + 1}</th>
                            <td>{item[0].owner}</td>
                            <td>{item[1].title}</td>
                            <td>{item[2].description}</td>
                            <td>
                                {/* {success == true ?  */}
                                <button onLoad={showindex} key={index} id="btn-down" type="button" className={success == index ? class_ : class_} onClick={() => download(index)} >
                                    <span style={{ visibility: success == index ? '' : 'hidden' }} > <span class="spinner-grow spinner-grow-sm spin-cstm" role="status" aria-hidden="false"></span> </span>
                                    <span class="btn-dw">Download</span>
                                </button>
                                {/* : <button type="button" key={index} className="btn tbl-btn-color font-white- btn-cstm" onClick={()=>download(index)} > */}

                                {/* Download</button></td> */}
                            </td>
                            {/* </>
                            ))} */}

                        </tr>
                    })}
                    {/* <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td colspan="2">Larry the Bird</td>
                        <td>@twitter</td>
                    </tr> */}
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;