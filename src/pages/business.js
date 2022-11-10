import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BinaryBackground from '../components/backgrounds/binarybackground'
import Navbar from '../components/navbar';
import axios from 'axios';

export default function Business() {
    const params = useParams();
    const navigate = useNavigate();
    const [isBusinessReady, setBusinessReady] = useState(false);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const location = useLocation();

    const onUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    useEffect(() => {
        if ('name' in sessionStorage && (sessionStorage.getItem('name').toLowerCase() == params.businessname)) {
            setBusinessReady(true)
        } else {
            navigate('/login')
        }
    }, []);

    function continueLogin(e) {
        e.preventDefault();

        if (username != '' && password != '') {
            document.getElementById('alertInput').style.display = `none`

            const fd = new FormData()
            fd.append('username', username)
            fd.append('password', password)
            fd.append('client_id', sessionStorage.getItem('name'))

            axios
                .post("http://127.0.0.1:8000/token", fd)
                .then((response) => {
                    console.log(response);
                    localStorage.setItem("token", JSON.stringify(response.data.access_token));
                    localStorage.setItem('user', JSON.stringify(response.data.user))
                    const url = sessionStorage.getItem('name').toLowerCase()
                    
                    if(response.data.user.newuser){
                        navigate(`/${url}/new-user`,{state:{name:`${sessionStorage.getItem('name')}`}});
                        window.location.reload()
                    }else{
                        sessionStorage.removeItem('name')
                        navigate(`/${url}/dashboard`);
                        window.location.reload()
                    }
                })
                .catch((error) => {
                    if(error.message.includes('400')){
                        document.getElementById('alertInput').innerText = 'Incorrect password.'
                        document.getElementById('alertInput').style.display = `block`
                    } else {
                        document.getElementById('alertInput').innerText = 'Network Error–No such username.'
                        document.getElementById('alertInput').style.display = `block`
                    }
                });
        } else {
            document.getElementById('alertInput').innerText = 'Please enter your username and password.'
            document.getElementById('alertInput').style.display = `block`
        }
    }

    return (
        <div>
            {(isBusinessReady) ?
                <>
                    <Navbar loading='lazy' />
                    <div style={{ width: '100vw', height: '100vh' }} className={`d-flex align-items-center`}>
                        <div style={{ width: '100vw' }}>
                            <div className="col-md-12" style={{ padding: '1rem 5rem', display: 'flex', justifyContent: 'center' }}>
                                <div className={`card card-container`} id={`cardBackground`}>
                                    <h1 className="text-center">{`${sessionStorage.getItem('name')}`} Customer Login</h1>
                                    <form className="row g-3" style={{ marginTop: '0.5rem' }} onSubmit={continueLogin}>
                                        <h6 id='alertInput' style={{ display: 'none', color: 'red', paddingTop: '0' }}>Please enter your username and password.</h6>
                                        <div className="col-12">
                                            <label htmlFor="username" className="form-label text-start" style={{ width: '100%' }}>Username</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="businessname"
                                                placeholder='Enter your username'
                                                onChange={onUsernameChange}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="password" className="form-label text-start">Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                name="password"
                                                placeholder='Enter your password'
                                                onChange={onPasswordChange}
                                            />
                                        </div>
                                        <div className="col-12" style={{ marginBottom: '' }}>
                                            <button
                                                className={`btn bttn`}
                                            >
                                                <span>Login</span>
                                            </button>
                                        </div>
                                    </form>
                                    <p className="text-center" style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>Forgot password? Reset your password <a href='/' style={{ textDecoration: "underline" }}>here</a>.</p>
                                </div>
                            </div>
                        </div>
                        <BinaryBackground />
                    </div>
                </>
                : null
            }
        </div>
    )
}