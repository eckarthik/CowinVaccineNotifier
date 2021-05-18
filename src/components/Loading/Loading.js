import React from 'react';
import './Loading.css';

const Loading = (props) => {
    return (
        <div className="loading-indicator">
            <div className="loader"></div>
            <p>{props.loadingMessage}</p>
        </div>

    )
};

export default Loading;