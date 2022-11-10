import React, { useState, useEffect, useCallback } from "react"
import authService from "../services/auth.service"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import particlesConfig from '../components/backgrounds/config/configParticles';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Navbar from "../components/navbar";

export default function NewUser() {
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    let [password, setPassword] = useState('')
    let [username, setUsername] = useState('')

    const particlesInit = useCallback(async (engine) => {
        console.log(engine);
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async (container) => {
        await console.log(container);
    }, []);

    useEffect(() => {

    }, []);

    const onUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    function inputValidation(e) {
        e.preventDefault()
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
        const usernameRegex = /^[A-Za-z0-9]+$/
        username = username.toLowerCase()

        if (username != '' && password != '') {
            document.getElementById('alertInput').style.display = `none`

            if (username != user.username && password != 'asdf1!') {
                if ((username.length > 5 && username.length < 17) && usernameRegex.test(username) && passwordRegex.test(password)) {
                    document.getElementById('alertUsername').style.display = `none`
                    document.getElementById('alertUsername1').style.display = `none`
                    document.getElementById('alertPassword').style.display = `none`

                    const oldusername = user.username

                    user.username = username
                    user.password = password
                    user.newuser = false

                    console.log(user)

                    authService.updateNewUser(oldusername, user.db, user).then((response) => {
                        const fd = new FormData()
                        fd.append('username', response.data.username)
                        fd.append('password', user.password)
                        fd.append('client_id', response.data.db)

                        axios
                            .post("http://127.0.0.1:8000/token", fd)
                            .then((response) => {
                                console.log(response);
                                localStorage.setItem("token", JSON.stringify(response.data.access_token));
                                localStorage.setItem('user', JSON.stringify(response.data.user))
                                const namecheck = response.data.user.db.toLowerCase()
                                const url = namecheck.split(' ').join('-')

                                navigate(`/${url}/dashboard`);
                                window.location.reload()
                            })
                    }).catch((error) => {
                        console.log(error);
                    });

                } else {
                    if (username.length < 6 || username.length > 16) {
                        document.getElementById('alertUsername').innerText = 'Minimum and maximum length for username are 6 and 16 characters.'
                        document.getElementById('alertUsername').style.display = `block`
                    } else {
                        document.getElementById('alertUsername').style.display = `none`
                    }

                    if (usernameRegex.test(username)) {
                        document.getElementById('alertUsername1').style.display = `none`
                    } else {
                        document.getElementById('alertUsername1').style.display = `block`
                    }

                    if (passwordRegex.test(password)) {
                        document.getElementById('alertPassword').style.display = `none`
                    } else {
                        document.getElementById('alertPassword').style.display = `block`
                    }
                }
            } else {
                if (password == 'asdf1!') {
                    document.getElementById('alertPassword').innerText = 'Your new password cannot be the same as your current one.'
                    document.getElementById('alertPassword').style.display = `block`
                } else {
                    document.getElementById('alertPassword').innerText = 'Minimum and maximum length for password are 6 and 16 characters.\nPassword must have at least one number and one special character.'
                    document.getElementById('alertPassword').style.display = `none`
                }

                if (username == user.username) {
                    document.getElementById('alertUsername').innerText = 'Your new username cannot be the same as your current one.'
                    document.getElementById('alertUsername').style.display = `block`
                } else {
                    document.getElementById('alertUsername').innerText = 'Minimum and maximum length for username are 6 and 16 characters.'
                    document.getElementById('alertUsername').style.display = `none`
                }
            }
        } else {
            document.getElementById('alertInput').style.display = `block`
        }
    }

    return (
        <>
            <div>
                <Navbar />
                <div className={`d-flex-row align-items-center`} style={{ zIndex: '99', height: '100vh', width: '100vw' }}>
                    <div style={{ zIndex: '99', position: 'absolute', bottom: '30%', width: '100%', paddingRight: '10%', paddingLeft: '10%' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <h1 style={{ fontSize: '500%' }}>􁏺 </h1>
                            <div style={{ paddingLeft: '1rem' }}>
                                <h1>Hello, {user.firstname}!</h1>
                                <h2>Looks like you're new here.</h2>
                                <h2>Please change your given username and password to your preference.</h2>
                            </div>
                        </div>
                        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <form onSubmit={inputValidation} style={{ width: '80%', paddingRight: '5%', paddingLeft: '5%' }}>

                                <h6 id='alertInput' style={{ display: 'none', color: 'red', paddingTop: '0', paddingBottom: '1rem' }}>Please enter your new username and password.</h6>
                                <div>
                                    <label htmlFor="username" className="form-label text-start" style={{ width: '100%' }}>Username</label>
                                    <h6 id='alertUsername' style={{ display: 'none', color: 'red', paddingTop: '0', paddingBottom: '1rem' }}>Minimum and maximum length for username are 6 and 16 characters.</h6>
                                    <h6 id='alertUsername1' style={{ display: 'none', color: 'red', paddingTop: '0', paddingBottom: '1rem' }}>Only letters and numbers are allowed for username.</h6>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        placeholder='New username'
                                        onChange={onUsernameChange}
                                        id='usernameInput'
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="form-label text-start" style={{ width: '100%', paddingTop: '1rem' }}>Password</label>
                                    <h6 id='alertPassword' style={{ display: 'none', color: 'red', paddingTop: '0', paddingBottom: '1rem' }}>Minimum and maximum length for password are 6 and 16 characters.<br />Password must have at least one number and one special character.</h6>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        placeholder='New password'
                                        onChange={onPasswordChange}
                                        id='passwordInput'
                                    />
                                </div>
                                <div>
                                    <button className={`btn bttn`} >
                                        Update Information
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                    <div style={{ width: '100vw', height: '100vh', position: 'absolute', filter: 'blur(10px)' }}>
                        <Particles id="tsparticles" init={particlesInit} loaded={particlesLoaded} options={particlesConfig} loading='lazy' />
                    </div>
                </div>
            </div>

        </>
    )
}