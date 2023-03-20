import React, { useEffect, useState } from "react";
import Dasboard from "../dashboard/dashboard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faL, faPlus } from '@fortawesome/free-solid-svg-icons'
import './deviceestyle.css';
import { upload } from "@testing-library/user-event/dist/upload";
import axios from 'axios';
import { useNativeStyles, useNavigate } from 'react-router-dom';
import download1 from 'js-file-download';
import { InputGroup } from "react-bootstrap";



function Devices(props) {

    const [success, setSuccess] = useState();
    const [uploadsuccess, setuploadsuccess] = useState(false);
    const [uploadfail, setuploadfail] = useState(false);
    const [uploadprocessing, setuploadprocessing] = useState(false)
    const [class_, setClass_] = useState("btn tbl-btn-color font-white- btn-cstm");
    const [class_del, setClass_del] = useState("btn btn-danger del-btn font-white- btn-cstm");
    const [responseText, setResponseText] = useState();
    const [data, setData] = useState([])

    const [inputs, setInputs] = useState({});
    // const [macAddress, setmacAddress] = useState();
    // const [edgeId, setedgeId] = useState();


    const ref = React.useRef();

    const [file, setFile] = useState(null);

    // Load data on component mount
    useEffect(() => {
        let authData = JSON.parse(localStorage.getItem('authData'));
        let data = {
            username: authData.username,
            orgname: authData.orgname,
        }
        axios.post('http://localhost:5003/admin/device/getalldevices', data).then((res) => {
            setData(res.data.data);
        })
            .catch((err) => {
                console.log(err)
            });
    }, [])

    // Handling input text
    const handleChange = (e) => {
        setInputs(PrevState => ({ ...PrevState, [e.target.name]: e.target.value }));
    };

    function handleSubmit(e) {
        setuploadprocessing(true)
        // e.preventDefault();
        let authData = JSON.parse(localStorage.getItem('authData'));

        console.log(inputs);
        let data = inputs;
        data.name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        data.orgname = authData.orgname;
        data.username = authData.username;
        debugger;
        axios.post('http://localhost:5003/admin/device/registerdevice', data)
            .then((res) => {
                // UI Processing;
                setClass_("btn tbl-btn-color font-white- btn-cstm ");
                console.log('class removed', success);
                setuploadprocessing(false);
                setuploadsuccess(true);
                setuploadfail(false);
                setInputs({});
                // setuploadfail(true)
                setData(res.data.data);
            })
            .catch((err) => {
                // UI Processing
                debugger;
                setClass_("btn tbl-btn-color font-white- btn-cstm ");
                console.log('class removed', success);
                setuploadprocessing(false);
                // setuploadsuccess(true)
                setuploadfail(true);
                setFile({})
                // setResponseText(err.response.data.singleStringMessage);
                // console.log(err.response.data.singleStringMessage);
                debugger;
                setResponseText(err.response.data.singleStringMessage);
                console.log(err);
            });
    }

    const deleteRecord = (id, d) => {
        let authData = JSON.parse(localStorage.getItem('authData'));

        let data = {};
        data.orgname = authData.orgname;
        data.username = authData.username;
        data.id = id;
        debugger;
        setSuccess(d);
        setClass_del("btn btn-danger del-btn font-white- btn-cstm disabled");
        console.log('class applied', success, d)

        axios.post('http://localhost:5003/admin/device/deletedevice', data)
            .then((res) => {
                // UI Processing;
                setClass_("btn tbl-btn-color font-white- btn-cstm ");
                console.log('class removed', success);
                setuploadprocessing(false);
                setSuccess()
                setClass_del("btn btn-danger del-btn font-white- btn-cstm")
                console.log('class removed', success, d)
                // setuploadfail(true)
                setData(res.data.data);
                setSuccess()
            })
            .catch((err) => {
                // UI Processing
                debugger;
                setClass_del("btn btn-danger del-btn font-white- btn-cstm")
                // setClass_("btn tbl-btn-color font-white- btn-cstm ");
                setuploadprocessing(false);
                // setuploadsuccess(true)
                setuploadfail(true);
                setFile({})
                // setResponseText(err.response.data.singleStringMessage);
                // console.log(err.response.data.singleStringMessage)
                debugger;
                setResponseText(err.response.data.singleStringMessage);
                console.log(err);
            });


        // setTimeout(() => {
        //     setSuccess()
        //     setClass_del("btn btn-danger del-btn font-white- btn-cstm")
        //     // console.log('class removed', success, d)
        // }, 3000);
    }


    const close_file_upload = (e) => {
        console.log(file)
        setuploadsuccess(false)
        setuploadfail(false)
        setInputs({})
        ref.current.value = "";
    }
    const showindex = () => {
        console.log(success)
    }


    return (
        <div>
            {/* Dasboard */}
            <Dasboard />

            {/* Add Data Button */}
            <div class="container add-rec-cont">
                <div class="row justify-content-center add-rec-cont-2 ">

                    <div class="col-2 el-cls card shadow py-3">
                        <button type="button" class="btn tbl-btn-color font-white- btn-add-rec " data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            <FontAwesomeIcon icon={faPlus} />
                            <span className="add-btn-txt">Register Device</span></button>
                    </div>

                </div>
            </div>

            {/* Upload Data Modal */}
            {/* <button type="button" class="btn btn-primary" >
                Launch static backdrop modal
            </button> */}


            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Device Information</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="loading" style={{ display: uploadprocessing == true ? '' : 'none' }}>
                                <div class="spinner">
                                    <div class="rect1"></div>
                                    <div class="rect2"></div>
                                    <div class="rect3"></div>
                                    <div class="rect4"></div>
                                    <div class="rect5"></div>
                                </div>
                            </div>
                            <div class="mb-3">
                                {/* <label for="formFile" class="form-label">Select Data File</label>
                                <input class="form-control mb-3" type="file" id="formFile" ref={ref} onChange={handleChange} /> */}
                                <label for="name1" class="form-label">Name</label>
                                <input class="form-control" name="name" id="name1" aria-describedby="emailHelp" value={inputs.name || ''} onChange={handleChange} />
                                {/* Mac Address */}
                                <label for="mac1" class="form-label">Mac Address</label>
                                <input class="form-control" name="macAddress" id="mac1" aria-describedby="emailHelp" value={inputs.macAddress || ''} onChange={handleChange} />
                                {/* Edge ID */}
                                <label for="edge1" class="form-label">Edge ID</label>
                                <input class="form-control" name="edgeId" id="edge1" aria-describedby="emailHelp" value={inputs.edgeId || ''} onChange={handleChange} />
                                {/* Form Controls */}
                                <span className="succ-msg" style={{ display: uploadsuccess == true ? '' : 'none' }}>Device is registered successfully!</span>
                                <span className="err-msg" style={{ display: uploadfail == true ? '' : 'none' }}>Error!{responseText}</span>

                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={() => close_file_upload()}>Close</button>
                            <button type="button" class={uploadsuccess == true ? 'btn tbl-btn-color font-white- disabled' : 'btn tbl-btn-color font-white-'} onClick={() => handleSubmit()}>Save</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Data Table */}
            <div style={{ width: '80%', marginTop: '2%', marginLeft: '10%' }} className="card shadow py-3">
                <div className="card-body">
                    <div className="mb-20 " ><h4 className="card-title">Devices</h4></div>
                    <div class="loading" style={{ display: success != undefined || success >= 0 ? '' : 'none' }}>
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
                                {/* <th scope="col" className="fw-al">Owner</th> */}
                                <th scope="col" className="fw-at">Name</th>
                                <th scope="col" className="fw-dec" >Mac Address</th>
                                <th scope="col" className="fw-edg">Edge ID</th>
                                <th scope="col" className="fw-action">Action</th>
                                {/* <th scope="col" className="fw-action">Hospital ID</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => {
                                return <tr>
                                    {/* {item.forEach(element => (
                                <> */}
                                    <th scope="row">{index + 1}</th>
                                    {/* <td>{item[0].owner}</td> */}
                                    <td>{item.name}</td>
                                    <td>{item.macAddress}</td>
                                    <td>{item.edgeId}</td>
                                    <td>
                                        <div class="container btn-cont">
                                            {/* <div class="row btn-cont-row"> */}
                                            {/* <div class="col btn-cont-col">
                                                    <button key={index} type="button" className={success == index ? class_ : class_} onClick={() => download(index, item)} >
                                                        <span style={{ visibility: success == index ? '' : 'hidden' }} > <span class="spinner-grow spinner-grow-sm spin-cstm" role="status" aria-hidden="false"></span> </span>
                                                        <span class="btn-dw">Download</span>
                                                    </button>
                                                </div> */}
                                            {/* Second button */}

                                            <div class="col btn-cont-col">
                                                <button key={index + "d"} type="button" className={success == index + "d" ? class_del : class_del} onClick={() => deleteRecord(item._id, index + "d")} >
                                                    <span style={{ visibility: success == index + "d" ? '' : 'hidden' }} > <span class="spinner-grow spinner-grow-sm spin-cstm" role="status" aria-hidden="false"></span> </span>
                                                    <span class="btn-dw">Delete</span>
                                                </button>
                                            </div>

                                            {/* </div> */}
                                        </div>
                                        {/* {success == true ?  */}


                                    </td>
                                    {/* </>
                            ))} */}

                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Devices;