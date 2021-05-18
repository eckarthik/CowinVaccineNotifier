import React from 'react';
import classes from './Error.module.css';

const NotFoundError = (props) => {
    return (
        <div className={classes.Error}>
            <div className={classes.ErrorImage}>
                <i className="fa fa-warning"/>
            </div>
            <div>
                {props.errorMessage}
            </div>
        </div>
    );
}

export default NotFoundError;