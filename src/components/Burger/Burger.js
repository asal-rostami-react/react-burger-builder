import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';

const burger = (props) => {
    return( 
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
        </div>

    );
};

export default burger;