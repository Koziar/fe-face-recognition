import React from 'react';
import './ImageURLForm.css';

const ImageURLForm = ({ onInputChange, onButtonSubmit }) => {
    const handleKeypress = (event) => {
        if (event.key === 'Enter') {
            onButtonSubmit();
        }
    };

    return (
        <div>
            <p className="f3">{'Face recognition app for your pictures. Give it a try!'}</p>
            <div className="center">
                <div className="form center pa4 br3 shadow-5">
                    <input
                        className="f4 pa2 w-70 center"
                        type="text"
                        onChange={onInputChange}
                        onKeyPress={handleKeypress}
                    />
                    <button className="w-30 grow f4 link ph3 pv2 dib white bg-dark-blue" onClick={onButtonSubmit}>
                        Find faces ↵
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageURLForm;
