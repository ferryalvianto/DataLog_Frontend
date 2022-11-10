import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BinaryBackground from '../components/backgrounds/binarybackground';
import Navbar from '../components/navbar';
import authService from "../services/auth.service";

export default function Login(props) {
    const navigate = useNavigate();
    let [businesses, setBusinesses] = useState([])
    let [businessName, setBusinessName] = useState('');

    const onInputChange = (e) => {
        setBusinessName(e.target.value)
    }

    useEffect(() => {
        authService.getDatabases().then(
            res => {
                console.log(res.data)
                setBusinesses(res.data)
            }
        )
    }, [])

    function continueLogin(e) {
        e.preventDefault();

        const url = businessName.toLowerCase()

        if (businessName != '') {
            document.getElementById('alertInput').style.display = `none`
            businesses.names.map(function (business) {
                if (url == business.toLowerCase()) {
                    // const url = namecheck.split(' ').join('-')
                    console.log(businessName)
                    sessionStorage.setItem('name', business)
                    navigate(`/${url}`)
                    window.location.reload()
                } else {
                    document.getElementById('alertInput').innerText = 'Invalid business name.\nPlease try again.'
                    document.getElementById('alertInput').style.display = `block`
                }
            })
        } else {
            document.getElementById('alertInput').innerText = 'Please enter your business name.'
            document.getElementById('alertInput').style.display = `block`
        }
    }

    return (
        <>
            <Navbar />
            <div style={{ width: '100vw', height: '100vh' }} className={`d-flex align-items-center`}>
                <div style={{ width: '100vw' }}>
                    <div className="col-md-12 text-center" style={{ padding: '1rem 5rem', display: 'flex', justifyContent: 'center' }}>
                        <div className={`card card-container`} id={`cardBackground`}>
                            <h1 className="text-center">DataLog Customer Login</h1>
                            <form className="row g-3" style={{ marginTop: '0.5rem' }} onSubmit={continueLogin}>
                                <h6 id='alertInput' style={{ display: 'none', color: 'red', paddingTop: '0' }}>Please enter your business name.</h6>
                                <div className="col-12">
                                    <input
                                        type="text"
                                        className="form-control text-center"
                                        name="businessname"
                                        placeholder='Enter your business name'
                                        onChange={onInputChange}
                                    />
                                </div>
                                {/* When click continue ->  redirects to "/:businessname" */}
                                <div className="col-12 text-start" style={{ marginBottom: '' }}>
                                    <button className={`btn bttn`}>
                                        <span>Continue</span>
                                    </button>
                                </div>
                            </form>
                            <p style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>Interested in trying DataLog? Get FREE demo <a href='/register' style={{ textDecoration: "underline" }}>here</a>.</p>
                        </div>
                    </div>
                </div>
                <BinaryBackground />
            </div>
        </>

    );
}