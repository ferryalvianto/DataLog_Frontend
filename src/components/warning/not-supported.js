import React, { useState, useEffect } from "react";
import BinaryBackground from '../backgrounds/binarybackground';
import "../../scss/App.scss";

export default function NotSupported() {

    return (
        <div className="App" style={{ fontFamily: 'SF Pro Display Light' }}>
            <div style={{ width: '100vw', height: '100vh' }} className={`d-flex align-items-center`}>

                <div className="col-md-12 text-center" style={{ paddingLeft: '0.25rem', paddingRight: '0.25rem', display: 'flex', justifyContent: 'center' }}>
                    <div className={`card card-container text-center`} id={`cardBackground`} style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
                        <h1 style={{ fontSize: '5rem', fontFamily: 'SF Pro Display Semibold' }}>􀌬</h1>
                        <h1 style={{ fontFamily: 'SF Pro Display Medium' }}>Sorry, your device is not supported.</h1>
                        <h3 style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>Please access our web app on a desktop or laptop for better user experience.</h3>
                        <p style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>Interested in trying DataLog? Contact us now!</p>
                        <div style={{ display: 'flex', flexDirection: "row" }}>
                            <a href="/" style={{ textDecoration: 'none', marginLeft: '1rem', marginRight: '0.5rem', width: '50%' }}>
                                <button className={`btn bttn2`}>
                                    <span>Go back</span>
                                </button>
                            </a>
                            <a href="mailto:inquiry@datalog.com?subject=InformationRequest&body=I'd like to learn more about DataLog and to get a demo." style={{ width: '50%', textDecoration: 'none', marginLeft: '0.5rem', marginRight: '1rem' }}>
                                <button className={`btn bttn`}>
                                    <span>Contact us</span>
                                </button>
                            </a>
                        </div>
                    </div>
                </div>

                <BinaryBackground />
            </div>
        </div>
    );
}