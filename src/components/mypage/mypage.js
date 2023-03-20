import React, { useEffect, useState } from "react";
import Dasboard from "../dashboard/dashboard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faL, faPlus } from '@fortawesome/free-solid-svg-icons'
import './mypagestyle.css';
import { upload } from "@testing-library/user-event/dist/upload";
import axios from 'axios';
import { useNativeStyles, useNavigate } from 'react-router-dom';
import download1 from 'js-file-download';



function MyPage(props) {

    const [success, setSuccess] = useState();
    const [uploadsuccess, setuploadsuccess] = useState(false);
    const [uploadfail, setuploadfail] = useState(false);
    const [uploadprocessing, setuploadprocessing] = useState(false)
    const [class_, setClass_] = useState("btn tbl-btn-color font-white- btn-cstm");
    const [class_del, setClass_del] = useState("btn btn-danger del-btn font-white- btn-cstm");
    const [file, setFile] = useState(null);
    const [responseText, setResponseText] = useState();

    const ref = React.useRef();

    const [data, setData] = useState([])
    const [inputs, setInputs] = useState({});


    // Load data on component mount
    useEffect(() => {
        axios.post('http://localhost:5003/admin/data/getowndata').then((res) => {
            setData(res.data.data);
        })
            .catch((err) => {
                console.log(err)
            });
    }, [])

    // File function
    const handleChange = (e) => {
        debugger;
        if (e.target.files) {
            setFile(e.target.files[0]);
        } else {
            setInputs(PrevState => ({ ...PrevState, [e.target.name]: e.target.value }));
        }

    };

    function handleFileSubmit(e) {

        let authData = JSON.parse(localStorage.getItem('authData'));

        ref.current.value = "";
        setuploadprocessing(true)
        // e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', inputs.title.charAt(0).toUpperCase() + inputs.title.slice(1));
        formData.append('description', inputs.description.charAt(0).toUpperCase() + inputs.description.slice(1));
        formData.append('orgname', authData.orgname);

        debugger;
        axios.post('http://localhost:5003/admin/data/storedata', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((res) => {

                // UI Processing
                setClass_("btn tbl-btn-color font-white- btn-cstm ")
                console.log('class removed', success)
                setuploadprocessing(false)
                setuploadsuccess(true)
                setFile(null)
                // setuploadfail(true)
                setData(res.data.data);
            })
            .catch((err) => {

                // UI Processing
                setClass_("btn tbl-btn-color font-white- btn-cstm ")
                console.log('class removed', success)
                setuploadprocessing(false)
                // setuploadsuccess(true)
                setuploadfail(true)
                setFile(null)
                debugger;
                setResponseText(err.response.data.error);
                console.log(err);
            });
    }
    function download(index, item) {
        setSuccess(index);
        setClass_("btn tbl-btn-color font-white- btn-cstm disabled");
        debugger;
        // console.log('class applied', success, index, item);
        let data = {
            id: item._id
        };
        axios.post('http://localhost:5003/admin/data/downloaddata', data, {
            responseType: 'blob',
            headers: {
                'Accept': 'application/pdf',
            }
        })
            .then((res) => {
                debugger;

                const fileURL = window.URL.createObjectURL(new Blob([res.data]));
                const fileLink = document.createElement('a');
                fileLink.href = fileURL;
                // const fileName = res.headers['content-disposition'].substring(22, 52);
                fileLink.setAttribute('download', item.filename);
                fileLink.setAttribute('target', '_blank');
                document.body.appendChild(fileLink);
                fileLink.click();
                fileLink.remove();
                // const file = window.URL.createObjectURL(new Blob([res.data]));
                // window.open(file, "_blank");
                // download1(res.data, item.filename)
                // setData(res.data);
                // const blob = res.blob();
                setSuccess();
                // setClass_("btn tbl-btn-color font-white- btn-cstm disabled");

                // console.log('class applied', success, index, item);
                setClass_("btn tbl-btn-color font-white- btn-cstm ")
                // console.log('class removed', success, index)
                // download(res);
                // console.log(blob);
            }).catch((err) => {
                debugger;
                setSuccess()
                setClass_("btn tbl-btn-color font-white- btn-cstm ")
                // console.log('class removed', success, index)
                console.log(err)
            });

    }

    const deleteRecord = (d) => {
        setSuccess(d);
        setClass_del("btn btn-danger del-btn font-white- btn-cstm disabled");
        console.log('class applied', success, d)


        setTimeout(() => {
            setSuccess()
            setClass_del("btn btn-danger del-btn font-white- btn-cstm")
            console.log('class removed', success, d)
        }, 3000);
    }


    const close_file_upload = (e) => {
        console.log(file)
        setuploadsuccess(false)
        setuploadfail(false)
        setFile(null)
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
                            <span className="add-btn-txt">Upload Data</span></button>
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
                            <h5 class="modal-title" id="staticBackdropLabel">Choose File</h5>
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
                                <label for="title" class="form-label">Title</label>
                                <input class="form-control" name="title" id="title" aria-describedby="emailHelp" value={inputs.title || ''} onChange={handleChange} />
                                {/* Mac Address */}
                                <label for="description" class="form-label">Description</label>
                                <input class="form-control" name="description" id="description" aria-describedby="emailHelp" value={inputs.description || ''} onChange={handleChange} />
                                {/* Edge ID */}
                                <label for="formFile" class="form-label">Select Data File</label>
                                <input class="form-control mb-3" type="file" id="formFile" ref={ref} onChange={handleChange} />
                                <span className="succ-msg" style={{ display: uploadsuccess == true ? '' : 'none' }}>Data is Uploaded Successfully!</span>
                                <span className="err-msg" style={{ display: uploadfail == true ? '' : 'none' }}>Error!{responseText}</span>

                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={() => close_file_upload()}>Close</button>
                            <button type="button" class={uploadsuccess == true ? 'btn tbl-btn-color font-white- disabled' : 'btn tbl-btn-color font-white-'} onClick={() => handleFileSubmit()}>Upload</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Data Table */}
            <div style={{ width: '80%', marginTop: '2%', marginLeft: '10%' }} className="card shadow py-3">
                <div className="card-body">
                    <div className="mb-20 " ><h4 className="card-title">My Data</h4></div>
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
                                <th scope="col" className="fw-at">Title</th>
                                <th scope="col" className="fw-dec" >Description</th>
                                <th scope="col" className="fw-action">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => {
                                return <tr>
                                    {/* {item.forEach(element => (
                                <> */}
                                    <th scope="row">{index + 1}</th>
                                    {/* <td>{item[0].owner}</td> */}
                                    <td>{item.title}</td>
                                    <td>{item.description}</td>
                                    <td>
                                        <div class="container btn-cont">
                                            <div class="row btn-cont-row">
                                                <div class="col btn-cont-col">
                                                    <button key={index} type="button" className={success == index ? class_ : class_} onClick={() => download(index, item)} >
                                                        <span style={{ visibility: success == index ? '' : 'hidden' }} > <span class="spinner-grow spinner-grow-sm spin-cstm" role="status" aria-hidden="false"></span> </span>
                                                        <span class="btn-dw">Download</span>
                                                    </button>
                                                </div>
                                                {/* Second button */}

                                                {/* <div class="col btn-cont-col">
                                                    <button key={index + "d"} type="button" className={success == index + "d" ? class_del : class_del} onClick={() => deleteRecord(index + "d")} >
                                                        <span style={{ visibility: success == index + "d" ? '' : 'hidden' }} > <span class="spinner-grow spinner-grow-sm spin-cstm" role="status" aria-hidden="false"></span> </span>
                                                        <span class="btn-dw">Delete</span>
                                                    </button>
                                                </div> */}

                                            </div>
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

export default MyPage;