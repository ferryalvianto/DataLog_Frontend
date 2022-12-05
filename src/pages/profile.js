import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BinaryBackground from '../components/backgrounds/binarybackground'
import Navbar from '../components/navbar';
import axios from 'axios';

export default function Profile() {
    const params = useParams();
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState('')
    const onUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    useEffect(() => {
        if ('user' in localStorage) {
            setUser(JSON.parse(localStorage.getItem('user')))
            if (params.businessname != JSON.parse(localStorage.getItem('user')).db.toLowerCase()) {
                sessionStorage.setItem('url', params.businessname)
                navigate('/badpage')
            }
        } else {
            navigate('/login')
        }
    }, []);

    function continueLogin(e) {
        e.preventDefault();

        if (username != '' && password != '') {
            document.getElementById('alertInput').style.display = `none`

            const fd =
            {
                'username': username,
                'password': password,
                'firstname': JSON.parse(localStorage.getItem('user')).firstname,
                'lastname': JSON.parse(localStorage.getItem('user')).lastname,
                'email': JSON.parse(localStorage.getItem('user')).email,
                'newuser': JSON.parse(localStorage.getItem('user')).newuser,
                'disabled': JSON.parse(localStorage.getItem('user')).disabled,
                'db': JSON.parse(localStorage.getItem('user')).db,
            }

            axios
                .put(`https://datalogwebapp.herokuapp.com/datalog/api/users/${JSON.parse(localStorage.getItem('user')).username}?db=${JSON.parse(localStorage.getItem('user')).db}`, fd)
                .then((response) => {
                    console.log(response);
                    localStorage.setItem('user', JSON.stringify(response.data))

                    alert('Successfully updated your information')
                    navigate(`/${response.data.db.toLowerCase()}/dashboard`);
                    window.location.reload()
                    // if (response.data.user.newuser) {
                    //     navigate(`/${url}/new-user`, { state: { name: `${sessionStorage.getItem('name')}` } });
                    //     window.location.reload()
                    // } else {
                    //     sessionStorage.removeItem('name')
                    //     navigate(`/${url}/dashboard`);
                    //     window.location.reload()
                    // }
                })
                .catch((error) => {
                    if (error.message.includes('400')) {
                        // document.getElementById('alertInput').innerText = 'Incorrect password.'
                        // document.getElementById('alertInput').style.display = `block`
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

            <Navbar loading='lazy' />
            <div style={{ width: '100vw', height: '100vh' }} className={`d-flex align-items-center`}>
                <div style={{ width: '100vw' }}>
                    <div className="col-md-12" style={{ padding: '1rem 5rem', display: 'flex', justifyContent: 'center' }}>
                        <div className={`card card-container`} id={`cardBackground`}>
                            <h1 className="text-center">Update Information</h1>
                            <form className="row g-3" style={{ marginTop: '0.5rem' }} onSubmit={continueLogin}>
                                <h6 id='alertInput' style={{ display: 'none', color: 'red', paddingTop: '0' }}>Please enter your username and password.</h6>
                                <div className="col-12">
                                    <label htmlFor="username" className="form-label text-start" style={{ width: '100%' }}>Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="businessname"
                                        defaultValue={user.username}
                                        placeholder='Enter your new username'
                                        onChange={onUsernameChange}
                                    />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="password" className="form-label text-start">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        defaultValue={user.password}
                                        placeholder='Enter your new password'
                                        onChange={onPasswordChange}
                                    />
                                </div>
                                <div className="col-12" style={{ marginBottom: '' }}>
                                    <button
                                        className={`btn bttn`}
                                    >
                                        <span>Update</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <BinaryBackground />
            </div>

        </div>
    )
}