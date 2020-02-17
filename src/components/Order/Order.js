import React from 'react';
import classes from './Order.css';

const order = () => (
    <div className={classes.Order}>
        <p>Ingredients: Salad (1)</p>
        <p>Price: <strong>CAD 5.45</strong></p>
    </div>
);

export default order; 