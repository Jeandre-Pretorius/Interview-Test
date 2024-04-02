import React from 'react';

const Card = ({title, content}) => {
    return (
        <div className="card" style={{border: '1px solid rgba(255, 255, 255, 0.1)'}}>
            <h3>{title}</h3>
            <p>{content}</p>
        </div>
    );
};

export default Card;