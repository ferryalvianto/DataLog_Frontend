import React, { useState, useEffect } from "react";
import particlesConfig from '../components/backgrounds/config/configParticles';
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Navbar from "../components/navbar";

export default function Home() {

    const particlesInit = useCallback(async (engine) => {
        console.log(engine);
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async (container) => {
        await console.log(container);
    }, []);

    return (
        <div>
            <Navbar />
            <div style={{ width: '100vw', height: '100vh' }} className={`d-flex align-items-center`}>
                <div style={{ width: '100vw', height: '100vh', position: 'absolute', zIndex: '-1' }}>
                    <Particles id="tsparticles" init={particlesInit} loaded={particlesLoaded} options={particlesConfig} loading='lazy' />
                </div>
                <div style={{}} className={`rounded mx-auto d-block`}>
                    <img src="./logo192.png" loading="lazy" />
                </div>
            </div>
            {/* <div style={{ width: '100vw', height: '100vh', backgroundColor: 'white' }} className={`d-flex align-items-center`}>
                <div>
                </div>
            </div> */}
        </div>
    );
}