import React from "react";
import { useRef } from "react";
import { useEffect } from "react";

const renderMatrix = (ref) => {
    let canvas = ref.current;
    let context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // const katakana =
    //     "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
    // const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // const nums = "0123456789";
    // const alphabet = katakana + latin + nums;

    const binary = "01000100011000010111010001100001010011000110111101100111"; //"datalog" in binary

    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const rainDrops = [];

    for (let x = 0; x < columns; x++) {
        rainDrops[x] = 1;
    }

    const render = () => {
        context.fillStyle = "rgba(255, 255, 255, 0.05)";
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = "black";
        context.font = fontSize + "px monospace";

        for (let i = 0; i < rainDrops.length; i++) {
            // randomize the string of characters to render
            const text = binary.charAt(
                Math.floor(Math.random() * binary.length)
            );
            context.fillText(text, i * fontSize, rainDrops[i] * fontSize);

            if (
                rainDrops[i] * fontSize > canvas.height &&
                Math.random() > 0.975
            ) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    };

    return () => {
        setInterval(render, 30);
    };
};

const MatrixRainingLetters = (props) => {
    const ref = useRef();
    const keyName = "mrl-" + props.key;
    const thisClassName = "mrl-container " + props.custom_class;
    useEffect(() => renderMatrix(ref));

    return (
        <React.Fragment>
            <canvas loading='lazy' key={keyName} className={thisClassName} ref={ref} style={{ position: 'absolute', zIndex: '-1', width:'100vw', height:'100vh'}}></canvas>
        </React.Fragment>
    );
};

export default MatrixRainingLetters;