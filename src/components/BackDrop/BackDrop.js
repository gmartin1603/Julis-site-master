import React from 'react';
import './BackDrop.css'

function BackDrop(props) {
    return (
        <div className="back__drop" onClick={props.click}/>
    );
}

export default BackDrop;