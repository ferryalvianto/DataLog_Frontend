import React, { useEffect, useState } from "react";
import { useNavigate, Link, useMatch } from 'react-router-dom'
import eventBus from "../common/eventbus";
import authService from "../services/auth.service";

function Navbar() {
    const [showLoginBtn, setShowLoginBtn] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);
    const [initials, setInitials] = useState('')
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [url, setUrl] = useState('')
    const navigate = useNavigate()
    const isHome = useMatch('/')
    const isHome2 = useMatch('/home')
    const islogin = useMatch('/login')
    const isbusinessname = useMatch('/:businessname')
    const isdashboard = useMatch('/:businessname/dashboard')
    const isanalysis = useMatch('/:businessname/analysis')
    const isprofile = useMatch('/:businessname/profile')
    const isfeedback = useMatch('/:businessname/feedback')
    const isprediction = useMatch('/:businessname/prediction')
    const istrainmodel = useMatch('/:businessname/train-model')


    const logOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('isLoggedIn')
        navigate('/')
        window.location.reload()
    }

    useEffect(() => {
        if ((isHome || isHome2)
            && !(navigator.userAgent.match(/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i))) {
            setShowLoginBtn(true)
        } else {
            setShowLoginBtn(false);
        }

        if (islogin || isbusinessname) {
            setShowLoginBtn(false)
        }

        if (isanalysis || isprofile || isdashboard || istrainmodel || isprediction || isfeedback) {
            setShowNavbar(false)

            if ('user' in localStorage) {
                setUrl(user.db.toLowerCase())
                const firstinitial = Array.from(user.firstname)[0];
                const lastinitial = Array.from(user.lastname)[0];
                setInitials(firstinitial + lastinitial)
            } else {
                logOut()
            }
        }

        eventBus.on('logout', () => {
            logOut()
        })

        return () => {
            eventBus.remove('logout')
        }

    }, []);

    return (
        <div>
            {showNavbar ? (
                <div className={`dlNavbar d-flex justify-content-between`} style={{ zIndex: '2' }}>
                    <div className={`d-flex align-items-center justify-content-between`}>
                        <div style={{ textDecoration: 'none', color: 'black', marginTop: '0.3rem', cursor: 'pointer' }} onClick={() => {
                            navigate('/')
                            window.location.reload()
                        }}>
                            <h1 style={{ fontFamily: 'Rockwell', letterSpacing: '-3pt' }}>DataLog</h1>
                        </div>
                    </div>
                    {showLoginBtn && (
                        <div style={{ maxWidth: 'auto', minWidth: '9rem' }}>
                            <button className={`btn bttn`} onClick={() => {
                                navigate('/login')
                                window.location.reload()
                            }}>
                                <span>Log In</span>
                            </button>
                        </div>
                    )}
                </div >
            ) : (
                <div className={`dlSidebar d-flex justify-content-baseline`} style={{ zIndex: '2' }}>
                    <div className={`d-flex justify-content-between text-start`} style={{ flexDirection: 'column' }}>
                        <div onClick={() => {
                            // navigate('/profile')
                        }} style={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }}>
                            <div style={{ flexDirection: 'row', marginLeft: '0.2rem' }} className={`d-flex align-items-center`}>
                                <p data-letters={initials}></p>
                                <h6 style={{ marginLeft: '1.6rem' }}>{`${user.firstname} ${user.lastname}`}</h6>
                            </div>
                        </div>
                        <div onClick={() => {
                            navigate(`/${url}/dashboard`)
                        }} style={{ textDecoration: 'none', color: 'black', marginTop: '1.5rem', cursor: 'pointer' }}>
                            <div style={{ flexDirection: 'row' }} className={`d-flex align-items-center`}>
                                {isdashboard ? (<h2 style={{ margin: '0', marginLeft: '0.3rem' }}>􀦳</h2>) : (<h2 style={{ margin: '0', marginLeft: '0.3rem' }}>􀦲</h2>)}
                                <h6 style={{ marginLeft: '1.6rem' }}>Dashboard</h6>
                            </div>
                        </div>
                        <div onClick={() => {
                            navigate(`/${url}/prediction`)
                        }} style={{ textDecoration: 'none', color: 'black', marginTop: '1.5rem', cursor: 'pointer' }}>
                            <div style={{ flexDirection: 'row' }} className={`d-flex align-items-center`}>
                                {isprediction ? (<h2 style={{ margin: '0', marginLeft: '0.3rem' }}>􀜍</h2>) : (<h2 style={{ margin: '0', marginLeft: '0.3rem' }}>􀜎</h2>)}
                                <h6 style={{ marginLeft: '1.6rem' }}>Prediction</h6>
                            </div>
                        </div>
                        <div onClick={() => {
                            navigate(`/${url}/analysis`)
                        }} style={{ textDecoration: 'none', color: 'black', marginTop: '1.5rem', cursor: 'pointer' }}>
                            <div style={{ flexDirection: 'row' }} className={`d-flex align-items-center`}>
                                {isanalysis ? (<h2 style={{ margin: '0', marginLeft: '0.3rem' }}>􀦌</h2>) : (<h2 style={{ margin: '0', marginLeft: '0.3rem' }}>􀥜</h2>)}
                                <h6 style={{ marginLeft: '1.6rem' }}>&nbsp;&nbsp;Analysis</h6>
                            </div>
                        </div>
                        <div onClick={() => {
                            navigate(`/${url}/train-model`)
                        }} style={{ textDecoration: 'none', color: 'black', marginTop: '1.5rem', cursor: 'pointer' }}>
                            <div style={{ flexDirection: 'row' }} className={`d-flex align-items-center`}>
                                {istrainmodel ? (<h2 style={{ margin: '0', marginLeft: '0.3rem' }}>􀧓</h2>) : (<h2 style={{ margin: '0', marginLeft: '0.3rem' }}>􀫥</h2>)}
                                <h6 style={{ marginLeft: '1.6rem' }}>Train Model</h6>
                            </div>
                        </div>
                        <div onClick={() => {
                            // navigate('/profile')
                        }} style={{ textDecoration: 'none', color: 'black', marginTop: '1.5rem', cursor: 'pointer' }}>
                            <div style={{ flexDirection: 'row' }} className={`d-flex align-items-center`}>
                                {isfeedback ? (<h2 style={{ margin: '0', marginLeft: '0.3rem' }}>􀿌</h2>) : (<h2 style={{ margin: '0', marginLeft: '0.3rem' }}>􀿋</h2>)}
                                <h6 style={{ marginLeft: '1.6rem', marginRight: '1rem' }}>Customer Feedback</h6>
                            </div>
                        </div>
                    </div>
                    <div style={{ position: 'absolute', bottom: 0, marginTop: '1.5rem', marginBottom: '1.5rem', cursor: 'pointer' }}>
                        <div onClick={logOut} style={{ textDecoration: 'none', color: 'black' }}>
                            <div style={{ flexDirection: 'row' }} className={`d-flex align-items-center`}>
                                <h2 style={{ margin: '0', marginLeft: '0.3rem' }}>􀆧</h2>
                                <h6 style={{ marginLeft: '1.6rem' }}>Log Out</h6>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar;