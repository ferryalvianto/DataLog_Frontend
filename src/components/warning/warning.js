import React from "react";
import particlesConfig from '../backgrounds/config/configParticles';
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function WindowWarning() {
    const particlesInit = useCallback(async (engine) => {
        console.log(engine);
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async (container) => {
        await console.log(container);
    }, []);

    return (
        <div>
            <div className={`d-flex-row align-items-center`} style={{ zIndex: '99', height: '100vh', width: '100vw', background:'transparent'}}>
                <div style={{ zIndex: '99', position:'absolute', top:'45%', width: '100%'}}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <h1 style={{ fontSize: '500%' }}>􀥺</h1>
                        <div>
                            <h2>Window size is too small...</h2>
                            <h2>Please resize your window.</h2>
                        </div>
                    </div>
                </div>
                <div style={{ width: '100vw', height: '100vh', position: 'absolute', filter:'blur(10px)' }}>
                    <Particles id="tsparticles" init={particlesInit} loaded={particlesLoaded} options={particlesConfig} loading='lazy' />
                </div>
            </div>
        </div>
    )
}