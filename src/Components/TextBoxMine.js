import React from 'react';

const TextboxMine = props => {
    return (
        <div className="TextboxMine">
            <div className="cont">
                <span className="sender">{props.sender}</span>
                <br/>
                <img src={props.src} width="100%" className="gif"/>
            </div>
        </div>
    );
}

export default TextboxMine;