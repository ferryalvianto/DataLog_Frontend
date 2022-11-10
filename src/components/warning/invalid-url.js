import React, { useEffect, useState } from "react";
import particlesConfig from '../backgrounds/config/configParticles';
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useNavigate, useParams } from "react-router-dom";

export default function URLwarning() {
    const particlesInit = useCallback(async (engine) => {
        console.log(engine);
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async (container) => {
        await console.log(container);
    }, []);

    const navigate = useNavigate()
    const [isShow, setShow] = useState(false)
    const [isLoggedin, setIsloggedin] = useState(false)
    let url = sessionStorage.getItem('url')
    let user = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        if ('url' in sessionStorage && url != null) {
            setShow(true)
            if ('user' in localStorage) {
                setIsloggedin(true)
            }
        } else {
            navigate(-1)
        }
    }, [])

    return (
        <>
            {isShow &&
                (<div className={`d-flex-row align-items-center`} style={{ zIndex: '99', height: '100vh', width: '100vw', background: 'transparent' }}>
                    <div style={{ zIndex: '99', position: 'absolute', top: '45%', width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <h1 style={{ fontSize: '800%' }}>􀥺</h1>
                            <div>
                                <h2>404</h2>
                                <h2>URL /{`${url}`} was not found on this server.</h2>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                    {isLoggedin && (<>
                                        <button className={`btn bttn2`}
                                            onClick={() => {
                                                sessionStorage.clear()
                                                navigate(`/${user.db.toLowerCase()}/dashboard`)
                                            }}>
                                            <label htmlFor="goToDashboard" style={{ width: '100%', cursor: 'pointer' }}>
                                                Go to Dashboard
                                            </label>
                                        </button>
                                        <div style={{ padding: '1rem' }}></div>
                                    </>
                                    )}
                                    <button className={`btn bttn`}
                                        onClick={() => {
                                            sessionStorage.clear()
                                            navigate('/')
                                        }}>
                                        <label htmlFor="goToDashboard" style={{ width: '100%', cursor: 'pointer' }}>
                                            Go to Main Page
                                        </label>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ width: '100vw', height: '100vh', position: 'absolute', filter: 'blur(10px)' }}>
                        <Particles id="tsparticles" init={particlesInit} loaded={particlesLoaded} options={particlesConfig} loading='lazy' />
                    </div>
                </div>)}

        </>
    )
}