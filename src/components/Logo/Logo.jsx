import React from 'react';
import Tilt from 'react-tilt';
import faceImg from './face.png';
import './Logo.css';

const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt className="Tilt pointer br2 shadow-2" options={{ max: 35 }}>
                <div className="pa2">
                    <img alt="face" src={faceImg} />
                </div>
            </Tilt>
        </div>
    );
};

export default Logo;
