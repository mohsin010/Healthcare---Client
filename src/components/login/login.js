import axios from 'axios';
import React, { useState } from 'react';
import { useNativeStyles, useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';


export default function Login() {

  const [orgname, setorgname] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [alert, setalert] = useState(false);

  const navigate = useNavigate();
  let data = {
    orgname: orgname,
    username: username,
    password: password
  }

  const redirect = () => {
    navigate('/home')
  }
  
  function handlesubmit() {
    axios.post('http://localhost:5003/auth/login', { data: data }).then(res => {

      if (res.status === 200) {
        navigate('/home')
        debugger;

        let data1 = res.data.data
        let data = {
          orgname: data1.orgname,
          username: data1.username
        }
        localStorage.setItem('authData', JSON.stringify(data))

        setalert(false);
      } else {
        setalert(true);
      }

    }).catch(err => {
      debugger;
      setalert(true);
    })
  }
  function handleinput(e) {
    console.log(e.target.value, e.target.id)
    if (e.target.id === 'orgname') {
      setorgname(e.target.value);
    } else if (e.target.id === 'username') {
      setusername(e.target.value);
    } else {
      setpassword(e.target.value);
    }
  }


  return (
    <div>

      <div style={{ width: '30%', marginTop: '6%', marginLeft: '35%' }} className="card shadow py-3">
        <div className="card-body">
          <div className="mt-0 text-center" ><h4 className="card-title">Login</h4></div>
          <form>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="form2Example1">Org Name</label>
              <input type="text" id="orgname" className="form-control" onChange={handleinput} />
            </div>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="form2Example1">Username</label>
              <input type="text" id="username" className="form-control" onChange={handleinput} />
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="form2Example3">Password</label>
              <input type="password" id="password" className="form-control" onChange={handleinput} />
            </div>
            { }
            <Alert variant={'danger'} style={{ display: alert ? '' : 'none' }}>
              Invalid Credentials!
            </Alert>
            <div className="clearfix ">
              <button type="button" className="btn tbl-btn-color font-white- btn-block mb-0 float-end" onClick={handlesubmit}>Sign in</button>
            </div>


          </form>

        </div>
      </div>
    </div>

  )
}